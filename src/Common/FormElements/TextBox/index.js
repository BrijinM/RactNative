import React, { Component } from 'react';
import { View, TextInput, Text, Animated, Image, TouchableOpacity , Platform } from 'react-native';
import PropTypes from 'prop-types';
import {config} from '../../../../theme/config';
import { styles } from './style';


class FloatingLabelInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(6),
      labelFontSize: new Animated.Value(13)
    };
      this.handleFocus = this.handleFocus.bind(this);
      this.handleBlur = this.handleBlur.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.value !== this.props.value) {
       if(nextProps.value !== '') {
        this._focusCall();
      }
    }
  }
  _focusCall() {
      const { fadeAnim, labelFontSize } = this.state;
      Animated.sequence([
        Animated.parallel([
          Animated.spring(fadeAnim, { toValue: -5 }),
          Animated.spring(labelFontSize, { toValue: 11 }),
        ]),
      ]).start();
  }
  handleFocus(){
    this._focusCall();
    {this.props.onFocus && this.props.onFocus()}
  }
  handleBlur(){
    const { fadeAnim, labelFontSize } = this.state;
    const { value } = this.props;
    if(value === '') {
      Animated.sequence([
        Animated.parallel([
          Animated.spring(fadeAnim, { toValue: 13 }),
          Animated.spring(labelFontSize, { toValue: 13 }),
        ]),
      ]).start();
    }
  }
  render() {
    const { label, value, onChange, maxLength, pickerImage, name, error, secureTextEntry, keyboardType, returnType,lastchild,style, borderColor,onPress, editable, visibleIcon, onVisibleChange } = this.props;
    const { fadeAnim, labelFontSize } = this.state; 
    return (
      <View style={[styles.input, lastchild && styles.lastchild]}>
        <View>
          {label !== undefined && <Animated.Text 
            style={[styles.label, {top:fadeAnim, fontSize:labelFontSize}]}>{label.toUpperCase()}
          </Animated.Text>}
        </View>
        <View style={{position:'relative',}}>
          <TextInput
            underlineColorAndroid='transparent'
            value={value} 
            style={[styles.inputText, style, {borderColor}]}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyPress={this.onKeyPress}
            error={error}
            name={name}
            maxLength={maxLength}
            keyboardType ={keyboardType}
            returnKeyType={returnType}
            secureTextEntry={secureTextEntry}
            onChangeText={onChange}
            blurOnSubmit
            onPress={onPress}
            editable={editable}
          />
          {pickerImage && 
            <View style={{position:'absolute', right: 0, top: 12}}>
              <Image 
              source={require('../../../../assets/images/angledown.png')}
              style={{height: 15, width: 15 }} />
            </View>}
          {visibleIcon && 
            <TouchableOpacity style={{position: 'absolute', right: 0, top:7,}} onPress={onVisibleChange}>
            <Image source={secureTextEntry=== true ? require('../../../../assets/images/showIcon.png'):require('../../../../assets/images/hideIcon.png')} 
                    style={{height:Platform.OS==='ios'?15:17, width:Platform.OS==='ios'?28:30}}/>
            </TouchableOpacity>}
          {error && 
            <View style={{paddingTop:5, backgroundColor: 'transparent'}}>
              <Text style={{color:config.errorColor, fontSize:12}}>{error}</Text>
            </View>}
        </View>
      </View>
    );
  }
}

FloatingLabelInput.propTypes = {
  label: PropTypes.string,
  maxLength:PropTypes.number,
  value:PropTypes.string,
  onChange:PropTypes.func,
  error:PropTypes.string,
  pickerImage:PropTypes.any,
  name:PropTypes.string,
  secureTextEntry:PropTypes.bool,
  keyboardType:PropTypes.string,
  returnType: PropTypes.string,
  lastchild:PropTypes.bool,
  style: PropTypes.any,
  borderColor: PropTypes.any,
  onPress:PropTypes.any,
  onFocus:PropTypes.func,
  onChangeText:PropTypes.func,
  editable: PropTypes.bool,
  visibleIcon: PropTypes.bool,
  onVisibleChange: PropTypes.func
};

export default FloatingLabelInput;