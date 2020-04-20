import { RESENT_OTP } from './../../src/actions/types';


export default (state = {}, action = {}) => {
	switch(action.type) {
		case RESENT_OTP:
			return action.resentOtpDetails
		default: 
			return state;
	}

};