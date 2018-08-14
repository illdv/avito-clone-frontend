import sagaHelper from 'redux-saga-testing';
import { selectFavorite } from './saga';
import { UserActions } from 'client/common/entities/user/rootActions';

describe('Favorites Ads Saga', () => {
	const action = UserActions.favorites.selectFavorite.REQUEST({ id: 1 });
	const it = sagaHelper(selectFavorite(action));

	it('should return the initial state', () => {
		// expect(reducer(undefined, undefined))
		// 	.toEqual();
	});

	it('should set new favorite Ad', () => {
		// expect(value).toEqual(expectedState);
	});
});