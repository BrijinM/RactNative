import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './style';

const WhiteButton = ({onTrigger, style, children, uppercase, textStyle}) => 
    <TouchableOpacity onPress={onTrigger} style={[styles.WhiteButton, style]}>
        <Text style={[styles.whitText, textStyle]}> {uppercase?children.toUpperCase():children} </Text>
    </TouchableOpacity>;

WhiteButton.propTypes = {
    onTrigger:PropTypes.func,
    style:PropTypes.any,
    children: PropTypes.node,
    uppercase: PropTypes.bool,
    textStyle: PropTypes.any
};
export default WhiteButton;