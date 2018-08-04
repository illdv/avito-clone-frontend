import reducer from './reducer';
import { createAction, types } from 'redux-act';

const initialState = {
	ids: [],
	items: [],
};

describe('User reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, undefined))
			.toEqual(initialState);
	});

	it.skip('should set new favorite Ad', () => {
		types.remove('USER__SET_FAVORITE_SUCCESS');
		const action        = createAction('USER__SET_FAVORITE_SUCCESS', data => data);
		const value         = reducer(initialState, action({ favoritesIds: ['1'] }));
		const expectedState = {
			user: {
				id: null,
				name: null,
				email: null,
				phone: null,
				created_at: null,
				updated_at: null,
				token: null,
				favorites_ids: ['1'],
				image: null,
			},
			isUserLoading: false,
			favoritesAds: null,
		};
		expect(value).toEqual(expectedState);
	});

});
