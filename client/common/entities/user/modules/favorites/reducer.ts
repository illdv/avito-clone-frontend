import { createReducer, createAction } from 'redux-act';

import { FavoritesActions } from './actions';

const initialState = (): IUserFavorites => ({
	ids: [],
	items: [],
});

const reducer = createReducer({}, initialState());

reducer.on(FavoritesActions.setFavorite.SUCCESS, (state, payload): IUserFavorites => ({
	...state,
	ids: payload.favoritesIds || [], // TODO refactor
}));

reducer.on(FavoritesActions.removeFavorite.SUCCESS, (state, payload): IUserFavorites => ({
	...state,
	ids: payload.favoritesIds || [], // TODO refactor

}));

reducer.on(FavoritesActions.getFavoritesAds.SUCCESS, (state, payload): IUserFavorites => ({
	...state,
	items: payload.favoritesAds,
}));

reducer.on(FavoritesActions.removeFavoritesAds.SUCCESS, (state, payload): IUserFavorites => {
	const items = { ...state.items };

	payload.favoritesIds.forEach(id => delete items[id]);

	return { ...state, items };
});

export default reducer;
