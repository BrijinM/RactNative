import React, { Component } from 'react';
import {View, AsyncStorage, StyleSheet } from 'react-native';
import { Router, Stack, Scene } from 'react-native-router-flux';
import {connect} from 'react-redux';
import Login from '../../routes/Auth/Login';
import Signup from '../../routes/Auth/Signup';
import ForgotPassword from '../../routes/Auth/ForgotPassword';
import VerifyAccount from '../../routes/Auth/VerifyAccount';
import ResetPassword from '../../routes/Auth/ResetPassword';
import SchemeList from '../../routes/Schemes/SchemeList';
import SchemePlans from '../../routes/Schemes/SchemePlans';
import JoinSchemes from '../../routes/Schemes/JoinSchemes';
import TabIcon from '../../routes/Dashboard/TabIcon';
import Home from '../../routes/Dashboard/HomeScreen';
import Notifications from '../../routes/Dashboard/Notifications';
import ProfileSettings from '../../routes/Profile/profileSettings';
import EditprofileData from '../../routes/Profile/Editprofile';
import CheckoutScreen from '../../routes/Checkout';
import Contactus from '../../routes/Profile/Contact';
import AnimationLoader from '../../components/Common/AnimatedLoader';
import NotificationConnector from './notifications';
import {config} from '../../theme/config';


const ConnectedRoute = connect()(Router);

const styles = StyleSheet.create({
  loader: {
        width: '100%', 
        height:'100%',
        zIndex: 9999,
        backgroundColor: config.colorWhite
    }
});

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isLoggedIn: false,
      isFirst:false
    };
  }
  async componentDidMount() {
    AsyncStorage.getItem('verifiedUserData').then((value) => {
      if (JSON.parse(value) === null){
        this.setState({ isFirst: true, isLoggedIn: false });
      }else if (JSON.parse(value).userStatus === 'LOGGEDIN') {
          this.setState({ isFirst: false, isLoggedIn: true });
        }else if(JSON.parse(value).userStatus === 'VERIFIED'){
            this.setState({ isFirst: true, isLoggedIn: false });
        }
    });
  }
   
  render() {
    const {isLoggedIn, isFirst} = this.state;  
    if(!isLoggedIn) { 
      if(!isFirst) {
        return <View style={{flex:1}}>
           {!isFirst && <AnimationLoader style={styles.loader} />} 
         </View>
      }
    }
    return (
      <NotificationConnector>
        <ConnectedRoute>
          <Stack key='root' hideNavBar={true} panHandlers={null} swipeEnabled={false}>
            <Scene key='login' component={Login} initial={!isLoggedIn && isFirst} />
            <Scene key='signup' component={Signup} />
            <Scene key='forgot' component={ForgotPassword} />
            <Scene key='verifyaccount' component={VerifyAccount} />
            <Scene key='resetpassword' component={ResetPassword}/>
            <Scene key='tabbar'
                  initial={isLoggedIn && !isFirst}
                  tabs={true}
                  tabBarPosition={'bottom'}
                  wrap={false}
                  showLabel={false}
                  tabBarComponent={TabIcon} >
                  <Scene key='home' component={Home} hideNavBar={true} />
                  <Scene key='schemelist' component={SchemeList} hideNavBar={true} />
                  <Scene key='notification' component={Notifications} hideNavBar={true} />
                  <Scene key='appsettings' component={ProfileSettings}/>
            </Scene> 
            <Scene key='schemeplans' component={SchemePlans} />
            <Scene key='joinscheme' component={JoinSchemes}/>
            <Scene key='profileEdit' component={EditprofileData} />
            <Scene key='checkout' component={CheckoutScreen} />
            <Scene key='contactus' component={Contactus} />
          </Stack>
        </ConnectedRoute>  
      </NotificationConnector>
    );
  }
}

export default App;