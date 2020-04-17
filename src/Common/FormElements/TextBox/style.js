import { StyleSheet} from 'react-native';
import {config} from '../../../../theme/config';

export const styles = StyleSheet.create({
    input:{
        marginBottom:34,
    },
    lastchild:{
        marginBottom:10,
    },
    inputText:{
        height:30,
        padding:0,
        fontSize: config.fsMedium, 
        fontFamily:config.latoRugular,
        color: config.colorDark, 
        borderBottomWidth: 1, 
        borderBottomColor: config.linkColor,
    },
    label:{
        backgroundColor:'transparent',
        color:config.grayColor,
        fontFamily: config.fontPrimary,
        lineHeight:config.fsRegular,
    },
});