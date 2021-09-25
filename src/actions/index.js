import { DEPOSIT, WITHDRAW } from './action_types';

const depositAmount = (currency,quantity) => {
	return {
		type: DEPOSIT,
		currency: currency,
		quantity:quantity,
		text: 'Deposit'
	};
};


const withdrawAmount = (amount) => {
	return {
		type: WITHDRAW,
		amount: amount,
		text: 'Withdraw'
	};
};

export { depositAmount, withdrawAmount };