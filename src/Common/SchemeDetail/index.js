import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import Button from '../../Common/FormElements/Button';
import { styles } from './style';
import {config} from '../../../theme/config';

class SchemeDetail extends Component {
	render() {
		const { onPress, schemeData, planData} = this.props
		return (
			<View style={styles.whiteBg}>
				<View style={[styles.align, {marginBottom:13}]}>
					<View>
						<Text style={styles.grayText}>{'Scheme plan'.toUpperCase()}</Text>
						<Text style={styles.boldText}>{planData.installmentAmout} / Month</Text>
					</View>
					<View>
						<Text style={styles.grayText}>{'Worth'.toUpperCase()}</Text>
						<Text style={styles.boldText}> &#x20B9;{planData.toBePaid+planData.bonousAmount}</Text>
					</View>
					<View>
						<Text style={styles.grayText}>{'tenure period'.toUpperCase()}</Text>
						<Text style={styles.boldText}>{planData.noOfInstallment}</Text>
					</View>
				</View>
				<View style={styles.align}>
					<View>
						<Text style={styles.grayText}>{'benefits'.toUpperCase()}</Text>
					    <View style={{width:150}}>
					     	{((planData.bonousAmount!==0) || (planData.discountAmount!==0) || (schemeData.gift))?<View style={{flexDirection:'row'}}>
								{(planData.bonousAmount!==0)&&<Text style={styles.boldText}>&#x20B9;{planData.bonousAmount}</Text>}
								{(planData.discountAmount!==0)&&<Text style={styles.boldText}>+&#x20B9;{planData.discountAmount}</Text>}
								{schemeData.gift && <Text style={styles.boldText}>+Gift</Text>}
							</View>:<Text style={[styles.boldText]}>No wastage on ornaments scheme</Text>}
						</View>
					</View> 
					<Button smallButton onPress={onPress} uppercase bgColor={config.linkColor} label='JOIN' secondary noMargin shadow/>
				</View>
				
			</View>
		);
	}
}

SchemeDetail.propTypes = {
    onPress:PropTypes.func,
    schemeData: PropTypes.object,
    planData: PropTypes.any
};

export default SchemeDetail;