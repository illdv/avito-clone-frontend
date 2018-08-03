import { createReducer } from 'redux-act';
import { ownedAdsActions } from './actions';
import { IAds } from './interfaces';


const initialState = (): IOwnedAdsState => ({
	items: [],
	isLoading: true,
});

const reducer = createReducer({}, initialState());

reducer.on(ownedAdsActions.getMy.REQUEST, (state, payload): IOwnedAdsState => ({
	...state,
	isLoading: true,
}));

reducer.on(ownedAdsActions.getMy.SUCCESS, (state, payload): IOwnedAdsState => ({
	...state,
	items: payload,
	isLoading: false,
}));

reducer.on(ownedAdsActions.getMy.FAILURE, (state, payload): IOwnedAdsState => ({
	...state,
	isLoading: false,
}));

export default reducer;
