import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import {styles} from './style';

const H2 = ({ children, uppercase, style }) =>
    <Text style={[styles.titleTwo, style]}>
        {uppercase?children.toUpperCase():children}
    </Text>;

H2.propTypes = {
    children: PropTypes.node.isRequired,
    uppercase: PropTypes.bool,
    style: PropTypes.any,
};

export default H2;