import {  TRANSACTION_HISTORY } from './../../src/actions/types';

export default (state = {}, action = {}) => {
	switch(action.type) {
		case TRANSACTION_HISTORY:
			return action.transactionHistory
		default: 
			return state;
	}
};