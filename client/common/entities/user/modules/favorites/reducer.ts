import { createReducer, createAction } from 'redux-act';

import { favoritesActions } from './actions';

const initialState = (): IFavoritesState => ({
	ids: [],
	items: [],
});

const reducer = createReducer({}, initialState());

reducer.on(favoritesActions.setFavorite.SUCCESS, (state, payload): IFavoritesState => ({
	...state,
	ids: payload.favoritesIds || [], // TODO refactor
}));

reducer.on(favoritesActions.removeFavorite.SUCCESS, (state, payload): IFavoritesState => ({
	...state,
	ids: payload.favoritesIds || [], // TODO refactor

}));

reducer.on(favoritesActions.getFavoritesAds.SUCCESS, (state, payload): IFavoritesState => ({
	...state,
	items: payload.favoritesAds,
}));

reducer.on(favoritesActions.removeFavoritesAds.SUCCESS, (state, payload): IFavoritesState => {
	const items = { ...state.items };

	payload.favoritesIds.forEach(id => delete items[id]);

	return { ...state, items };
});

export default reducer;
