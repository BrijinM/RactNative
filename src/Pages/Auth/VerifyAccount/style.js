import { StyleSheet } from 'react-native';
import { config } from '../../../../theme/config';

export const styles = StyleSheet.create({
	container:{
        flex:1,
        position:'relative',
    },
    paragraph:{
        paddingBottom:'26.7%',
        paddingTop:'10.9%',
        fontSize:config.fsMedium+1,
        lineHeight:22,
        textAlign:'center'
    },
    verify:{
        height:110,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:122,
    },
    align:{
        marginHorizontal:40,
    },
    bold:{
        fontFamily:config.fontPrimary,
        lineHeight: 22,
        fontSize:config.fsMedium+1,
        color:config.colorBlack
    },
    error:{
        color:'red', 
        fontSize:config.fsSmall,
        paddingTop: 5,
    }
});