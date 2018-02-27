import { assoc, compose } from 'ramda'

const initialState = {
	status: 'NONE',
	data: {},
}

const fetchReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_START': {
			return assoc('status', 'STARTED', state);
		}

		case 'FETCH_SUCCESS': {
			console.log(action.payload)
			return compose(
				assoc('status', 'SUCCESS'),
				assoc('data', action.payload.data),
			)(state)
		}

		case 'FETCH_FAILED': {
			return assoc('status', 'FAILED', state);
		}

		default: {
			return state;
		}
	}
}

export default fetchReducer;
