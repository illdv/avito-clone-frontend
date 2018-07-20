import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { Action } from 'redux-act';
import axios, { AxiosResponse } from 'axios';

import { UserActions } from 'client/common/user/actions';
import { UserAPI } from 'api/UserAPI';
import { errorHandler } from 'client/common/store/errorHandler';
import { CustomStorage } from 'client/common/user/CustomStorage';
import { ModalNames } from 'client/common/modal-juggler/modalJugglerInterface';
import { show } from 'client/common/modal-juggler/module';
import { hideLoginModal } from 'client/ssr/modals/auth/loginModalTriggers';
import { Toasts } from 'client/common/utils/Toasts';
import { pushInRouter } from 'client/common/utils/utils'

function* saveTokenInStore(action: Action<{ user: IUser, isRememberMe: boolean }>) {
	const { user: { token }, isRememberMe } = action.payload;
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

function* resetPassword(action) {
	try {
		yield call(UserAPI.sendCodeToEmail, action.payload);
		yield put(UserActions.sendCode.SUCCESS({}));
		yield put(show(ModalNames.forgotPassword));
		const userData = yield take(UserActions.resetPasswordByCode.REQUEST);
		yield call(UserAPI.resetPasswordByCode, userData.payload);
		yield put(show(ModalNames.success));
	} catch (e) {
		yield call(errorHandler, e);
	}
	yield put(show(ModalNames.login));
}

function* login(action: Action<ILoginRequest>) {
	try {
		const { isRememberMe }                        = action.payload;
		const response: AxiosResponse<ILoginResponse> = yield call(UserAPI.login, action.payload);
		const { token, user }                         = response.data;
		yield put(UserActions.login.SUCCESS({
			user: {
				...user,
				token,
			},
			isRememberMe,
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
		Toasts.info('You have registered successfully!');
	} catch (e) {
		yield call(errorHandler, e);
		yield put(UserActions.register.FAILURE({}));
	}
}

function* getProfile() {
	try {
		const response: AxiosResponse<IUser> = yield call(UserAPI.getProfile);
		yield put(UserActions.getProfile.SUCCESS(response.data));
	} catch (e) {
		yield call(errorHandler, e);
		yield put(UserActions.getProfile.FAILURE({}));
	}
}

function* changePassword(action) {
	try {
		yield call(UserAPI.changePassword, action.payload);
		yield put(UserActions.changePassword.SUCCESS({}));
		yield put(show(ModalNames.success));
	} catch (e) {
		yield call(errorHandler, e);
		yield put(UserActions.changePassword.FAILURE({}));
	}
}

function* loadingUserIfHasToken() {
	const token = CustomStorage.getToken();
	if (token) {
		yield put(UserActions.getProfile.REQUEST({}));
	}
}

function* watcherUser() {
	yield [
		takeEvery(UserActions.login.REQUEST, login),
		takeEvery(UserActions.login.SUCCESS, saveTokenInStore),
		takeEvery(UserActions.register.REQUEST, register),
		takeEvery(UserActions.logout.REQUEST, clearToken),
		takeEvery(UserActions.getProfile.REQUEST, getProfile),
		takeEvery(UserActions.initUser.REQUEST, loadingUserIfHasToken),
		takeLatest(UserActions.changePassword.REQUEST, changePassword),
		takeLatest(UserActions.sendCode.REQUEST, resetPassword),
	];
}

export default [watcherUser];
