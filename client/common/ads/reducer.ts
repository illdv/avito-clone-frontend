import { createReducer } from 'redux-act';
import { AdsActions } from './actions';
import { IAds } from 'client/common/ads/interface';

export interface IAdsState {
	getMy: IAds[];
}

const initialState = (): IAdsState => ({
	getMy: null,
});

const reducer = createReducer({}, initialState());

reducer.on(AdsActions.getMy.SUCCESS, (state, payload): IAdsState => ({
	...state,
	getMy: payload,
}));

export default reducer;
