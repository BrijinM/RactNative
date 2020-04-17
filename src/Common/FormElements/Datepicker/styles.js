import { StyleSheet } from 'react-native';
import {config} from '../../../../theme/config';

export const styles = StyleSheet.create({
      dateInput:{
      	borderColor:'transparent',
      },
      dateIcon:{
      	width:10,
      	height:10,
      },
      datePicker:{
            position: 'absolute',
            width: '100%',
      },
      tranLabel:{
            position:'absolute',
            backgroundColor:'transparent',
            color:config.grayColor,
            fontFamily: config.fontPrimary,
            lineHeight:config.fsRegular,
      }
});