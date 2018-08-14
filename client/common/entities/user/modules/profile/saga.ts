import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { Action } from 'redux-act';
import { AxiosResponse } from 'axios';

import { UserAPI } from '../../../../api/UserAPI';
import { errorHandler } from '../../../../../../client/common/store/errorHandler';
import { ModalNames } from '../../../../../../client/common/modal-juggler/modalJugglerInterface';
import { show } from '../../../../../../client/common/modal-juggler/module';
import { Toasts } from '../../../../../../client/common/utils/Toasts';

import { profileActions } from './actions';
import { tokenActions } from '../token/actions';
import { notificationActions } from '../notifications/actions';

export function* getProfile(action: Action<{ token: string }>) {
	try {
		const response: AxiosResponse<IGetProfileResponse> = yield call(UserAPI.getProfile);
		const profile                                      = response.data;

		yield put(profileActions.getProfile.SUCCESS(profile));
		yield put(tokenActions.setTokenToState.REQUEST({token: action.payload.token}));
		yield put(notificationActions.setNoReadCount.REQUEST(profile.count_unread_notifications));
	} catch (e) {
		yield call(errorHandler, e);
		yield put(profileActions.getProfile.FAILURE({}));
	}
}

export function* changePassword(action: Action<{ password: string }>) {
	try {
		yield call(UserAPI.changePassword, action.payload);
		yield put(profileActions.changePassword.SUCCESS({}));
		yield put(show(ModalNames.success));
	} catch (e) {
		yield call(errorHandler, e);
		yield put(profileActions.changePassword.FAILURE({}));
	}
}

export function* changeProfile(action) {
	try {
		const response = yield call(UserAPI.changeProfile, action.payload);
		yield put(profileActions.changeProfile.SUCCESS(response.data));
		Toasts.info('Profile changed');
	} catch (e) {
		yield call(errorHandler, e);
		yield put(profileActions.changeProfile.FAILURE({}));
	}
}

export function* deleteAccount() {
	try {
		yield call(UserAPI.deleteAccount);
		yield put(tokenActions.clearToken.REQUEST({}));
	} catch (err) {
		yield call(errorHandler, err);
	}
}

function* watcherProfile() {
	yield [
		takeEvery(profileActions.getProfile.REQUEST, getProfile),
		takeLatest(profileActions.changePassword.REQUEST, changePassword),
		takeEvery(profileActions.changeProfile.REQUEST, changeProfile),
		takeEvery(profileActions.deleteAccount.REQUEST, deleteAccount),
	];
}

export default [watcherProfile];
