import { StyleSheet } from 'react-native';
import {config} from '../../../theme/config';

export const styles = StyleSheet.create({
    title: {
        backgroundColor:'transparent',
        color: config.colorBlack,
        fontSize: config.fsXXL,
        fontFamily: config.fontSecondory,
        fontWeight:'800',
        lineHeight: 50,
        paddingBottom: 0,
    },
    titleBorder:{
        backgroundColor:config.linkColor,
        marginTop:5,
        height:3,
        width:42,
    },
    topBorder:{
        backgroundColor:config.linkColor,
        marginVertical:5,
        height:3,
        width:25,
    },
    titleTwo: {
        backgroundColor:'transparent', 
        color: config.colorBlack,
        fontSize: config.fsXL,
        fontFamily: config.fontPrimary,
        fontWeight:'600',
        lineHeight: config.fsXL+2, 
        paddingBottom:10,
    },
    titleThree: {
        backgroundColor:'transparent',
        color: config.colorBlack,
        fontSize: config.fsMedium,
        fontFamily: config.fontPrimary,
        fontWeight:'700',
        lineHeight: config.fsMedium+2, 
        paddingBottom:10,
    },
    paragraph: {
        backgroundColor:'transparent',
        color: config.colorDark,
        fontFamily: config.latoRugular,
        fontSize:17,
        lineHeight:20,
        padding:0,
    },
    grayText:{
        fontSize:11,
        fontFamily:config.latoBold,
        color:config.grayColor,
        flexWrap: 'wrap',
    },
    boldText:{
        fontFamily:config.fontPrimary,
        fontSize:16,
        flexWrap: 'wrap',
        color: config.shadow
        // fontWeight: Platform.OS === 'ios'?'600':'900',
    },
    border:{
        color:config.Chenin,
        borderBottomWidth:4,
        borderBottomColor:config.Chenin,
    }
});