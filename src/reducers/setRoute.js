import { NAVIGATION_ROUTE } from '../actions/types';

export default (state = {}, action = {}) => {
    switch (action.type) {
	    case NAVIGATION_ROUTE:
	        return action.routeName;
	    default:
	        return state;
    }
};