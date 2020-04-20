import { USER_SCHEMES } from '../actions/types';

export default (state = {}, action = {}) => {
    switch (action.type) {
	    case USER_SCHEMES:
	        return action.userSchemeList
	    default:
	        return state;
    }
};
