import { NOTIFICATION_TRIGGER } from '../actions/types';

export default (state = {}, action = {}) => {
    switch (action.type) {
	    case NOTIFICATION_TRIGGER:
	        return action.getnotification
	    default:
	        return state;
    }
};