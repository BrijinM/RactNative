
import { JOIN_SCHEME } from '../actions/types';

export default (state = {}, action = {}) => {
	switch (action.type) {
		case JOIN_SCHEME:
			return action.joinSchemeData
		default:
			return state;
	}
};
