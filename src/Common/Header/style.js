import { StyleSheet } from 'react-native';
import {config} from '../../../theme/config';

export const styles = StyleSheet.create({
   headerStyle:{
        backgroundColor: config.OliveHeader,
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center',
        width:'100%',
        height:50,
        padding: 17,
        position:'relative',
        top: 0,
        zIndex: 9
    },
    heading:{
        fontFamily:config.latoRugular,
        fontSize: config.fsXLarge,
        letterSpacing:0.6,
        color:config.colorWhite,
    },
    leftArrow:{
        height:17,
        width:17
    },
    stretch:{
        position:'absolute',
        left:0,
    },
    icon:{
        height:50,
        width:50,
        justifyContent:'center',
        alignItems:'center',
    },
});