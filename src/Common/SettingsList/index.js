import React, { Component } from 'react';
import { View, Image, Switch, TouchableOpacity,AsyncStorage} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ContentWidget from '../ContentWidget';
import { switchNotification } from '../../../actions/switchNotificationAction';
import P from '../Typos/p';
import { config } from '../../../theme/config';
import { styles } from './style';

class List extends Component{
	constructor(){
		super();
		this.state ={
			switchStatus: true,
		}
		this.handleSwitch = this.handleSwitch.bind(this);
	}
	handleSwitch(){
		
		this.setState({switchStatus:!this.state.switchStatus});

		AsyncStorage.getItem('verifiedUserData').then(value =>{
			const  profileheaderConfig =  {
	            'Authorization': 'Bearer ' +  JSON.parse(value).Bearertoken,
	            'Content-Type': 'application/json;'
	        } 
	        const data = {
	        	memberId:JSON.parse(value).memberId,
	        	receiveNotification:this.state.switchStatus,
	        	type:'NOTIFICATION'
	        }
	       
	        this.props.switchNotification(data.memberId,data,profileheaderConfig).then(() => {
	        	const notificationStatus = { status: this.state.switchStatus }
	       		AsyncStorage.setItem('notificationStatus',JSON.stringify(notificationStatus)); 
	        });
		});
	}
	componentDidMount() {
		AsyncStorage.getItem('notificationStatus').then(notificationStatus =>{
			this.setState({switchStatus: JSON.parse(notificationStatus).status});
		});
	}
	render(){
		const{label,Notificationswitch,noBorder,onPress, src, style }=this.props;
		const {switchStatus} = this.state;
		return(
			<ContentWidget style={[{paddingLeft:23,paddingRight:0}, style]}>
				<TouchableOpacity onPress={onPress}
				                  disabled={!!Notificationswitch}>
					<View style={[styles.container, noBorder && {borderBottomColor:'transparent'}]}>
						<Image 
							source={src}
			            	style={{height:34,width:34,borderRadius:3}}
			            />
			            <P style={{paddingLeft: 20}}>{label}</P>
			            <View style={styles.switchPosition}>
				            {Notificationswitch &&
				            <Switch 
				            style={styles.switch}
				            value={this.state.switchStatus}
				            onValueChange = {this.handleSwitch}
				            disabled={false}
				            onTintColor={switchStatus?config.OliveHeader:config.grayColor}		
							thumbTintColor={switchStatus?config.linkColor:config.grayColor}
							tintColor={config.grayColor}
			            />}
			            </View>
					</View>
				</TouchableOpacity>
			</ContentWidget>
			);
	}
}
List.propTypes={
	label:PropTypes.string,
	Notificationswitch:PropTypes.bool,
	noBorder:PropTypes.bool,
	onPress:PropTypes.func,
	src: PropTypes.any,
	switchNotification:PropTypes.func,
	notificationSwitch:PropTypes.any,
	style: PropTypes.any
};
function mapStateToProps(state) {
    return {
        notificationSwitch:state.notificationSwitch
    }
}
export default connect(mapStateToProps,{switchNotification})(List);