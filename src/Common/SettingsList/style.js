import { StyleSheet} from 'react-native';
import {config} from '../../../theme/config';

export const styles = StyleSheet.create({
   container:{
    flexDirection:'row',
    alignItems:'center',
    borderBottomColor:config.setingBorder,
    borderBottomWidth:1,
    paddingBottom:20,
    position:'relative',
   },
   switch:{
   	transform: [{ scaleX: .8 }, { scaleY: .7 }],
  },
  switchPosition:{
    position: 'absolute',
    right:10,
    top: -5, 
    width: 50, 
    height: 50, 
    justifyContent:'center'
  }
  
});