import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import {styles} from './style';

const Gray = ({ children, style, border, styleFont }) =>
	<View style={[style]}>
		{border&&<Text style={styles.topBorder}></Text>}
	    <Text style={[styles.grayText, styleFont]}>{children}</Text>
    </View>;

Gray.propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
    border:PropTypes.bool,
    styleFont: PropTypes.any
};

export default Gray;