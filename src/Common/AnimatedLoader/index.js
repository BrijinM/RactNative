import React, { Component } from 'react';
import { View, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';
import {styles} from './style';

class Loader extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      progress: new Animated.Value(0),
	    };
	  }
	componentDidMount() {
         Animated.timing(this.state.progress, {
	      toValue: 1,
	      duration: 5000,
	      easing: Easing.linear,
	    }).start();
    }
  render() {
  	const {style} = this.props;            
    return (
    	<View style={[styles.container,style]}>
		    <LottieView
		        ref={(animation) => this.animation = animation}
		        style={{width: 80, height: 80}}
		        source={require('../../../assets/video/data.json')}
		        autoPlay
		        loop
		    />
		</View>
    );
  }
}

Loader.propTypes = {
	style:PropTypes.any
}

export default Loader;