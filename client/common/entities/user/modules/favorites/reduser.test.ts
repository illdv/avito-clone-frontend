import reducer from './reducer';
import {favoritesActions} from './actions';

const initialState = {
	ids: [],
	items: [],
};

describe('Favorits reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, undefined))
			.toEqual(initialState);
	});

	it('should set new favorite Ad', () => {
		const action = favoritesActions.setFavorite.SUCCESS({ favoritesIds: [1, 2, 3] });
		expect(reducer(initialState, action))
			.toEqual({...initialState, ids: [1, 2, 3]});
	});
});
