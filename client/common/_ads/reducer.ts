import { createReducer } from 'redux-act';
import { AdsActions } from './actions';
import { IAds } from 'client/common/ads/interface';

export enum PageName {
	Profile = 'Profile',
	Create  = 'Create',
	Confirm = 'Confirm',
	Edit    = 'Edit',
}

export interface IAdsState {
	ads: IAds[];
	isLoading: boolean;
	currentPage: PageName;
	selectedId: string;
}

const initialState = (): IAdsState => ({
	ads: [],
	isLoading: true,
	selectedId: null,
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

reducer.on(AdsActions.selectForEdit.REQUEST, (state, payload): IAdsState => ({
	...state,
	selectedId: payload.id,
	currentPage: PageName.Edit,
}));

reducer.on(AdsActions.selectForEdit.SUCCESS, (state, payload): IAdsState => ({
	...state,
	selectedId: null,
}));

export default reducer;
