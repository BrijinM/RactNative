import {  VERIFY_OTP } from './../../src/actions/types';

export default (state = {}, action = {}) => {
	switch(action.type) {
		case VERIFY_OTP:
			return action.otpDetails
		default: 
			return state;
	}
};