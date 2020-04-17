import React, { Component } from 'react';
import {View, Animated} from 'react-native';
import DatePicker from 'react-native-datepicker';
import PropTypes from 'prop-types';
import TextInput from '../TextBox';
import { styles } from './styles';

const today = new Date();
const currentDate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

class Datepickernew extends Component{
	constructor(props) {
	    super(props);
	    this.state = {
	      fadeAnim: new Animated.Value(0),
	      labelFontSize: new Animated.Value(12),
	      main:'',
	      value:'',
	      currentDate,
	    };
	    this._focusCall = this._focusCall.bind(this);
	    this.handleChange = this.handleChange.bind(this);
	    this.setdata=this.setdata.bind(this);
	}
	componentWillReceiveProps(nextProps){
	    if(nextProps.value !== this.props.value) {
	       if(nextProps.value !== '') {
	        this._focusCall();
	      }
	    }
	}
	setdata(){
		this.setState({
			currentDate,
		});
	}
	_focusCall() {
		const { fadeAnim, labelFontSize } = this.state;
		Animated.sequence([
			Animated.parallel([
				Animated.spring(fadeAnim, { toValue: -16 }),
				Animated.spring(labelFontSize, { toValue: 11 }),
			]),
		]).start();
	}
    handleChange(date) {
	    this.props.onChange(date, this.props.id);
	    this._focusCall();
  	}
	render(){
		const { onChange, name, label, value, confirmBtnText,cancelBtnText, error } = this.props;
		return(
			<View style={styles.picker}>
				<TextInput 
					name={name}
			        error={error}
			        label={label}
			        value={value}
			        onChange={onChange}
			        pickerImage
			    />
				<DatePicker
			        style={styles.datePicker}
			        date={value ||currentDate }
			        onPressDate={this.setdata}
			        mode='date'
			        format='DD-MM-YYYY'
			        maxDate={currentDate}
			        onDateChange={this.handleChange}
			        confirmBtnText={confirmBtnText}
			        cancelBtnText={cancelBtnText}
			        customStyles={{
			          dateIcon: {
			           opacity:0,
			          },
			          dateInput: {
			            opacity:0
			          },
			          datePickerCon:{
			          	marginVertical:'45%',
      					marginHorizontal:20,
			          }
			        }}
			    />
			</View>
		)
	}
}
Datepickernew.propTypes={
	confirmBtnText:PropTypes.string,
	cancelBtnText:PropTypes.string,
	onChange:PropTypes.any,
	value: PropTypes.any,
	name: PropTypes.string,
	label: PropTypes.string,
	error: PropTypes.string,
	id:PropTypes.any
};
export default Datepickernew;