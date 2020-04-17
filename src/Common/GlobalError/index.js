import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import {config} from '../../../theme/config';

const styles = StyleSheet.create({
    container: {
        backgroundColor: config.statusBarcolor,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    content: {
        fontWeight: '700',
        fontSize: 18,
        color: 'white',
        textAlign:'center'
    },
});

class NotifyPopup extends React.Component {
    render() {
        const { content, cancel, customStyle } = this.props;
        return (
            <View style={[styles.container, cancel && { backgroundColor: 'red' }, customStyle]}>
                <Text style={styles.content}>{content}</Text>
            </View>
        );
    }
}

NotifyPopup.propTypes = {
    content: PropTypes.oneOfType([PropTypes.object,PropTypes.string]),
    cancel: PropTypes.any,
    customStyle: PropTypes.any
} 

export default NotifyPopup;