import reducer from './reducer';
import { notificationActions } from './actions';

const token = 1;
const initialState = {
	items: [],
	noReadCount: 0,
};

describe('SET_NO_READ_COUNT', () => {
	it('initial state', () => {
		expect(reducer(undefined, undefined))
			.toEqual(initialState);
	});

	it('REQUEST', () => {
		const action = notificationActions.setNoReadCount.REQUEST( token );
		expect(reducer(initialState, action))
			.toEqual({...initialState, noReadCount: token});
	});
});