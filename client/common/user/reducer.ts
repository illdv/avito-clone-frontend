import { createReducer } from 'redux-act';
import { UserActions } from './actions';

export interface IUserState {
	user: IUser;
	isUserLoading: boolean;
}

const initialState = (): IUserState => ({
	user: null,
	isUserLoading: false,
});

const reducer = createReducer({}, initialState());

reducer.on(UserActions.login.SUCCESS, (state, payload): IUserState => ({
	...state,
	user: payload,
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

export default reducer;
