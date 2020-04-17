import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import {config} from '../../../theme/config';

import {styles} from './style';

const P = ({ children, uppercase, style, bold, semiBold, numberOfLines, medium }) =>
    <Text 
    	numberOfLines={numberOfLines} 
    	style={[styles.paragraph, bold && {fontWeight:'bold'}, medium?{fontSize:config.fsMedium}:{fontSize:config.fsRegular}, semiBold&&{fontWeight:'600'}, style]}>
        {uppercase?children.toUpperCase():children}
    </Text>;
    
P.propTypes = {
    children: PropTypes.node.isRequired,
    uppercase: PropTypes.bool,
    semiBold: PropTypes.bool,
    bold: PropTypes.bool,
    medium: PropTypes.bool,
    numberOfLines: PropTypes.number,
    style: PropTypes.any,
};

export default P;	