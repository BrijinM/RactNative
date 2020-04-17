import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import {styles} from './style';

const H3 = ({ children, uppercase, style }) =>
    <Text style={[styles.titleThree, style]}>
        {uppercase?children.toUpperCase():children}
    </Text>;

H3.propTypes = {
    children: PropTypes.node.isRequired,
    uppercase: PropTypes.bool,
    style: PropTypes.any,
};

export default H3;