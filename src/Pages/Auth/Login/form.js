import React, { Component } from 'react';
import { View, TouchableOpacity, Text, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { config } from '../../../../theme/config';
import Button from '../../../Common/FormElements/Button';
import NavLink from '../../../Common/NavLink';
import { createLoginAction } from '../../../../actions/loginAction';
import {getErrorStatus} from '../../../../actions/globalErrorAction';
import {setRouteAction} from '../../../../actions/tabActivity';
import { resendOtpAction } from '../../../../actions/resendOtpAction';
import {PASSWORD_MATCH, INVALID_LOGIN, KINDLY_SIGN_UP,VERIFY_MOBILE, MEMBER_LOCK} from '../../../../helpers/utilities';
import validateLogin from '../../../Common/Validations/logIn';
import H1 from '../../../Common/Typos/h1';
import TextInput from '../../../Common/FormElements/TextBox';
import { styles } from './style';


const base64 = require('base-64');
const CryptoJS = require('crypto-js');

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			password:'',
			mobile:'',
			loader:false,
			errors: {},
			isPasswordVisible: true
		};
	}
	
	handleClick = () =>{
		Actions.forgot();
	}
	handleSubmit = () =>{
		const { password, mobile } = this.state;
		const cryptPassword = CryptoJS.AES.encrypt(password, 'passwordCrypt');
		if (this.isValid()) {
			this.setState({errors:{},loader:!this.state.loader});
			
			AsyncStorage.getItem('deviceDetails').then(deviceDetails => {
			    const baseAuth = {
					'Authorization':`Basic ${base64.encode(mobile+':'+password)}`,
					'Content-Type': 'application/json;'
				}
				const loginReq = {
					requestType: 'MEMBER',
					deviceId: JSON.parse(deviceDetails).deviceId,
					deviceType: JSON.parse(deviceDetails).deviceType,
					deviceToken: JSON.parse(deviceDetails).deviceToken
				}
				this.props.createLoginAction(loginReq, baseAuth).then(res =>{
						const resObj = {
							authId: mobile,
					   		password: cryptPassword.toString(),
					   		memberId: res.loginDetails.data.memberId,
					   		deviceId: JSON.parse(deviceDetails).deviceId,
					   		deviceToken: JSON.parse(deviceDetails).deviceToken,
						}
						AsyncStorage.setItem('authData', JSON.stringify(resObj));
						const verifiedUserData = {
	                        Bearertoken : res.loginDetails.data.bearerToken,
	                        memberId: res.loginDetails.data.memberId,
	                        mobileNo: mobile,
	                        userStatus: 'LOGGEDIN'
	                    }
	                    AsyncStorage.setItem('verifiedUserData', JSON.stringify(verifiedUserData));
	                    AsyncStorage.setItem('BearerToken', res.loginDetails.data.bearerToken);
	                    this.props.setRouteAction('home');
	                    AsyncStorage.setItem('tabBarFrom', 'home');
	                    Actions.tabbar({type: 'reset'}); 
						Actions.home();
					 
				}).catch(err => {
					this.setState({loader:!this.state.loader});
					if (err.response.data.code === 10056) {
						this.props.getErrorStatus(PASSWORD_MATCH);
					}else if(err.response.data.code === 10057) {
						this.props.getErrorStatus(MEMBER_LOCK);
					}else if(err.response.data.code === 10053) {
						this.props.getErrorStatus(VERIFY_MOBILE);
						AsyncStorage.getItem('deviceDetails').then(value => {
							const resObj = {
								requestType: 'MEMBER',
				                mobileNo: mobile,
				                deviceId: JSON.parse(value).deviceId
				            }
				            this.props.resendOtpAction(resObj).then(otpResponse => {
				                if (otpResponse.resentOtpDetails.data.status === true) {
				                	const resObj = {
										authId: mobile,
								   		password: cryptPassword.toString(),
								   		memberId: '',
								   		deviceId: JSON.parse(deviceDetails).deviceId,
								   		deviceToken: JSON.parse(deviceDetails).deviceToken,
									}
									AsyncStorage.setItem('authData', JSON.stringify(resObj));
				                	AsyncStorage.setItem('verifyType', 'signUp');
					                Actions.verifyaccount({authId:mobile});
				                }
				            }).catch(error =>{
				            	if(error.response.data.code === 10052) {
									this.props.getErrorStatus(KINDLY_SIGN_UP);
									Actions.signup();
								}else if(error.response.data.code === 50000) {
									this.props.getErrorStatus(INVALID_LOGIN);
								}
				            });
						});
					}else if(err.response.data.code === 10052) {
						this.props.getErrorStatus(KINDLY_SIGN_UP);
					}else if(err.response.data.code === 10002) {
						this.props.getErrorStatus(INVALID_LOGIN);
					}else if(err.response.data.code === 50000) {
						this.props.getErrorStatus(INVALID_LOGIN);
					}
				});
			});
		}
	}
	signUPAction = () =>{
		Actions.signup();
	}
	isValid() {
		const { errors, isValid } = validateLogin(this.state);
		if (!isValid) {
			this.setState({ errors });
		}
		return isValid;
	}
	
	render() {
		const {  mobile, errors,password, loader, isPasswordVisible } = this.state;
		return (
			<KeyboardAwareScrollView
				contentContainerStyle={styles.container}
                 scrollEnabled={true}
                 showsVerticalScrollIndicator={false}
                 bounces={false}
                 automaticallyAdjustContentInsets={false}
				 keyboardShouldPersistTaps='handled'
			     >
				<View style={styles.formContainer}>
						<H1 style={{paddingBottom:49}} border>Sign In</H1>
						<TextInput 
							label='Mobile number' 
							name='mobile'
							value={mobile}
							error={errors.mobile}
							keyboardType='phone-pad'
							returnType='done'
							onChange={(e)=>this.setState({mobile:e})} />
						<TextInput 
							label='Password' 
							name='password'
							value={password}
							secureTextEntry={isPasswordVisible}
							error={errors.password}
							lastchild
							visibleIcon
							onChange={(value) => this.setState({password: value})}
							onVisibleChange={() => this.setState({isPasswordVisible: !this.state.isPasswordVisible})} />
						<View style={{width: '100%', alignItems: 'flex-end'}}>
							<TouchableOpacity style={styles.forgot} onPress={this.handleClick}>
								<Text style={styles.forgotText}>Forgot Password?</Text>
							</TouchableOpacity>
						</View>
							<Button onPress={this.handleSubmit} uppercase bgColor={config.linkColor} width='100%' label='SIGN IN' shadow loader={loader} bigButton/>
						<NavLink description='Don’t have an account?' login='SIGN UP' onPress={this.signUPAction}/>
				</View>
			</KeyboardAwareScrollView>
		);
	}
}

LoginForm.propTypes = {
	createLoginAction : PropTypes.func,
	currentStatus: PropTypes.string,
	getErrorStatus: PropTypes.func,
	resendOtpAction:PropTypes.func,
	setRouteAction: PropTypes.func
};

export default connect(null, {createLoginAction, getErrorStatus, resendOtpAction, setRouteAction})(LoginForm);