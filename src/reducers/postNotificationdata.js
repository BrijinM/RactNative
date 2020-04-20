import { POST_NOTIFICATION } from '../actions/types';

export default ( state = {}, action ={}) => {
	switch(action.type) {
		case POST_NOTIFICATION :
			return action.postNotificatioinData
		default : 
			return state;
	}
};