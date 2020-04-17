import React, { Component } from 'react';
import { Text, View, AsyncStorage, Platform } from 'react-native'; 
import PropTypes from 'prop-types';
import CodeInput from 'react-native-confirmation-code-input';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import  validationVerifyOtp  from '../../../Common/Validations/verifyOtp';
import { verifyOtpAction } from '../../../../actions/otpAction';
import { setRouteAction } from '../../../../actions/tabActivity';
import { createLoginAction } from '../../../../actions/loginAction';
import { resendOtpAction } from '../../../../actions/resendOtpAction';
import { getErrorStatus } from '../../../../actions/globalErrorAction';
import { INVALID_LOGIN, KINDLY_SIGN_UP, OTP_EXPIARED, INCORRECT_OTP, OTP_SUCCESS } from '../../../../helpers/utilities';
import Button from '../../../Common/FormElements/Button';
import P from '../../../Common/Typos/p';
import NavLink from '../../../Common/NavLink';
import {config} from '../../../../theme/config';

import { styles } from './style';

const base64 = require('base-64');
const CryptoJS = require('crypto-js');

class EnterPassCode extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        mobileNo : '',
        password: '',
        otpText: '',
        otp: '',
        errors: {},
        deviceDetails: {},
        isLoading: false
      };
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({
                mobileNo:Actions.currentParams.authId
            })
        }, 1000)
    }
    _onFinishCheckingCode2(isValid){
        this.setState({ otpText: isValid })
    }
    handleSubmit = () =>{
        const { mobileNo, otpText } = this.state;
        if (this.isValid()) {
            this.setState({errors: {}, isLoading:!this.state.isLoading});
            const resObj ={
                mobileNo,
                otp: otpText
            }; 
            this.props.verifyOtpAction(resObj).then(res =>{
                if (res.otpDetails.data.status === true) { 
                    this.setState({isLoading:!this.state.isLoading});
                    const verifiedUserData = {
                        Bearertoken : res.otpDetails.data.bearerToken,
                        memberId: res.otpDetails.data.memberId,
                        mobileNo,
                        userStatus: 'VERIFIED'
                    }
                    AsyncStorage.setItem('verifiedUserData', JSON.stringify(verifiedUserData));
                    AsyncStorage.getItem('verifyType').then(type => {
                        if (type === 'forgotPassword') {
                            Actions.resetpassword({screen: 'verify'});
                        }else if (type === 'signUp') {
                            AsyncStorage.getItem('authData').then(value =>{
                                const bytes  = CryptoJS.AES.decrypt(JSON.parse(value).password.toString(), 'passwordCrypt');
                                const cryptoPassword = bytes.toString(CryptoJS.enc.Utf8);
                                const deviceDetails = {
                                    requestType: 'MEMBER',
                                    deviceId: JSON.parse(value).deviceId,
                                    deviceType: Platform.OS === 'ios'?'IOS':'ANDROID',
                                    deviceToken: JSON.parse(value).deviceToken
                                }
                                const  headerConfig =  {
                                    'Authorization': `Basic ${base64.encode(JSON.parse(value).authId+ ':' +cryptoPassword)}`,
                                    'Content-Type': 'application/json;'
                                }
                                this.props.createLoginAction(deviceDetails, headerConfig).then(res => {
                                    const verifiedUserData = {
                                        Bearertoken : res.loginDetails.data.bearerToken,
                                        memberId: res.loginDetails.data.memberId,
                                        mobileNo: JSON.parse(value).authId,
                                        userStatus: 'LOGGEDIN'
                                    }
                                    AsyncStorage.setItem('verifiedUserData', JSON.stringify(verifiedUserData));
                                    this.props.setRouteAction('schemelist');
                                    AsyncStorage.setItem('tabBarFrom', 'schemelist');
                                    Actions.schemelist();
                                }).catch(err => {
                                    if(err.response.data.code === 10002) {
                                        this.props.getErrorStatus(INVALID_LOGIN);
                                    }else if(err.response.data.code === 50000) {
                                        this.props.getErrorStatus(INVALID_LOGIN);
                                    }
                                });
                            });
                        }

                    });
                }
            }).catch(err => {
                this.setState({isLoading:!this.state.isLoading});
                if (err.response.data.code === 10055) {
                    this.props.getErrorStatus(OTP_EXPIARED);
                }else if(err.response.data.code === 10054) {
                    this.setState({otpText:''})
                    this.codeInputRef.clear();
                    this.props.getErrorStatus(INCORRECT_OTP);
                }else if(err.response.data.code === 10052) {
                    this.props.getErrorStatus(KINDLY_SIGN_UP);
                }else if(err.response.data.code === 10002) {
                    this.props.getErrorStatus(INVALID_LOGIN);
                }else if(err.response.data.code === 50000) {
                    this.props.getErrorStatus(INVALID_LOGIN);
                }
            });
        }
    }
    isValid() {
        const { errors, isValid } = validationVerifyOtp(this.state);
        if (!isValid) {
            this.setState({ errors });
        }
        return isValid;
    }

    resendOtpAction = () =>{
        AsyncStorage.getItem('verifyType').then(type => {
            AsyncStorage.getItem('authData').then(value =>{
                AsyncStorage.getItem('deviceDetails').then(deviceDetails => {
                    const resObj = {
                        requestType: 'MEMBER',
                        mobileNo: type === 'forgotPassword'?this.props.mobile:JSON.parse(value).authId,
                        deviceId: JSON.parse(deviceDetails).deviceId,
                    }
                    this.props.resendOtpAction(resObj).then(res => {
                        if (res.resentOtpDetails.data.status === true) {
                            this.props.getErrorStatus(OTP_SUCCESS);
                        }
                    }).catch(error =>{
                        if(error.response.data.code === 10052) {
                            this.props.getErrorStatus(KINDLY_SIGN_UP);
                        }else if(error.response.data.code === 50000) {
                            this.props.getErrorStatus(INVALID_LOGIN);
                        }
                    });
                });
           });
        });
    }

    render() {
        const { errors, mobileNo, isLoading } = this.state;
        return (
                <KeyboardAwareScrollView
                 contentContainerStyle={styles.container}
                 bounces={false}
                 scrollEnabled={true}
                 showsVerticalScrollIndicator={false}
                 keyboardShouldPersistTaps='handled'
                    >
                    <P style={styles.paragraph}>
                        We have sent an OTP{'\n'} on your number <Text style={styles.bold}>+91 {mobileNo}</Text>
                    </P>
                    <View style={styles.verify}>
                        <CodeInput 
                            ref={(codeInputRef) => { this.codeInputRef = codeInputRef; }}
                            keyboardType='numeric'
                            codeLength={4}
                            space={30}
                            size={50}
                            activeColor='#000'
                            inactiveColor='#000'
                            className='border-b'
                            inputPosition='center'
                            codeInputStyle={{ fontWeight: '800'}}
                            onFulfill={(isValid, code) => this._onFinishCheckingCode2(isValid, code)} />
                        {!isEmpty(errors) && <P style={styles.error}>{errors.otpText}</P> }
                        <NavLink description='Not received the OTP yet?' login='Resend OTP?' onPress={this.resendOtpAction}/>
                    </View>
                    <View style={styles.align}>
                        <Button onPress={this.handleSubmit} uppercase bgColor={config.linkColor} width='100%' label='VERIFY' shadow bigButton loader={isLoading}/> 
                    </View>
                </KeyboardAwareScrollView>
        );
    }
}


EnterPassCode.propTypes = {
    verifyOtpAction: PropTypes.func,
    createLoginAction: PropTypes.func,
    resendOtpAction: PropTypes.func,
    getErrorStatus:PropTypes.func,
    setRouteAction:PropTypes.func,
    mobile: PropTypes.string
};


export default connect(null, {verifyOtpAction, resendOtpAction, createLoginAction, getErrorStatus, setRouteAction})(EnterPassCode);