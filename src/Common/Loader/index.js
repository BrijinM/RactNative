import React from 'react'
import { ActivityIndicator,  StyleSheet,  View } from 'react-native';
import PropTypes from 'prop-types';
import {config} from '../../../theme/config';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        flex: 1,
        justifyContent: 'center',
        position: 'absolute',
        width: 50,
        height: 50,
        zIndex:3,
    },
    Loaderontainer: {
        width: '50',
        height: '50', 
        backgroundColor: 'rgba(255,255,255,0.5)',
        flex: 1,

    }
});

const ActivitySpinner = ({style, size}) =>
    <View style={[styles.container, style]}>
        <ActivityIndicator size={size} color={config.grayColor} />
    </View>;

ActivitySpinner.propTypes = {
    style: PropTypes.any,
    size: PropTypes.string
}

export default ActivitySpinner;