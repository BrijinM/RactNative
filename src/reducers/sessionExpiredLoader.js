import { AUTH_EXPIRED } from '../actions/types';

export default (state = {}, action = {}) => {
    switch (action.type) {
	    case AUTH_EXPIRED:
	        return action.showLoader
	    default:
	        return state;
    }
};
