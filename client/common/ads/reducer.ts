import { createReducer } from 'redux-act';
import { AdsActions } from './actions';
import { IAds } from 'client/common/ads/interface';

export enum PageName {
	Profile = 'Profile',
	Create  = 'Create',
	Confirm = 'Confirm',
}

export interface IAdsState {
	ads: IAds[];
	isLoading: boolean;
	currentPage: PageName;
}

const initialState = (): IAdsState => ({
	ads: null,
	isLoading: true,
	currentPage: PageName.Profile,
});

const reducer = createReducer({}, initialState());

reducer.on(AdsActions.getMy.REQUEST, (state, payload): IAdsState => ({
	...state,
	isLoading: true,
}));

reducer.on(AdsActions.getMy.SUCCESS, (state, payload): IAdsState => ({
	...state,
	ads: payload,
	isLoading: false,
}));

reducer.on(AdsActions.getMy.FAILURE, (state, payload): IAdsState => ({
	...state,
	isLoading: false,
}));

reducer.on(AdsActions.changePage.REQUEST, (state, payload): IAdsState => ({
	...state,
	currentPage: payload,
}));

export default reducer;
