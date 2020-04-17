import { StyleSheet } from 'react-native';
import {config} from '../../../theme/config';

export const styles = StyleSheet.create({
    iconPosition: {
        height:15,
        width:15,
        position:'absolute',
        top:0,
        alignItems:'center',
        justifyContent:'center',
        zIndex:9999,
    },
    leftPos: {
        left:0,
    },
    rightPos: {
        right:0,
    },
    whitText: {
        color: config.colorWhite,
        fontSize: config.fsSmall,
        fontFamily: config.fontPrimary,
    },
    whiteButton: {
        backgroundColor: 'transparent',
        borderColor: config.colorWhite,
        borderWidth: 2,
        borderRadius: 3,
        alignItems: 'center'
    }

});