import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const ContentPadding = ({children, style}) => 
	<View style={[{padding:15}, style]}>{children}</View>;

ContentPadding.propTypes = {
    children:PropTypes.node,
    style:PropTypes.any,
};
export default ContentPadding;

