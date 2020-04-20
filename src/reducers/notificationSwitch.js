import { NOTIFICATION_ONOFF } from '../actions/types';

export default (state = {}, action = {}) => {
    switch (action.type) {
	    case NOTIFICATION_ONOFF:
	        return action.notificationswitchstatus
	    default:
	        return state;
    }
};