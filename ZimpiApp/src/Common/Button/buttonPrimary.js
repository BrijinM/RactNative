import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

import H2 from '../Inheritance/h2';
import {config} from '../../../theme/config';

const style = EStyleSheet.create({
    buttonStyle: {
        backgroundColor:'$primaryColor',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft:10,
        paddingRight: 10,
    },
});

const styles = StyleSheet.create({
    positionElem: {
        zIndex:1,
        position:'absolute',
        bottom:0,
        left:0,
        width:'100%',
    },
});

const ButtonPrimary = ({label, pos, onTrigger}) => (
    <TouchableOpacity onPress={onTrigger}>
        <View
            style={[style.buttonStyle, pos && styles.positionElem]}>
            <H2><Text style={{color:config.colorWhite}}>{label.toUpperCase()}</Text></H2>
        </View>
    </TouchableOpacity>  
);

ButtonPrimary.propTypes = {
    pos:PropTypes.string,
    onTrigger:PropTypes.func,
    label:PropTypes.string.isRequired,
};

export default ButtonPrimary;


