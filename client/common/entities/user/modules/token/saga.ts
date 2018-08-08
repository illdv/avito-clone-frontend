import { takeEvery } from 'redux-saga/effects';
import { Action } from 'redux-act';
import axios from 'axios';

import { CustomStorage } from '../../CustomStorage';

import { pushInRouter } from 'client/common/utils/utils';

import { tokenActions } from './actions';

function setTokenToAxios(action: Action<{ token: string }>) {
	const { token } = action.payload;
	axios.defaults.headers.common.authorization = `Bearer ${token}`;
}

function saveTokenInStore(action: Action<{ token: string, isRememberMe: boolean }>) {
	const { token, isRememberMe } = action.payload;

	if (isRememberMe) {
		console.log('setAndRememberToken');
		CustomStorage.setAndRememberToken(token);
	} else {
		console.log('setToken');
		CustomStorage.setToken(token);
	}
}

function clearToken() {
	CustomStorage.clear();
	axios.defaults.headers.common.authorization = ``;
	pushInRouter('/');
}

function* watcherToken() {
	yield [
		takeEvery(tokenActions.setTokenToAxios.REQUEST, setTokenToAxios),
		takeEvery(tokenActions.clearToken.REQUEST, clearToken),
		takeEvery(tokenActions.setTokenToStorage.REQUEST, saveTokenInStore),
	];
}

export default [watcherToken];
