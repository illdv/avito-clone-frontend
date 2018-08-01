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

import { getToken } from '../../../../store/selectors';

import { commonActions } from './actions';
import { tokenActions } from '../token/actions';
import { profileActions } from '../profile/actions';
import { favoritesActions } from '../favorites/actions';

function* loadingUserIfHasToken() {
	const token = yield select(getToken);
	if (token) {
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
		const { favorites_ids: favoritesIds, ...correctUserData } = user;

		yield call(favoritesActions.composeFavoritesIds.REQUEST, { ids: favoritesIds });		
		yield call(profileActions.changeProfile.SUCCESS, correctUserData);

		yield call(tokenActions.setTokenToStorage, token, isRememberMe);
		yield call(tokenActions.setTokenToState, token);

		hideLoginModal();
		pushInRouter('/profile');
	} catch (e) {
		yield call(errorHandler, e);
		yield put(commonActions.login.FAILURE({}));
	}
}

function* register(action: Action<IRegisterRequest>) {
	try {
		const response: AxiosResponse<IAuthResponse> = yield call(UserAPI.register, action.payload);
		const data = response.data;

		yield put(commonActions.register.SUCCESS(data));

		yield call(tokenActions.setTokenToState, data.token);

		hideLoginModal();
		Toasts.info('You have registered successfully!');
	} catch (e) {
		yield call(errorHandler, e);
		yield put(commonActions.register.FAILURE({}));
	}
}

function* watcherUser() {
	yield [
		takeEvery(commonActions.login.REQUEST, login),
		takeEvery(commonActions.register.REQUEST, register),
		takeEvery(commonActions.initUser.REQUEST, loadingUserIfHasToken),
		takeLatest(commonActions.sendCode.REQUEST, resetPassword),
	];
}

export default [watcherUser];
