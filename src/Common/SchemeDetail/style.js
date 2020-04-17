import { StyleSheet, Platform } from 'react-native';
import { config } from '../../../theme/config';

export const styles = StyleSheet.create({
    whiteBg:{
        backgroundColor:config.colorWhite,
        marginHorizontal:13,
        marginVertical:10,
        paddingHorizontal:20,
        paddingTop:20,
        paddingBottom:10,
        borderRadius:3,
    },
    align:{
        flexDirection: 'row',
        justifyContent:'space-between',
        flex:1,
        paddingBottom:10,
    },
    grayText:{
        fontSize:10,
        fontFamily:config.latoBold,
        color: 'rgba(46,46,46,0.41)',
    },
    boldText:{
        fontFamily:config.fontPrimary,
        fontSize:config.fsRegular+1,
        fontWeight: Platform.OS === 'ios'?'600':'900',
        color: config.shadow
    }
});