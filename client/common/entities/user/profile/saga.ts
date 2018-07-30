import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { Action } from 'redux-act';
import { AxiosResponse } from 'axios';

import { UserAPI } from 'client/common/api/userAPI';
import { errorHandler } from 'client/common/store/errorHandler';
import { ModalNames } from 'client/common/modal-juggler/modalJugglerInterface';
import { show } from 'client/common/modal-juggler/module';
import { Toasts } from 'client/common/utils/Toasts';

import { ProfileActions } from './actions';
import { TokenActions } from '../token/actions';

function* getProfile(action: Action<{ token: string }>) {
	try {
		const response: AxiosResponse<IGetProfileResponse> = yield call(UserAPI.getProfile);
		const profile                                      = response.data;

		yield put(ProfileActions.getProfile.SUCCESS(profile));
		yield put(TokenActions.setTokenToState(action.payload.token));
	} catch (e) {
		yield call(errorHandler, e);
		yield put(ProfileActions.getProfile.FAILURE({}));
	}
}

function* changePassword(action) {
	try {
		yield call(UserAPI.changePassword, action.payload);
		yield put(ProfileActions.changePassword.SUCCESS({}));
		yield put(show(ModalNames.success));
	} catch (e) {
		yield call(errorHandler, e);
		yield put(ProfileActions.changePassword.FAILURE({}));
	}
}

function* changeProfile(action) {
	try {
		const response = yield call(UserAPI.changeProfile, action.payload);
		yield put(ProfileActions.changeProfile.SUCCESS(response.data));
		Toasts.info('Profile changed');
	} catch (e) {
		yield call(errorHandler, e);
		yield put(ProfileActions.changeProfile.FAILURE({}));
	}
}

function* deleteAccount() {
	try {
		yield call(UserAPI.deleteAccount);
		yield call(TokenActions.clearToken);
	} catch (err) {
		yield call(errorHandler, err);
	}
}

function* watcherProfile() {
	yield [
		takeEvery(ProfileActions.getProfile.REQUEST, getProfile),
		takeLatest(ProfileActions.changePassword.REQUEST, changePassword),
		takeEvery(ProfileActions.changeProfile.REQUEST, changeProfile),
		takeEvery(ProfileActions.deleteAccount.REQUEST, deleteAccount),
	];
}

export default [watcherProfile];
