import React, { Component } from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './style';

class SchemeList extends Component {
	render() {
		const {product, months, plan} = this.props
		return (
			<View style={styles.whiteBg}>
				<View style={styles.align}>
					<View style={{flex: 1, flexWrap: 'wrap'}}>
						<Text style={[styles.grayText, {color: 'rgba(46,46,46,0.41)'}]}>SCHEME NAME</Text>
						<Text style={styles.boldText}>{product}</Text>
					</View>
					<View>
						<Text style={[styles.grayText, {textAlign:'right', color: 'rgba(46,46,46,0.41)'} ]}>TENURE PERIOD</Text>
						<Text style={styles.boldText}>{months} months</Text>
					</View>
				</View>
				<View style={styles.border}>
					<Text style={styles.planSection}>Plan starts from
						<Text style={styles.currency}> &#x20B9; {plan} / Month</Text>
					</Text>
				</View>
			</View>
		);
	}
}

SchemeList.propTypes = {
    product: PropTypes.string,
    months: PropTypes.number,
    plan: PropTypes.number,
};

export default SchemeList;