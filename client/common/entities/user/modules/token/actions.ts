import { createActionCreator, IAsyncAction } from '../../utils';

const createAsyncAction = createActionCreator('TOKEN');

const setTokenToState      = createAsyncAction('SET_TO_STATE');
const setTokenToStorage    = createAsyncAction('SET_TO_STORAGE');
const clearToken = createAsyncAction('CLEAR_TOKEN');

export interface ITokenActions {
	setTokenToState: IAsyncAction<{token: string}>;
	setTokenToStorage: IAsyncAction<{token: string, isRememberMe: boolean}>;
	clearToken: IAsyncAction;
}

export const tokenActions: ITokenActions = {
	setTokenToState,
	setTokenToStorage,
	clearToken,
};