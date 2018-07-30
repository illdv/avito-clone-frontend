import { takeEvery } from 'redux-saga/effects';
import { Action } from 'redux-act';
import axios from 'axios';

import { CustomStorage } from '../CustomStorage';

import { pushInRouter } from 'client/common/utils/utils';

import { TokenActions } from './actions';

function* saveTokenInStore(action: Action<{ token: string, isRememberMe: boolean }>) {
	const { token, isRememberMe } = action.payload;

	if (isRememberMe) {
		CustomStorage.setAndRememberToken(token);
	} else {
		CustomStorage.setToken(token);
	}
	axios.defaults.headers.common.authorization = `Bearer ${token}`;
}

function* clearToken() {
	CustomStorage.clear();
	axios.defaults.headers.common.authorization = ``;
	pushInRouter('/');
}

function* watcherToken() {
	yield [
		takeEvery(TokenActions.clearToken, clearToken),
		takeEvery(TokenActions.setTokenToStorage, saveTokenInStore),
	];
}

export default [watcherToken];
