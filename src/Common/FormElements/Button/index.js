import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text} from 'react-native';
import Loader from '../../Loader';
import { styles } from './style';

const Button = ({ label, bgColor, onPress, flatButton, flatText, noBg, noMargin, secondary, width, smallButton, shadow, style, loader,bigButton, styleFont}) =>
    <View style={[styles.buttonWrapper, {width}, noBg && styles.noBg, noMargin && styles.noMargin, style]}>
        <TouchableOpacity onPress={onPress} style={[styles.buttonRow, flatText && styles.flatText, smallButton && styles.smallButton, shadow && styles.shadowButton, {backgroundColor: bgColor,height:bigButton && 60}]}>
    	   <Text style={[styles.button, flatButton && styles.flatButton, secondary && styles.secondaryButton, styleFont, loader && styles.loaderButton]}>
                {loader ? label :label }
    	    </Text>
           {loader && <Loader style={styles.loader} />}
        </TouchableOpacity>
    </View>;

Button.propTypes = {
    label: PropTypes.string.isRequired,
    bgColor: PropTypes.string,
    uppercase: PropTypes.bool,
    smallButton:PropTypes.any,
    onPress: PropTypes.func,
    width:PropTypes.string,
    secondary: PropTypes.bool,
    shadow: PropTypes.bool,
    flatButton: PropTypes.bool,
    flatText: PropTypes.bool,
    noBg: PropTypes.bool,
    noMargin: PropTypes.bool,
    style: PropTypes.any,
    loader: PropTypes.bool,
    bigButton:PropTypes.bool,
    styleFont: PropTypes.any
};

export default Button;