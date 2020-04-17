import React, { Component } from 'react';
import { View,Platform} from 'react-native';
import { Picker } from 'native-base';
import {isEmpty} from 'lodash';
import PropTypes from 'prop-types';
import TextInput from '../TextBox'

class PickerDrop extends Component{
	onValueChange(label){
		 if(Platform.OS === 'android') {
            if(label!== '0') {
                this.props.onValueChange(label);
            }
        } else if(label!== 'key0') {
	            this.props.onValueChange(label);
	        }
	}

	render(){
		const { name, label, value, data, error, errorLabel } = this.props;
		return(
				<View>
					{ Platform.OS === 'android' ? <View>
					<TextInput 
						name={name}
						value={value}
						label= {label}
						error = {error}
						pickerImage
					/>
				  	<Picker
		              mode='dialog'
		              placeholder='Select country'
		              style={{backgroundColor:'transparent',color:'transparent',width:'100%',height:30,marginTop:isEmpty(error) ? -65 : -80}}
		              onValueChange={this.onValueChange.bind(this)}>
		              <Picker.Item key='unselectable' label={errorLabel} value='0' color='gray' />
		              { data.map((el,index) =>(<Picker.Item key={index} label={el} value={el} />))}
		            </Picker>
		            </View>
		            : 
		            <View>
		            <TextInput 
						name={name}
						value={value}
						label= {label}
						error = {error}
						pickerImage
					/>
				  	<Picker
		              mode='dialog'
		              style={{backgroundColor:'transparent',color:'transparent',width:'100%',height:30,marginTop:isEmpty(error) ? -65 : -80}}
		              onValueChange={this.onValueChange.bind(this)}>
		              <Picker.Item key='unselectable' label={errorLabel} value='key0' color='gray'/>
		              { data.map((el,index) =>(
		              	<Picker.Item key={index} label={el} value={el} />))}
		            </Picker>
		        </View>}
		        </View>
		);
	}
}
PickerDrop.propTypes = {
  name:PropTypes.string,
  value:PropTypes.string,
  label:PropTypes.string,
  data:PropTypes.array,
  onValueChange:PropTypes.func,
  error:PropTypes.string,
  selectedValue:PropTypes.string,
  errorLabel:PropTypes.string
};

export default PickerDrop;