import { createReducer } from 'redux-act';
import { UserActions } from './actions';
import { IAds } from 'client/common/ads/interface';

export interface IUserState {
	user: IUser;
	isUserLoading: boolean;
	favoritesAds: IAds[];
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
	},
	isUserLoading: false,
	favoritesAds: [],
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
		favorites_ids: [
			...state.user.favorites_ids,
			payload.id,
		]
	},
	isUserLoading: false,
}));
reducer.on(UserActions.removeFavorite.SUCCESS, (state, payload): IUserState => ({
		...state,
		user: {
			...state.user,
			favorites_ids: [
				...state.user.favorites_ids.slice(0, payload.indexInFavorites),
				...state.user.favorites_ids.slice(payload.indexInFavorites + 1),
			]
		},
		isUserLoading: false,
	})
);
reducer.on(UserActions.getFavorites.SUCCESS, (state, payload): IUserState => ({
		...state,
		favoritesAds: [...payload.favoritesAds],
		isUserLoading: false,
	})
);
export default reducer;
