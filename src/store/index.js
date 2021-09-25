import {createStore} from 'redux';
import rootReducers from '../reducers';

const INIT_STATE = {};

const configureStore = (initialState = INIT_STATE) => {
	const store = createStore(
		rootReducers,
		initialState,
	);
	return store;
};

export default configureStore;