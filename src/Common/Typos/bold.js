import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import {styles} from './style';

const Bold = ({ children,style, styleFont}) =>
	<View style={[style,{flexWrap:'wrap'}]}>
	    <Text style={[styles.boldText, styleFont]}>{children}</Text>
    </View>;

Bold.propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
    styleFont: PropTypes.any
};

export default Bold;