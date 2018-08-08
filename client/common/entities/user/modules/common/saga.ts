import { call, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { Action } from 'redux-act';
import axios, { AxiosResponse } from 'axios';

import { UserAPI } from 'client/common/api/userAPI';
import { errorHandler } from 'client/common/store/errorHandler';
import { ModalNames } from 'client/common/modal-juggler/modalJugglerInterface';
import { show } from 'client/common/modal-juggler/module';
import { hideLoginModal } from 'client/ssr/modals/auth/loginModalTriggers';
import { Toasts } from 'client/common/utils/Toasts';
import { pushInRouter } from 'client/common/utils/utils';

import { commonActions } from './actions';
import { tokenActions } from '../token/actions';
import { profileActions } from '../profile/actions';
import { favoritesActions } from '../favorites/actions';
import { CustomStorage } from '../../CustomStorage';
import { defaultPagePath } from '../../../../../spa/profile/constants';

function* loadingUserIfHasToken() {
	const token = CustomStorage.getToken();

	if (token) {
		axios.defaults.headers.common.authorization = `Bearer ${token}`;
		yield put(profileActions.getProfile.REQUEST({ token }));
	}
}

function* resetPassword(action) {
	try {
		yield call(UserAPI.sendCodeToEmail, action.payload);
		yield put(commonActions.sendCode.SUCCESS({}));
		yield put(show(ModalNames.forgotPassword));

		const userData = yield take(commonActions.resetPasswordByCode.REQUEST);

		yield call(UserAPI.resetPasswordByCode, userData.payload);
		yield put(show(ModalNames.success));
	} catch (e) {
		yield call(errorHandler, e);
	}
	yield put(show(ModalNames.login));
}

function* login(action: Action<ILoginRequest>) {
	try {
		const response: AxiosResponse<IAuthResponse> = yield call(UserAPI.login, action.payload);

		const { isRememberMe } = action.payload;
		const { token, user }  = response.data;
		const { favorites_ids: favoritesIds, ...correctProfile }  = user;

		yield put(favoritesActions.composeFavoritesIds.REQUEST({ ids: favoritesIds }));		
		yield put(profileActions.setProfile.REQUEST(correctProfile));

		yield put(tokenActions.setTokenToStorage.REQUEST({ token, isRememberMe }));
		yield put(tokenActions.setTokenToState.REQUEST({ token }));

		hideLoginModal();
		// pushInRouter(defaultPagePath);
	} catch (e) {
		yield call(errorHandler, e);
		yield put(commonActions.login.FAILURE({}));
	}
}

function* register(action: Action<IRegisterRequest>) {
	try {
		const response: AxiosResponse<IAuthResponse> = yield call(UserAPI.register, action.payload);
		const data = response.data;
		const { token, user }  = response.data;
		const { favorites_ids: favoritesIds, ...correctProfile }  = user;

		yield put(favoritesActions.composeFavoritesIds.REQUEST({ ids: favoritesIds }));		
		yield put(profileActions.setProfile.REQUEST(correctProfile));

		yield put(tokenActions.setTokenToStorage.REQUEST({ token, isRememberMe: false }));
		yield put(tokenActions.setTokenToState.REQUEST({ token }));

		hideLoginModal();
		Toasts.info('You have registered successfully!');
		pushInRouter(defaultPagePath);
	} catch (e) {
		yield call(errorHandler, e);
		yield put(commonActions.register.FAILURE({}));
	}
}

function* logout() {
	yield put(tokenActions.clearToken.REQUEST({}));
	Toasts.info('Logout');
	/* delay(1000);
	location.reload(); */
}

function* watcherUser() {
	yield [
		takeEvery(commonActions.login.REQUEST, login),
		takeEvery(commonActions.register.REQUEST, register),
		takeEvery(commonActions.initUser.REQUEST, loadingUserIfHasToken),
		takeLatest(commonActions.sendCode.REQUEST, resetPassword),
		takeEvery(commonActions.logout.REQUEST, logout),
	];
}

export default [watcherUser];
