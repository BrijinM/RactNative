import React from 'react';
import {View, StyleSheet, Platform, StatusBar} from 'react-native';
import PropTypes from 'prop-types';
import {config} from '../../../theme/config';

const styles = StyleSheet.create({
    statusBarBackground: {
        height: (Platform.OS === 'ios') ? 20 : 0,
        backgroundColor: config.statusBarcolor,
        zIndex:9,
    },
})

const StatusBarBackground = ({style}) =>
    <View style={[styles.statusBarBackground, style || {}]}>
    	<StatusBar
		    backgroundColor={config.statusBarcolor}
		    barStyle='light-content' />
    </View>;

StatusBarBackground.propTypes = {
    style: PropTypes.any,
};    

export default StatusBarBackground;