import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image } from 'react-native';

import P from '../Typos/p';
import H2 from '../Typos/h2';
import Button from '../FormElements/Button';
import { config } from '../../../theme/config';

const styles = StyleSheet.create({
	container:{
		alignItems:'center',
		paddingTop:90,
		justifyContent:'center',
		backgroundColor:config.colorWhite,
		flex:1
	},
	noWifi:{
		width: 150,
		height:200
	}

});

class NetworkError extends Component {
	render() {
		const { onPress, status } = this.props;
		return (
			<View style={styles.container}>
				<Image 
	                style={styles.noWifi}
		            source={require('../../../assets/images/noWifi.png')}
		            />
		        { (status !== 'paymentFailure') && <View> 
		        	<H2 style={{paddingTop:50,fontSize:16}}>Oops your internet connection seems off...</H2>
			   	    <P style={{paddingTop:0,fontSize:17}}> Check your internet connection and try again.</P>
			   	 </View> }
			    {(status === 'paymentFailure') && <H2 style={{paddingTop:50,fontSize:16}}>Your Payment was Failed. Please try again</H2>}
			    <Button style={{paddingTop:80}} onPress={onPress} uppercase bgColor={config.linkColor} width='80%' label={(status==='paymentFailure')?'BACK':'REFRESH'} />
			</View>
		);
	}
}
NetworkError.propTypes={
	onPress:PropTypes.func,
	status:PropTypes.string
}

export default NetworkError;