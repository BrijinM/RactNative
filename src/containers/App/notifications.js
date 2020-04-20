import React, { Component } from 'react';
import { StyleSheet, View, NetInfo, Platform, AsyncStorage, PushNotificationIOS, BackHandler, Alert, AppState } from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import type { Notification,NotificationOpen } from 'react-native-firebase';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import {isEmpty} from 'lodash';

import {internetConnectionStatus} from '../../actions/internetErrorAction';
import {getStateList} from '../../actions/stateListAction';
import {setRouteAction} from '../../actions/tabActivity';
import {getGoldPrice} from '../../actions/goldPriceAction';
import {getErrorStatus} from '../../actions/globalErrorAction';
import InternetErrorCard from '../../components/Common/networkIssue';
import AnimationLoader from '../../components/Common/AnimatedLoader';
import GlobalErrorNotification from '../../components/Common/GlobalError';
import Fade from '../../components/Common/Animation/fade';
import {config} from '../../theme/config';

const styles = StyleSheet.create({
  notifyMessageContent:{
      position:'absolute',
      width:'100%',
      height:'100%',
      zIndex:999999
  },
  loader: {
      width: '100%', 
      height:'100%',
      backgroundColor: config.colorWhite
  }, 
  globalNotification: {
      position:'absolute',
      width:'100%',
      left:0,
      top:0,
      zIndex:999999
  }
});

class Home extends Component{
  constructor(){
    super();
      this.state = {
        internetStatus:'',
        appState: AppState.currentState
      }
      this.handleNetworkConnection = this.handleNetworkConnection.bind(this);
      this._notificationListener = this._notificationListener.bind(this);
      this._handleAppStateChange = this._handleAppStateChange.bind(this);
      this.handleNotification = this.handleNotification.bind(this);
      this.handleBackPress = this.handleBackPress.bind(this);
      this.handleExit = this.handleExit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
      if(nextProps.globalError !== this.props.globalError) {
        if(nextProps.globalError !== '') {
          setTimeout(() => {
            this.props.getErrorStatus('');
          }, 3000)
        }
      }
    }

