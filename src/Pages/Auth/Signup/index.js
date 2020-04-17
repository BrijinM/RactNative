import React, { Component } from 'react';
import { View} from 'react-native';
import SignupForm from './SignupForm';
import Logo from '../../../Common/Logo';
import { styles } from './style';

class SignupScreen extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Logo />
				<SignupForm />
			</View>
		);
	}
}

export default SignupScreen;