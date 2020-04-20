import { SCHEME_PLANS } from '../actions/types';

export default (state = {}, action = {}) => {
    switch (action.type) {
	    case SCHEME_PLANS:
	        return action.schemePlans
	    default:
	        return state;
    }
};
