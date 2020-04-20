import { GLOBAL_ERROR } from '../actions/types';

export default (state = {}, action = {}) => {
    switch (action.type) {
	    case GLOBAL_ERROR:
	        return action.errorStatus
	    default:
	        return state;
    }
};