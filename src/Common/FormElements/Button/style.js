import { StyleSheet, Platform } from 'react-native';
import {config} from '../../../../theme/config';

export const styles = StyleSheet.create({
    buttonRow: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderRadius:3,
        paddingVertical: 10,
        marginVertical: 7,
        alignItems: 'center',
        borderBottomWidth:3,
        borderBottomColor:config.buttonColor,
        justifyContent: 'center',
    },
    buttonWrapper:{
        marginBottom:20,
    },
    button: {
        backgroundColor:'transparent',
        textAlign:'center',
        fontFamily:config.fontPrimary,
        color: config.colorWhite,
        fontSize:config.fsLarge,
        letterSpacing:0.28,
        lineHeight: config.fsMedium+11,
        padding: 5,
    },
    loaderButton: {
        backgroundColor:'transparent',
        textAlign:'center',
        fontFamily:config.fontPrimary,
        color: config.linkColor,
        fontSize:config.fsLarge,
        letterSpacing:0.28,
        lineHeight: config.fsMedium+11,
        padding: 5,
    },
    secondaryButton: {
        fontSize:config.fsRegular,
        fontFamily:config.latoBold,
        marginVertical: 0,
    },
    shadowButton: {
        shadowColor: config.buttonColor,
        shadowOffset: {
            width: 0,
            height: 9
        },
        shadowRadius: 10,
        shadowOpacity: 0.3
    },
    smallButton:{
        paddingVertical: 0,
        marginVertical:0,
    },
    noMargin:{
        marginBottom:0,
    },
    noBg:{
        borderBottomColor:'transparent',
        borderBottomWidth:0,
    },
    flatButton:{
        color: config.buttonColor,
        fontSize:config.fsSmall,
        fontFamily:config.fontPrimary,
        borderWidth:1,
        borderRadius:2,
        borderColor:config.Chenin,
        width:'100%',
        paddingVertical:10,
        paddingBottom: Platform.OS==='ios'?10:20
    },
    flatText:{
        borderBottomWidth:0,
        marginBottom:0,
        marginTop:20,
        alignItems:'center',
        justifyContent: 'center',
    },
    loader: {
        backgroundColor:'transparent'
    }
});