import { createReducer, createAction } from 'redux-act';

import { UserActions } from './actions';
import { IFavoritesAds } from 'client/common/ads/interface';

export interface IUserState {
	user: IUser;
	isUserLoading: boolean;
	favoritesAds: IFavoritesAds;
}

const initialState = (): IUser => ({
	favorites: {
		ids: [],
		items: [],
	},
	ownedAds: [],
	profile: null,
	token: null,
	isLoading: false,
});

const reducer = createReducer({}, initialState());

reducer.on(UserActions.setToken, (state, payload): IUser => ({
	...state,
	token: payload,
}));

reducer.on(UserActions.login.SUCCESS, (state, payload) => ({
	...state,
	profile: payload.user,
}));

reducer.on(UserActions.getProfile.REQUEST, (state, payload): IUser => ({
	...state,
	isLoading: true,
}));

reducer.on(
	UserActions.getProfile.SUCCESS,
	(state: IUser, { favorites_ids, ...profileInfo }: IGetProfileResponse): IUser => ({
		...state,
		profile: profileInfo,
		favorites: {
			ids: favorites_ids,
			items: [],
		},
		isLoading: false,
	}),
);

reducer.on(UserActions.getProfile.FAILURE, (state, payload): IUser => ({
	...state,
	isLoading: false,
}));

reducer.on(UserActions.setFavorite.SUCCESS, (state, payload): IUser => ({
	...state,
	favorites: {
		...state.favorites,
		ids: payload.favoritesIds || [], // TODO refactor
	},
}));

reducer.on(UserActions.removeFavorite.SUCCESS, (state, payload): IUser => ({
	...state,
	favorites: {
		...state.favorites,
		ids: payload.favoritesIds || [], // TODO refactor
	},
}));

reducer.on(UserActions.changeProfile.SUCCESS, (state, { favorites_ids, ...profileInfo }): IUser => ({
	...state,
	profile: profileInfo,
}));

reducer.on(UserActions.getFavoritesAds.SUCCESS, (state, payload): IUser => ({
	...state,
	favorites: {
		...state.favorites,
		items: payload.favoritesAds,
	},
}));

reducer.on(UserActions.removeFavoritesAds.SUCCESS, (state, payload): IUser => {
	const items = { ...state.favorites.items };

	payload.favoritesIds.forEach(id => delete items[id]);

	return ({
		...state,
		favorites: {
			...state.favorites,
			items,
		},
	});
});

export default reducer;
