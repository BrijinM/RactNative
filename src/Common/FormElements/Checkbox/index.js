import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import {config} from '../../../../theme/config';

const styles = StyleSheet.create({
    radioRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft:4,
        marginBottom:20,
    },
    radioOuter: {
        borderColor: config.linkColor, 
        borderWidth: 2,
        borderRadius: 50,
        marginRight:7,
        width: 22,
        height: 22,
    },
    radioInner: {
        backgroundColor: config.linkColor,
        margin: 3,
        width: 12,
        borderRadius: 50,
        height: 12,
    },
    radioInnerInactive: {
        backgroundColor: config.colorWhite,
    },
})

class RadioButton extends Component {
    constructor() {
        super();
        this.state = { 
            checked: '',
        };
        this.checkHandler = this.checkHandler.bind(this);
    }
    componentWillReceiveProps(nextProps) {
      if(nextProps.checkedIndex !== this.props.checkedIndex) {
        this.setState({
            checked:nextProps.checkedIndex
        });
      } 
    }
    componentWillMount() {
      this.setState({
        checked:this.props.checkedIndex
      });
      if(this.props.checkedOpt !== undefined) {
        this.props.checkedOpt(this.props.checkedIndex);
      }
    }
    checkHandler(key) {
      this.setState({
        checked:key
      });
      if(this.props.checkedOpt !== undefined) {
        this.props.checkedOpt(key);
      }
    }
    render () {
        const { dataArray } = this.props;
        return (
          <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
            {dataArray.map((data, key)=>(
              <View key={key}>
                  {this.state.checked === key ?
                  <TouchableOpacity style={styles.radioRow}>
                      <View style={styles.radioOuter}>
                          <View style={styles.radioInner} />
                      </View>
                      <Text>{data}</Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity style={styles.radioRow} onPress={this.checkHandler.bind(this, key)}>
                      <View style={styles.radioOuter}>
                          <View style={styles.radioInnerInactive} />
                      </View>
                      <Text>{data}</Text>
                  </TouchableOpacity>}
              </View>
            ))}
          </View>
        )
    }
}

RadioButton.propTypes = {
    dataArray: PropTypes.array,
    checkedIndex: PropTypes.any,
    checkedOpt: PropTypes.func
}

export default RadioButton;
