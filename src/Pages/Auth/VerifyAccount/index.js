import React, { Component } from 'react';
import { View} from 'react-native';
import { Actions } from 'react-native-router-flux';

import VerifyScreen from './verifyScreen';
import Header from '../../../Common/Header';
import Logo from '../../../Common/Logo';
import { styles } from './style';

class PasscodeScreen extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	mobile: ''
	  };
	}
	onTrigger(){
		Actions.pop();
	}
	componentDidMount() {
		setTimeout(() => {
            this.setState({
                mobile:Actions.currentParams.authId
            })
        }, 2000)
	}
	render() {
		return (
			<View style={styles.container}>
				<Logo style={{marginRight:-20}}/>
				<Header label='Verifying your account' onPress={this.onTrigger} arrow/>
				<VerifyScreen mobile={this.state.mobile}/>
			</View>
		);
	}
}

export default PasscodeScreen;