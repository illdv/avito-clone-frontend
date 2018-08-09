import reducer from './reducer';
import { notificationActions } from './actions';

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
		const action = notificationActions.setNoReadCount.REQUEST( 5 );
		expect(reducer(initialState, action))
			.toEqual({...initialState, noReadCount: 5});
	});
});