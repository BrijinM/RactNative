import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import  validateSignup  from '../../../Common/Validations/signUp';
import { signupAction } from '../../../../actions/signUpAction';
import {getErrorStatus} from '../../../../actions/globalErrorAction';
import { config } from '../../../../theme/config';
import {MEMBER_EXIST, INVALID_LOGIN, MEMBER_LOCK} from '../../../../helpers/utilities';
import TextInput from '../../../Common/FormElements/TextBox';
import Button from '../../../Common/FormElements/Button';
import NavLink from '../../../Common/NavLink';
import H1 from '../../../Common/Typos/h1';

import { styles } from './style';

const CryptoJS = require('crypto-js');

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			mobile:'',
			password:'',
			loaderStatus:false,
			confirmpassword:'',
			errors:{},
			loader:false
		};
	}
	handleRouting = (authId, otp, status) => {
		if (status === 'ACTIVE') {
			AsyncStorage.setItem('verifyType', 'signUp');
			this.setState({loaderStatus:!this.state.loaderStatus
		});
			Actions.verifyaccount({authId, otp});
		}
	}
	handleSubmit = () =>{
		const { name, mobile, password} = this.state;
		const cryptPassword = CryptoJS.AES.encrypt(password, 'passwordCrypt');
		if (this.isValid()) {
			this.setState({errors: {},loaderStatus:!this.state.loaderStatus});
			AsyncStorage.getItem('deviceDetails').then(value => {
				const resObjRegister = {
					name,
					role: 'MEMBER',
					authentication: {
					    authMech: 'MOBILE',
					    authId: mobile,
					    password,
					},
					device: JSON.parse(value)
				};
				this.props.signupAction(resObjRegister).then(res => {
					if (res.signupDetailData.data.status === 'ACTIVE'){
						const resObj = {
							authId: mobile,
					   		password: cryptPassword.toString(),
					   		memberId: res.signupDetailData.data.memberId,
					   		deviceId: res.signupDetailData.data.device.deviceId,
					   		deviceToken: res.signupDetailData.data.device.deviceToken,
						}
						AsyncStorage.setItem('authData', JSON.stringify(resObj));
						this.handleRouting(res.signupDetailData.data.authentication.authId, res.signupDetailData.data.otp, res.signupDetailData.data.status)
					} 
				}).catch(err => {
					this.setState({loaderStatus:!this.state.loaderStatus});
					if(err.response.data.code === 10052) {
						this.props.getErrorStatus(MEMBER_EXIST);
						Actions.login({type: 'reset'});
					}else if(err.response.data.code === 10002) {
						this.props.getErrorStatus(INVALID_LOGIN);
					}else if(err.response.data.code === 50000) {
						this.props.getErrorStatus(INVALID_LOGIN);
					} if(err.response.data.code === 10057) {
						this.props.getErrorStatus(MEMBER_LOCK);
						Actions.login({type: 'reset'});
					}
	            });
	        });
		}
	}
	isValid() {
		const { errors, isValid } = validateSignup(this.state);
		if (!isValid) {
			this.setState({ errors });
		}
		return isValid;
	}
	signInAction = () => {
		Actions.login();
	}
	render() {
		const { name, mobile, password, confirmpassword, errors} = this.state;
		return (
				<KeyboardAwareScrollView
	                 scrollEnabled={true}
	                 showsVerticalScrollIndicator={false}
	                 bounces={false}
	                 keyboardShouldPersistTaps='handled'
					>
					<View style={styles.container}>
						<H1 style={{paddingBottom:24}} border>Sign Up</H1>
						<TextInput 
							label='Name' 
							name='name'
							value={name}
							error={errors.name}
							onChange={(value) => this.setState({name: value})} />
						<TextInput 
							label='Mobile number' 
							name='mobile'
							value={mobile}
							error={errors.mobile}
							keyboardType='phone-pad'
							returnType='done'
							onChange={(value) => this.setState({mobile: value})} />
						<TextInput 
							label='Password' 
							name='password'
							value={password}
							error={errors.password}
							secureTextEntry={true}
							onChange={(value) => this.setState({password: value})} />
						<TextInput 
							label='confirm password' 
							name='confirmpassword'
							value={confirmpassword}
							error={errors.confirmpassword}
							secureTextEntry={true}
							onChange={(value) => this.setState({confirmpassword: value})} />
						<Button onPress={this.handleSubmit} uppercase width='100%' bgColor={config.linkColor} label='SIGN UP' bigButton loader={this.state.loaderStatus} shadow />
						<NavLink description='I already have account.' login='SIGN IN' onPress={this.signInAction}/>
					</View>
				</KeyboardAwareScrollView>
		);
	}
}

SignUp.propTypes = {
  signupAction: PropTypes.func,
  getErrorStatus: PropTypes.func
}

export default connect(null, {signupAction, getErrorStatus})(SignUp);