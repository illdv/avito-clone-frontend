import { createReducer } from 'redux-act';
import { UserActions } from './actions';
import { IFavoritesAds } from 'client/common/ads/interface';

export interface IUserState {
	user: IUser;
	isUserLoading: boolean;
	favoritesAds: IFavoritesAds;
}

const initialState = (): IUserState => ({
	user: {
		id: null,
		name: null,
		email: null,
		phone: null,
		created_at: null,
		updated_at: null,
		token: null,
		favorites_ids: [],
		image: null,
	},
	isUserLoading: false,
	favoritesAds: null,
});

const reducer = createReducer({}, initialState());

reducer.on(UserActions.login.SUCCESS, (state, payload): IUserState => ({
	...state,
	user: payload.user,
}));

reducer.on(UserActions.getProfile.REQUEST, (state, payload): IUserState => ({
	...state,
	isUserLoading: true,
}));

reducer.on(UserActions.getProfile.SUCCESS, (state, payload): IUserState => ({
	...state,
	user: payload,
	isUserLoading: false,
}));

reducer.on(UserActions.getProfile.FAILURE, (state, payload): IUserState => ({
	...state,
	isUserLoading: false,
}));

reducer.on(UserActions.setFavorite.SUCCESS, (state, payload): IUserState => ({
	...state,
	user: {
		...state.user,
		favorites_ids: payload.favoritesIds
	},
}));
reducer.on(UserActions.removeFavorite.SUCCESS, (state, payload): IUserState => ({
		...state,
		user: {
			...state.user,
			favorites_ids: payload.favoritesIds
		},
	})
);


reducer.on(UserActions.changeProfile.SUCCESS, (state, payload): IUserState => ({
	...state,
	user: {
		...state.user,
		name: payload.name,
		email: payload.email,
		phone: payload.phone,
		image: payload.image,
	},
}));

reducer.on(UserActions.getFavoritesAds.SUCCESS, (state, payload): IUserState => ({
	...state,
	favoritesAds: { ...payload.favoritesAds },
}));

reducer.on(UserActions.removeFavoritesAds.SUCCESS, (state, payload): IUserState => {
	debugger;
	const favorites = { ...state.favoritesAds };

	payload.favoritesIds.forEach(id => delete favorites[id]);

	return ({
		...state,
		favoritesAds: favorites,
	});

});
export default reducer;
