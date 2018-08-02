import { call, put, takeEvery } from 'redux-saga/effects';
import { Action } from 'redux-act';

import { errorHandler } from 'client/common/store/errorHandler';
import { Toasts } from 'client/common/utils/Toasts';
import { notificationActions } from './actions';
import { NotificationAPI } from 'client/common/api/NotificationAPI';
import { AxiosResponse } from 'axios';

function* loading() {
	try {
		const response: AxiosResponse<INotification[]> = yield call(NotificationAPI.loading);
		yield put(notificationActions.loading.SUCCESS(response.data));
	} catch (e) {
		yield call(errorHandler, e);
		Toasts.info('Failed notification loading');
		yield put(notificationActions.loading.FAILURE({}));
	}
}

function* read(action: Action<{ id: string }>) {
	try {
		yield call(NotificationAPI.read, action.payload.id);
		yield put(notificationActions.read.SUCCESS({}));
		yield put(notificationActions.loading.REQUEST({}));
	} catch (e) {
		yield call(errorHandler, e);
		Toasts.error('Failed notification read');
		yield put(notificationActions.read.FAILURE({}));
	}
}

function* watcherUser() {
	yield [
		takeEvery(notificationActions.loading.REQUEST, loading),
		takeEvery(notificationActions.read.REQUEST, read),
	];
}

export default [watcherUser];
