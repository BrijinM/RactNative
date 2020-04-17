import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './style';

const CloseBlackButton = ({onTrigger, style, leftPosition, rightPosition}) => 
    <TouchableOpacity onPress={onTrigger} style={[leftPosition && styles.leftPos, rightPosition && styles.rightPos, styles.iconPosition, style]}>
        <Image source={require('../../../assets/images/cancel.png')} resizeMode='contain' style={{height:11, width:11, flexShrink:1}} />
    </TouchableOpacity>;

CloseBlackButton.propTypes = {
    onTrigger:PropTypes.func,
    style:PropTypes.any,
    leftPosition: PropTypes.bool,
    rightPosition: PropTypes.bool
};
export default CloseBlackButton;