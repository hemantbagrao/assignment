import { DEPOSIT, WITHDRAW } from '../actions/action_types';


const transaction = (state, action) => {
	switch(action.type) {
		case DEPOSIT:
			return {
				currency: action.currency,
				quantity: action.quantity,
                text: action.text
			};
		default:
			return state;
	};
};

const transactions = (state=[], action) => {
	switch(action.type) {
		
		case DEPOSIT:
			return [
				...state,
                transaction(undefined,action)
			];
        case WITHDRAW:
		default:
			return state;
	};
};

export default transactions;