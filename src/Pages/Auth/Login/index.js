import React, { Component } from 'react';
import { View, Platform, AsyncStorage, PushNotificationIOS } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import firebase from 'react-native-firebase';
import LoginForm from './form';
import Logo from '../../../Common/Logo';
import { styles } from './style';
 
class Login extends Component {
	
	componentDidMount(){
		AsyncStorage.getItem('logOutStatus').then(res =>{
			if (res ==='logOut'){
				if (Platform.OS === 'ios'){
					 PushNotificationIOS.requestPermissions();
          			 PushNotificationIOS.abandonPermissions();
		            PushNotificationIOS.addEventListener('register', (token) => {
			            const deviceDetails = {
			                deviceId: DeviceInfo.getUniqueID(),
			                deviceType: Platform.OS === 'ios'?'IPHONE':'ANDROID',
			                deviceToken: token,
			            }
		                AsyncStorage.setItem('deviceDetails', JSON.stringify(deviceDetails));
		            });
		            PushNotificationIOS.addEventListener('registrationError', ()=>{
			            const deviceDetails = {
			                  deviceId: DeviceInfo.getUniqueID(),
			                  deviceType: Platform.OS === 'ios'?'IPHONE':'ANDROID',
			                  deviceToken: '598d94c1d601800001a9d778598d94c1d601800001a9d778',
			             }
			            AsyncStorage.setItem('deviceDetails', JSON.stringify(deviceDetails));

			         }) ;
		        } else {
		            firebase.messaging().getToken().then((token) => {
		            	const deviceDetails = {
			                deviceId: DeviceInfo.getUniqueID(),
			                deviceType: Platform.OS === 'ios'?'IPHONE':'ANDROID',
			                deviceToken: token,
			            }
		              	AsyncStorage.setItem('deviceDetails', JSON.stringify(deviceDetails));
		            });
			    }
			}
		});
		
	}
	render() {
		return (
			<View style={styles.container} >
				<Logo />
				<LoginForm />
			</View>
		);
	}
}

export default Login;