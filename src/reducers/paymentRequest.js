import {  PAYMENT_REQUEST } from './../../src/actions/types';

export default (state = {}, action = {}) => {
	switch(action.type) {
		case PAYMENT_REQUEST:
			return action.paymentRequest
		default: 
			return state;
	}
};