import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { resendOtpAction } from '../../../../actions/resendOtpAction';
import {getErrorStatus} from '../../../../actions/globalErrorAction';
import TextInput from '../../../Common/FormElements/TextBox';
import validateForgot from '../../../Common/Validations/forgotPassword';
import Button from '../../../Common/FormElements/Button';
import P from '../../../Common/Typos/p';
import {INVALID_LOGIN, KINDLY_SIGN_UP, MEMBER_LOCK} from '../../../../helpers/utilities';
import { config } from '../../../../theme/config';
import { styles } from './style';

class ForgotScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mobile: '',
			errors: {},
			isLoading: false
		};
	}
	handleSubmit = () =>{
		const { mobile } = this.state;
		if (this.isValid()) {
			this.setState({errors: {}, isLoading:!this.state.isLoading});
			AsyncStorage.getItem('deviceDetails').then(value => {
				const resObj = {
					requestType: 'MEMBER',
	                mobileNo: mobile,
	                deviceId: JSON.parse(value).deviceId
	            }
	            this.props.resendOtpAction(resObj).then(res => {
	                if (res.resentOtpDetails.data.status === true) {
	                	this.setState({isLoading:!this.state.isLoading});
	                	AsyncStorage.setItem('verifyType', 'forgotPassword');
		                Actions.verifyaccount({authId:mobile});
	                }
	            }).catch(error =>{
	            	this.setState({isLoading:!this.state.isLoading});
	            	if(error.response.data.code === 10052) {
						this.props.getErrorStatus(KINDLY_SIGN_UP);
						Actions.signup();
					}else if(error.response.data.code === 50000) {
						this.props.getErrorStatus(INVALID_LOGIN);
					}if(error.response.data.code === 10057) {
						this.props.getErrorStatus(MEMBER_LOCK);
						Actions.login({type: 'reset'});
					}
 	            });
			});
		}
	}
	isValid() {
		const { errors, isValid } = validateForgot(this.state);
		if (!isValid) {
			this.setState({ errors });
		}
		return isValid;
	}
	render() {
		const { mobile, errors, isLoading } = this.state;
		return (
				<KeyboardAwareScrollView
	                 scrollEnabled={true}
	                 showsVerticalScrollIndicator={false}
	                 keyboardShouldPersistTaps='handled'
	                 bounces={false}
					>
					<View style={{paddingHorizontal:50,paddingTop:30}}>
						<P style={styles.paragraph}>
							To reset password,{'\n'} we need to text your <Text style={styles.bold}>OTP</Text> to{'\n'} authenticate your account. 
						</P>
						<View style={{marginTop:110,marginBottom:100}}>
							<TextInput 
								label='Mobile number' 
								name='mobile'
								value={mobile}
								error={errors.mobile}
								keyboardType='phone-pad'
								returnType='done'
								onChange={(value) => this.setState({mobile: value})} />
						</View>
						<Button onPress={this.handleSubmit} uppercase bgColor={config.linkColor} width='100%' label='SEND OTP' shadow bigButton loader={isLoading}/>
					</View>
				</KeyboardAwareScrollView>

		);
	}
}

ForgotScreen.propTypes = {
  resendOtpAction: PropTypes.func,
  getErrorStatus: PropTypes.func,
}

export default connect(null, {resendOtpAction, getErrorStatus})(ForgotScreen);