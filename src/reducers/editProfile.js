import { UPDATE_PROFILE } from '../actions/types';

export default (state = {}, action = {}) => {
    switch (action.type) {
	    case UPDATE_PROFILE:
	        return action.userProfileData
	    default:
	        return state;
    }
};