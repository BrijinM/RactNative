import { StyleSheet } from 'react-native';
import { config } from '../../../../theme/config';

export const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
    },
    reset:{
        width:'100%',
        flex:1,
        marginTop:50,
        paddingHorizontal:20,
    },
    paragraph:{
        paddingBottom:62,
        fontSize:config.fsMedium+1,
        lineHeight:22,
        textAlign:'center'
    },
    bold:{
        fontFamily:config.fontPrimary,
        lineHeight: 22,
        fontSize:config.fsMedium+1,
        color:config.colorBlack
    },
    button:{
        marginBottom:55,
    }
});