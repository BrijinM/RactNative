import { StyleSheet } from 'react-native';
import { config } from '../../../../theme/config';

export const styles = StyleSheet.create({
	container:{
        flex:1,
        justifyContent:'center',
        position:'relative',
    },
    paragraph:{
    	fontSize:config.fsMedium+1,
    	lineHeight:22,
    	textAlign:'center',
        paddingTop:40
    },
    bold:{
        fontFamily:config.fontPrimary,
        lineHeight: 22,
        fontSize:config.fsMedium+1,
        color:config.colorBlack,
    },
});