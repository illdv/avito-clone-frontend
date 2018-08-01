import { createAction, ComplexActionCreator1, ComplexActionCreator2, EmptyActionCreator } from 'redux-act';

const setTokenToState = createAction<string>('SET_TOKEN_TO_STATE');
const setTokenToStorage = createAction<string>('SET_TOKEN_TO_STORAGE');
const clearToken = createAction('CLEAR_TOKEN');

export interface ITokenActions {
	setTokenToState: ComplexActionCreator1<string, string>;
	setTokenToStorage: ComplexActionCreator2<string, boolean, string>;
	clearToken: EmptyActionCreator;
}

export const tokenActions: ITokenActions = {
	setTokenToState,
	setTokenToStorage,
	clearToken,
};