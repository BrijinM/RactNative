import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';

import {styles} from './style';

const NavLink = ({description, login, onPress}) => 
	<View style={{flexDirection:'row', justifyContent: 'center'}}>
		<Text style={styles.accountText}>{description}</Text>
		<TouchableOpacity onPress={onPress}>
			<Text style={styles.LinkSignup}> {login}</Text>
		</TouchableOpacity>
	</View>;

NavLink.propTypes = {
    description:PropTypes.string,
    login:PropTypes.string,
    style:PropTypes.any,
    onPress:PropTypes.func
};
export default NavLink;

