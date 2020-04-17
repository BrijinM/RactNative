import { StyleSheet } from 'react-native';
import {config} from '../../../theme/config';

export const styles = StyleSheet.create({
    accountText: {
        color: config.colorDark,
        fontSize: config.fsRegular+2,
        paddingBottom: 0,
        letterSpacing:0.28,        
    },
    LinkSignup:{
        fontSize: config.fsRegular+2,
        fontFamily:config.fontPrimary,
        letterSpacing:0.28,
        color:config.linkColor,
    }
});