import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import {styles} from './style';

const H1 = ({ children, uppercase, style, border }) =>
	<View style={[style]}>
	    <Text style={styles.title}>
	        {uppercase?children.toUpperCase():children}
	    </Text>
	    {border&&<Text style={styles.titleBorder}></Text>}
    </View>;

H1.propTypes = {
    children: PropTypes.node.isRequired,
    uppercase: PropTypes.bool,
    border:PropTypes.bool,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
};

export default H1;