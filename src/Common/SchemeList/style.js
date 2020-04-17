import { StyleSheet } from 'react-native';
import { config } from '../../../theme/config';

export const styles = StyleSheet.create({
    whiteBg:{
        backgroundColor:config.colorWhite,
        marginHorizontal:13,
        marginVertical:5,
        paddingHorizontal:10,
        paddingVertical:10,
        borderRadius:4
    },
    align:{
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingBottom:10,
        paddingTop: 5
    },
    grayText:{
        fontSize:config.fsSmall,
        fontFamily:config.latoBold,
        color:config.grayColor,
        paddingBottom:6,
    },
    boldText:{
        flex: 1, 
        fontFamily:config.latoBold,
        fontSize:config.fsXLarge+1,
        color: config.shadow
    },
    planSection:{
        textAlign:'center',
        paddingTop:8,
        fontFamily:config.latoRugular,
        fontSize:config.fsRegular,
        color:config.shadow,
        borderTopWidth: 1,
        borderTopColor: 'transparent',
    },
    currency:{
        fontFamily:config.fontPrimary,
        fontSize:config.fsRegular,
        color:config.shadow
    },
    border:{
        borderTopWidth: 1,
        borderTopColor: config.whiteSmoke,
        backgroundColor: 'transparent',
      }
});