import { createReducer } from 'redux-act';

import { tokenActions } from './actions';

const initialState = (): string => null;

const reducer = createReducer({}, initialState());

reducer.on(tokenActions.setTokenToState.REQUEST, (state, { token }): string => token);

export default reducer;
