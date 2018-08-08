import { createActionCreator, IAsyncAction } from '../../utils';

const createAsyncAction = createActionCreator('TOKEN');

const clearToken        = createAsyncAction('CLEAR_TOKEN');
const setTokenToAxios   = createAsyncAction('SET_TO_AXIOS');
const setTokenToState   = createAsyncAction('SET_TO_STATE');
const setTokenToStorage = createAsyncAction('SET_TO_STORAGE');

export interface ITokenActions {
	setTokenToAxios: IAsyncAction<{token: string}>;
	setTokenToState: IAsyncAction<{token: string}>;
	setTokenToStorage: IAsyncAction<{token: string, isRememberMe: boolean}>;
	clearToken: IAsyncAction;
}

export const tokenActions: ITokenActions = {
	setTokenToAxios,
	setTokenToState,
	setTokenToStorage,
	clearToken,
};