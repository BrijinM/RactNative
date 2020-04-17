
import React from 'react';

import { StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
	backgroundImage:{
        position:'absolute',
        width:'80%',
        height:191,
        top:50,
        right:0,
    },
});

const Logo = ({style}) => 
    <Image resizeMode='contain' source={require('../../../../src/assets/images/logo.png')} 
			style={[styles.backgroundImage, style]} />;

Logo.propTypes ={
	style : PropTypes.any
}


export default Logo;