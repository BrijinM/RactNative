import { STATE_LIST } from '../actions/types';

export default (state = {}, action = {}) => {
    switch (action.type) {
	    case STATE_LIST:
	        return action.stateList
	    default:
	        return state;
    }
};
