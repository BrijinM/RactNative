import {  PAYMENT_STATUS } from './../../src/actions/types';

export default (state = {}, action = {}) => {
	switch(action.type) {
		case PAYMENT_STATUS:
			return action.paymentStatusDetails
		default: 
			return state;
	}
};