import { INTERNET_ERROR } from '../actions/types';

export default (state = {}, action = {}) => {
    switch (action.type) {
	    case INTERNET_ERROR:
	        return action.networkStatus
	    default:
	        return state;
    }
};