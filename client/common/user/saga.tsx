import { call, put, takeEvery } from 'redux-saga/effects';
import { Action } from 'redux-act';
import axios, { AxiosResponse } from 'axios';

import { UserActions } from 'client/common/user/actions';
import { UserAPI } from 'api/UserAPI';
import { errorHandler } from 'client/common/store/errorHandler';
import { CustomStorage } from 'client/common/user/CustomStorage';
import { hideLoginModal } from 'client/ssr/modals/auth/loginModalTriggers';

function* saveTokenInStore(action: Action<IUser>) {
	const token = action.payload.token;
	CustomStorage.setToken(token);
	axios.defaults.headers.common.authorization = `Bearer ${token}`;
}

function* clearToken() {
	CustomStorage.clear();
	axios.defaults.headers.common.authorization = ``;
}

function* login(action: Action<ILoginRequest>) {
	try {
		const response: AxiosResponse<{ token: string }> = yield call(UserAPI.login, action.payload);
		yield put(UserActions.login.SUCCESS({
			email: action.payload.email,
			token: response.data.token,
		}));
		hideLoginModal();
	} catch (e) {
		yield call(errorHandler, e);
		yield put(UserActions.login.FAILURE({}));
	}
}

function* register(action: Action<IRegisterRequest>) {
	try {
		yield call(UserAPI.register, action.payload);
		yield put(UserActions.register.SUCCESS({}));
		hideLoginModal();
	} catch (e) {
		yield call(errorHandler, e);
		yield put(UserActions.register.FAILURE({}));
	}
}

function* watcherUser() {
	yield [
		takeEvery(UserActions.login.REQUEST, login),
		takeEvery(UserActions.login.SUCCESS, saveTokenInStore),
		takeEvery(UserActions.register.REQUEST, register),
		takeEvery(UserActions.logout.REQUEST, clearToken),
	];
}

export default [watcherUser];
