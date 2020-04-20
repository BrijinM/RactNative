import {  TRANSACTION_REQUEST } from './../../src/actions/types';

export default (state = {}, action = {}) => {
	switch(action.type) {
		case TRANSACTION_REQUEST:
			return action.transactionDetails
		default: 
			return state;
	}
};