import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import {styles} from './style';

const Header = ({ label, style, arrow, onPress }) =>
    <View style={[styles.headerStyle, style]}>
        <Text style={styles.heading}>{label}</Text>
        {arrow !== undefined &&
        <TouchableOpacity style={styles.stretch} onPress={onPress}>
            <View style={styles.icon}>
                <Image style={styles.leftArrow} resizeMode='cover' source={require('../../../assets/images/icons/back_arrow.png')} />
            </View>
        </TouchableOpacity>}
    </View>;

Header.propTypes = {
    label: PropTypes.string,
    arrow:PropTypes.any,
    onPress: PropTypes.func,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array,PropTypes.any]),
};

export default Header;