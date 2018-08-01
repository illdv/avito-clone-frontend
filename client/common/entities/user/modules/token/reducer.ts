import { createReducer } from 'redux-act';

import { tokenActions } from './actions';

const initialState = (): string => null;

const reducer = createReducer({}, initialState());

reducer.on(tokenActions.setTokenToState, (state, payload): string => payload);

export default reducer;
