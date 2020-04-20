
import { MEMBER_SCHEME_BY_ID } from '../actions/types';

export default (state = {}, action = {}) => {
	switch (action.type) {
		case MEMBER_SCHEME_BY_ID:
			return action.memberSchemebyIdData
		default:
			return state;
	}
};
