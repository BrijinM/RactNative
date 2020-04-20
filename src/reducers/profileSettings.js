
import { PROFILE_SETTINGS } from '../actions/types';

export default (state = {}, action = {}) => {
    switch (action.type) {
	    case PROFILE_SETTINGS:
	        return action.profileDetails
	    default:
	        return state;
    }
};