    async  componentDidMount() {
      AsyncStorage.getItem('notificationStatus').then(notify =>{
        if (notify === null){
           const notificationStatus = { status: true }
           AsyncStorage.setItem('notificationStatus',JSON.stringify(notificationStatus));
        }
      });

    if (Platform.OS === 'ios'){
          PushNotificationIOS.requestPermissions();
           PushNotificationIOS.abandonPermissions();
           PushNotificationIOS.addEventListener('register', (token) => {
              const deviceDetails = {
                  deviceId: DeviceInfo.getUniqueID(),
                  deviceType: Platform.OS === 'ios'?'IOS':'ANDROID',
                  deviceToken: token
              }
              AsyncStorage.setItem('deviceDetails', JSON.stringify(deviceDetails));
          });
          PushNotificationIOS.addEventListener('registrationError', ()=>{
            const deviceDetails = {
                  deviceId: DeviceInfo.getUniqueID(),
                  deviceType: Platform.OS === 'ios'?'IOS':'ANDROID',
                  deviceToken: '598d94c1d601800001a9d778598d94c1d601800001a9d778',
              }
              AsyncStorage.setItem('deviceDetails', JSON.stringify(deviceDetails));

          }) ;
       } else {
          firebase.messaging().getToken().then((token) => {
              const deviceDetails = {
                  deviceId: DeviceInfo.getUniqueID(),
                  deviceType: Platform.OS === 'ios'?'IOS':'ANDROID',
                  deviceToken: token,
              }
              AsyncStorage.setItem('deviceDetails', JSON.stringify(deviceDetails));
          });
          BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
          BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
       }
       try {
            if(Platform.OS === 'ios'){
              let backgroundNotification;
                PushNotificationIOS.addEventListener('notification', notification => {
                   if (AppState.currentState === 'background') {
                      backgroundNotification = notification;
                    }
                });
                PushNotificationIOS.getInitialNotification().then(notification =>{
                  if (notification != null) {
                    this._notificationListener(notification)
                  }
                });
                AppState.addEventListener('change', new_state => {
                  if (new_state === 'active' && backgroundNotification != null) {
                    this._notificationListener(backgroundNotification);
                    backgroundNotification = null;
                  }
                });
            } 
        } catch(err) {
            console.log(err);
        }
      NetInfo.addEventListener('connectionChange',this.handleNetworkConnection);
      AppState.addEventListener('change', this._handleAppStateChange);
      this.props.getStateList();
      this.props.getGoldPrice();

      const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
            .setDescription('My apps test channel');
          firebase.notifications().android.createChannel(channel);
             this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
             this.handleNotification()
            const action = notificationOpen.action;
            const notification: Notification = notificationOpen.notification;
      });

      const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
           this.handleNotification()
          firebase.notifications().removeAllDeliveredNotifications(); 
            const action = notificationOpen.action;
            const notification: Notification = notificationOpen.notification;
        }

      this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
          // AsyncStorage.setItem('tabBarFrom', 'notification');
          // Actions.notification();
      });
      this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
        //  this.handleNotification()
      });
    }
    componentWillUnmount(){
      NetInfo.removeEventListener('connectionChange',this.handleNetworkConnection);
      PushNotificationIOS.removeEventListener('notification', this._notificationListener);
      this.notificationDisplayedListener();
      this.notificationListener();
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
      AppState.removeEventListener('change', this._handleAppStateChange);
    }
    _notificationListener(notification) {
        const data = notification.getAlert();
        
        if (data) {
            this.handleNotification();
        }
    }
    _handleAppStateChange = (nextAppState) =>{
         if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            this.handleNetworkConnection()
          }
          this.setState({appState: nextAppState});
    }
    handleNotification() {
      this.props.setRouteAction('notification');
      AsyncStorage.setItem('tabBarFrom', 'notification');
      Actions.notification();
    }
    handleNetworkConnection(){
        NetInfo.isConnected.fetch().done((isConnected) => { 
            if(isConnected) {
                this.setState({internetStatus:'connectionTrue' });
                this.props.getStateList();
                this.props.getGoldPrice();
            }
            else{
              this.setState({internetStatus: 'connectionFalse'});
            }
            this.props.internetConnectionStatus(this.state.internetStatus);
        });
    }

    handleExit(){
    Alert.alert(
      'Do you want to exit the App',
      '',
      [
        {text: 'Yes', onPress: () => BackHandler.exitApp()},

        {text: 'No'},
      ],
      { cancelable: false }
    )  
  }
  
  handleBackPress = () =>{
    if (Actions.currentScene === 'home') {
        return this.handleExit();
    } else if(Actions.currentScene === 'login'){
        BackHandler.exitApp()
    }else if ( Actions.currentScene === 'appsettings' || Actions.currentScene === 'notification' || Actions.currentScene === 'schemelist'){
        AsyncStorage.setItem('tabBarFrom', 'home');
        Actions.tabbar({type: 'reset'}); 
        Actions.home();
    }else if(Actions.currentScene === 'profileEdit'){
      AsyncStorage.setItem('tabBarFrom', 'appsettings');
      Actions.tabbar({type: 'reset'}); 
      Actions.appsettings();
    }else {
        Actions.pop();
    }
    return true;
  }

render() {
  const { networkStatus, globalError }=this.props;
  const { internetStatus } = this.state;
  return(
      <View style={{flex:1}}>
       { networkStatus === 'connectionFalse' && 
        <View style={styles.notifyMessageContent}>
                <InternetErrorCard onPress={this.handleNetworkConnection}/>
              </View> } 
        {isEmpty(internetStatus) && (Platform.OS === 'ios')  && <AnimationLoader style={styles.loader} />}
          <Fade visible={!isEmpty(globalError)} style={styles.globalNotification}>
             <GlobalErrorNotification content={globalError}/>
           </Fade> 
        {networkStatus !== 'connectionFalse' && this.props.children}
      </View>
    );
  }
}

Home.propTypes = {
  internetConnectionStatus: PropTypes.func,
  networkStatus: PropTypes.oneOfType([PropTypes.object,PropTypes.string]),
  getStateList: PropTypes.func,
  getGoldPrice: PropTypes.func,
  showSessionLoader: PropTypes.func,
  globalError: PropTypes.oneOfType([PropTypes.object,PropTypes.string]),
  getErrorStatus: PropTypes.func,
  setRouteAction: PropTypes.func,
  children: PropTypes.node
}
function mapStateToProps(state) {
    return {
        networkStatus:state.internetConnection,
        globalError:state.globalErrorNotification
    }
}
export default connect(mapStateToProps, {internetConnectionStatus, getStateList, getGoldPrice, getErrorStatus,setRouteAction})(Home);
