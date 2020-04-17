import React, { Component } from 'react';
import { View} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { isEmpty } from 'lodash';
import ResetForm from './resetPassword';
import Header from '../../../Common/Header';
import Logo from '../../../Common/Logo';
import AnimationLoader from '../../../Common/AnimatedLoader';
import { styles } from './style';

class ResetPassword extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	screenName:''
	  };
	}
	componentDidMount() {
		setTimeout(() => {
            this.setState({
                screenName:Actions.currentParams.screen
            })
        }, 50)
	}
	onTrigger(){
		Actions.pop();
	}
	render() {
		const {screenName} = this.state;
		return (
			<View style={styles.container}>
			    <Logo style={{marginRight:-20}}/>
				<Header label='Reset Password' onPress={this.onTrigger} arrow/>
				{ !isEmpty(screenName) ? <ResetForm currentPassword={screenName}/>: <AnimationLoader style={{width: '100%', height:'100%',color: 'red', zIndex: 9999 }} /> }
			</View>
		);
	}
}

export default ResetPassword;


