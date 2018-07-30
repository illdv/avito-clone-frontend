import { createReducer } from 'redux-act';

import { TokenActions } from './actions';

const initialState = (): string => null;

const reducer = createReducer({}, initialState());

reducer.on(TokenActions.setTokenToState, (state, payload): string => payload);

export default reducer;
