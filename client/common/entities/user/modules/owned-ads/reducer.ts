import { createReducer } from 'redux-act';
import { ownedAdsActions } from './actions';
import { IAds, PageNames } from './interfaces';

export interface IAdsState {
	ads: IAds[];
	isLoading: boolean;
	currentPage: PageNames;
	selectedId: string;
}

const initialState = (): IAdsState => ({
	ads: [],
	isLoading: true,
	selectedId: null,
	currentPage: PageNames.Profile,
});

const reducer = createReducer({}, initialState());

reducer.on(ownedAdsActions.getMy.REQUEST, (state, payload): IAdsState => ({
	...state,
	isLoading: true,
}));

reducer.on(ownedAdsActions.getMy.SUCCESS, (state, payload): IAdsState => ({
	...state,
	ads: payload,
	isLoading: false,
}));

reducer.on(ownedAdsActions.getMy.FAILURE, (state, payload): IAdsState => ({
	...state,
	isLoading: false,
}));

reducer.on(ownedAdsActions.changePage.REQUEST, (state, payload): IAdsState => ({
	...state,
	currentPage: payload,
}));

reducer.on(ownedAdsActions.selectForEdit.REQUEST, (state, payload): IAdsState => ({
	...state,
	selectedId: payload.id,
	currentPage: PageNames.Edit,
}));

export default reducer;
