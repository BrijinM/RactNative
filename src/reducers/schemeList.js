import { SCHEME_LIST } from '../actions/types';

export default (state = {}, action = {}) => {
    switch (action.type) {
	    case SCHEME_LIST:
	        return action.schemeList
	    default:
	        return state;
    }
};