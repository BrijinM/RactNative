import { CHANGE_PASSWORD } from '../actions/types';

export default (state = {}, action = {}) => {
    switch (action.type) {
	    case CHANGE_PASSWORD:
	        return action.changepassword
	    default:
	        return state;
    }
};