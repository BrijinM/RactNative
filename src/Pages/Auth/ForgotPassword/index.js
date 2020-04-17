import React, { Component } from 'react';
import { View} from 'react-native';
import { Actions } from 'react-native-router-flux';

import ForgotScreen from './form';
import Header from '../../../Common/Header';
import Logo from '../../../Common/Logo';
import { styles } from './style';

class ForgotPassword extends Component {
	onPress(){
		Actions.pop();
	}
	render() {
		return (
			<View style={styles.container}>
				<Logo style={{marginRight:-20}}/>
				<Header label='Forgot Password' onPress={this.onPress} arrow/>
				<ForgotScreen />
			</View>
		);
	}
}

export default ForgotPassword;