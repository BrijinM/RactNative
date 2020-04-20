import { GOLD_PRICE } from '../actions/types';

export default (state = {}, action = {}) => {
    switch (action.type) {
	    case GOLD_PRICE:
	        return action.priceDetails
	    default:
	        return state;
    }
};
