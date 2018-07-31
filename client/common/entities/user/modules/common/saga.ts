import { call, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { Action } from 'redux-act';
import axios, { AxiosResponse } from 'axios';

import { UserAPI } from 'client/common/api/userAPI';
import { errorHandler } from 'client/common/store/errorHandler';
import {
	CustomStorage,
	getFavoritesFromLocalStorage,
	synchronizeFavoritesLocalStorage
} from '../CustomStorage';
import { ModalNames } from 'client/common/modal-juggler/modalJugglerInterface';
import { show } from 'client/common/modal-juggler/module';
import { hideLoginModal } from 'client/ssr/modals/auth/loginModalTriggers';
import { Toasts } from 'client/common/utils/Toasts';
import { pushInRouter } from 'client/common/utils/utils';

import { UserActions } from './actions';
import { TokenActions } from '../token/actions';
import { ProfileActions } from '../profile/actions';
import { FavoritesActions } from '../favorites/actions';

function* loadingUserIfHasToken() {
	const token = CustomStorage.getToken();
	if (token) {
		yield put(UserActions.getProfile.REQUEST({ token }));
	}
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
		const response: AxiosResponse<IAuthResponse> = yield call(UserAPI.login, action.payload);

		const { isRememberMe } = action.payload;
		const { token, user }  = response.data;
		const { favorites_ids: favoritesIds, ...correctUserData } = user;

		let correctFavoritesIds;

		if (!favoritesIds.length) {
			correctFavoritesIds = yield call(getFavoritesFromLocalStorage);
		} else {
			// Todo: add Comparison localstorage and remote server
			correctFavoritesIds = response.data.user.favorites_ids;
			yield call(synchronizeFavoritesLocalStorage, favoritesIds);
		}
		
		yield call(ProfileActions.changeProfile.SUCCESS, correctUserData);
		yield call(FavoritesActions.setFavorite.REQUEST, correctFavoritesIds);

		yield call(TokenActions.setTokenToStorage, token, isRememberMe);
		yield call(TokenActions.setTokenToState, token);

		hideLoginModal();
		pushInRouter('/profile');
	} catch (e) {
		yield call(errorHandler, e);
		yield put(UserActions.login.FAILURE({}));
	}
}

function* register(action: Action<IRegisterRequest>) {
	try {
		const response: AxiosResponse<IAuthResponse> = yield call(UserAPI.register, action.payload);
		const data = response.data;

		yield put(UserActions.register.SUCCESS(data));

		yield call(TokenActions.setTokenToState, data.token);

		hideLoginModal();
		Toasts.info('You have registered successfully!');
	} catch (e) {
		yield call(errorHandler, e);
		yield put(UserActions.register.FAILURE({}));
	}
}

function* watcherUser() {
	yield [
		takeEvery(UserActions.login.REQUEST, login),
		takeEvery(UserActions.register.REQUEST, register),
		takeEvery(UserActions.initUser.REQUEST, loadingUserIfHasToken),
		takeLatest(UserActions.sendCode.REQUEST, resetPassword),
	];
}

export default [watcherUser];
