import { createReducer, createAction } from 'redux-act';

import { favoritesActions } from './actions';

const initialState = (): IUserFavorites => ({
	ids: [],
	items: [],
});

const reducer = createReducer({}, initialState());

reducer.on(favoritesActions.setFavorite.SUCCESS, (state, payload): IUserFavorites => ({
	...state,
	ids: payload.favoritesIds || [], // TODO refactor
}));

reducer.on(favoritesActions.removeFavorite.SUCCESS, (state, payload): IUserFavorites => ({
	...state,
	ids: payload.favoritesIds || [], // TODO refactor

}));

reducer.on(favoritesActions.getFavoritesAds.SUCCESS, (state, payload): IUserFavorites => ({
	...state,
	items: payload.favoritesAds,
}));

reducer.on(favoritesActions.removeFavoritesAds.SUCCESS, (state, payload): IUserFavorites => {
	const items = { ...state.items };

	payload.favoritesIds.forEach(id => delete items[id]);

	return { ...state, items };
});

export default reducer;
