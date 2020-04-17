import React, { Component } from 'react';
import {  View, Text, AsyncStorage, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Button from '../../../Common/FormElements/Button';
import { resetPasswordAction } from '../../../../actions/forgotPasswordAction';
import { changePassword } from '../../../../actions/changePasswordAction';
import { createLoginAction } from '../../../../actions/loginAction';
import { setRouteAction } from '../../../../actions/tabActivity';
import {getErrorStatus} from '../../../../actions/globalErrorAction';
import {PASSWORD_MATCH, INVALID_LOGIN, KINDLY_SIGN_UP, SUCCESS_PASSWORD_CHANGE} from '../../../../helpers/utilities';
import validateReset from '../../../Common/Validations/resetPassword';
import P from '../../../Common/Typos/p';
import TextInput from '../../../Common/FormElements/TextBox';
import { styles } from './style';
import { config } from '../../../../theme/config';

const CryptoJS = require('crypto-js');
const base64 = require('base-64');

class ResetForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newpassword:'',
			confirmpassword:'',
			currentpassword:'',
			oldPassword:'',
			errors: {},
			splitter:'',
			isLoading: false
		};
	}
	componentDidMount(){
		AsyncStorage.getItem('authData').then(value =>{
			const bytes  = CryptoJS.AES.decrypt(JSON.parse(value).password.toString(), 'passwordCrypt');
			const cryptoPassword = bytes.toString(CryptoJS.enc.Utf8);
            this.setState({
            	oldPassword: cryptoPassword,
            	splitter:this.props.currentPassword
            });
		});
    }
    logInAction = () =>{
    	AsyncStorage.getItem('authData').then(value =>{
            const cryptPassword = CryptoJS.AES.encrypt(this.state.confirmpassword, 'passwordCrypt');
            const deviceDetails = {
            	requestType: 'MEMBER',
                deviceId: JSON.parse(value).deviceId,
                deviceType: Platform.OS === 'ios'?'IPHONE':'ANDROID',
                deviceToken: JSON.parse(value).deviceToken
            }
            const  headerConfig =  {
                'Authorization': `Basic ${base64.encode(JSON.parse(value).authId+ ':' +this.state.confirmpassword)}`,
                'Content-Type': 'application/json;'
            }
            this.props.createLoginAction(deviceDetails, headerConfig).then(res => {
                const verifiedUserData = {
                    Bearertoken : res.loginDetails.data.bearerToken,
                    memberId: res.loginDetails.data.memberId,
                    mobileNo: JSON.parse(value).authId,
                    userStatus: 'LOGGEDIN'
                }
                const resObj = {
					authId: JSON.parse(value).authId,
			   		password: cryptPassword.toString(),
			   		memberId: res.loginDetails.data.memberId,
			   		deviceId: JSON.parse(value).deviceId,
			   		deviceToken: JSON.parse(value).deviceToken,
				}
				AsyncStorage.setItem('authData', JSON.stringify(resObj));
                AsyncStorage.setItem('verifiedUserData', JSON.stringify(verifiedUserData));
                this.props.setRouteAction('home');
                AsyncStorage.setItem('tabBarFrom', 'home');
		        Actions.tabbar({type: 'reset'}); 
		   		Actions.home();
            }).catch(err => {
                if(err.response.data.code === 10002) {
                    this.props.getErrorStatus(INVALID_LOGIN);
                }else if(err.response.data.code === 50000) {
                    this.props.getErrorStatus(INVALID_LOGIN);
                }
            });
        });
    }
	handleSubmit = () =>{
		const { confirmpassword,currentpassword, } = this.state;
		if (this.isValid()) {
			this.setState({errors: {}, isLoading:!this.state.isLoading});
		    if(this.props.currentPassword === 'Settings'){
		    	AsyncStorage.getItem('verifiedUserData').then(value =>{
		    		const passData = {
		    			memberId:JSON.parse(value).memberId,
		    			mobileNo: JSON.parse(value).mobileNo,
		    			oldPassword:currentpassword,
		    			password:confirmpassword
		    		}
		    		const baseAuth = {
	                	'Authorization': 'Bearer ' +  JSON.parse(value).Bearertoken,
	                    'Content-Type': 'application/json;'
					}
		    		this.props.changePassword(JSON.parse(value).memberId, passData, baseAuth).then(() =>{
		    			this.setState({isLoading:!this.state.isLoading});
	    				this.props.getErrorStatus(SUCCESS_PASSWORD_CHANGE);
	    				this.logInAction();
			    	}).catch(error => {
			    		this.setState({isLoading:!this.state.isLoading});
						if (error.response.data.code === 10056) {
							this.props.getErrorStatus(PASSWORD_MATCH);
						}else if(error.response.data.code === 10052) {
							this.props.getErrorStatus(KINDLY_SIGN_UP);
						}else if(error.response.data.code === 10002) {
							this.props.getErrorStatus(INVALID_LOGIN);
						}else if(error.response.data.code === 50000) {
							this.props.getErrorStatus(INVALID_LOGIN);
						}
					});
				});
			}
			else{
				AsyncStorage.getItem('verifiedUserData').then(value =>{
				const baseAuth = {
                	'Authorization': 'Bearer ' +  JSON.parse(value).Bearertoken,
                    'Content-Type': 'application/json;'
				}
				const resObj = {
				    memberId: JSON.parse(value).memberId,
				    mobileNo: JSON.parse(value).mobileNo,
				    password: confirmpassword,
				}
				this.props.resetPasswordAction(JSON.parse(value).memberId, resObj, baseAuth).then(res =>{
					if (res.forgotDetails.data.status === 'ACTIVE') {
			    		Actions.login({type: 'reset'});
					}
				}).catch(error => {
					if (error.response.data.code === 10056) {
						this.props.getErrorStatus(PASSWORD_MATCH);
					}else if(error.response.data.code === 10052) {
						this.props.getErrorStatus(KINDLY_SIGN_UP);
					}else if(error.response.data.code === 10002) {
						this.props.getErrorStatus(INVALID_LOGIN);
					}else if(error.response.data.code === 50000) {
						this.props.getErrorStatus(INVALID_LOGIN);
					}
				});
       		}); 
			}
		}
	}
	isValid() {
		const { errors, isValid } = validateReset(this.state);
		if (!isValid) {
			this.setState({ errors });
		}
		return isValid;
	}
	render() {
		const { newpassword, confirmpassword, errors, currentpassword , isLoading} = this.state;
		const { currentPassword }=this.props;
		return (
			
			<KeyboardAwareScrollView
         		scrollEnabled={true}
             	showsVerticalScrollIndicator={false}
             	bounces={false}
             	keyboardShouldPersistTaps='handled'
				>
			<View style={styles.reset}>
					<P style={styles.paragraph}>Please enter your <Text style={styles.bold}>new{'\n'}password.</Text> We’re just being extra{'\n'} safe.</P>
					<View style={styles.button}>
						{(currentPassword === 'Settings') && <TextInput 
							label='CURRENT PASSWORD' 
							name='currentpassword'
							secureTextEntry={true}
							value={currentpassword}
							error={errors.currentpassword}
							onChange={(value) => this.setState({currentpassword: value})} />}
						<TextInput 
							label='NEW PASSWORD' 
							name='newpassword'
							value={newpassword}
							secureTextEntry={true}
							error={errors.newpassword}
							onChange={(value) => this.setState({newpassword: value})} />
						<TextInput 
							label='CONFIRM PASSWORD' 
							name='confirmpassword'
							value={confirmpassword}
							secureTextEntry={true}
							error={errors.confirmpassword}
							lastchild
							onChange={(value) => this.setState({confirmpassword: value})} /> 
					</View> 
					<Button onPress={this.handleSubmit} uppercase bgColor={config.linkColor} label='SAVE' shadow loader={isLoading}/> 
			</View>
			</KeyboardAwareScrollView> 
		);
	}
}

ResetForm.propTypes = {
  resetPasswordAction: PropTypes.func,
  changePassword: PropTypes.func,
  currentPassword:PropTypes.string,
  getErrorStatus: PropTypes.func,
  createLoginAction:PropTypes.func,
  setRouteAction:PropTypes.func
}

export default connect(null, { resetPasswordAction , changePassword, getErrorStatus, createLoginAction, setRouteAction })(ResetForm);