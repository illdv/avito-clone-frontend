import { createReducer, createAction } from 'redux-act';

import { CommonActions } from './actions';
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

reducer.on(CommonActions.login.SUCCESS, (state, payload) => ({
	...state,
	profile: payload.user,
}));

export default reducer;
