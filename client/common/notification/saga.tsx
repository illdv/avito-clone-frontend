import { call, put, takeEvery } from 'redux-saga/effects';
import { Action } from 'redux-act';

import { errorHandler } from 'client/common/store/errorHandler';
import { Toasts } from 'client/common/utils/Toasts';
import { NotificationActions } from 'client/common/notification/actions';
import { INotification } from 'client/common/notification/interface';
import { NotificationAPI } from 'api/NotificationAPI';
import { AxiosResponse } from 'axios';

function* loading(action: Action<INotification[]>) {
	try {
		const response: AxiosResponse<INotification[]> = yield call(NotificationAPI.loading, action.payload);
		yield put(NotificationActions.loading.SUCCESS(response.data));
	} catch (e) {
		yield call(errorHandler, e);
		Toasts.info('Failed notification loading');
		yield put(NotificationActions.loading.FAILURE({}));
	}
}

function* watcherUser() {
	yield [
		takeEvery(NotificationActions.loading.REQUEST, loading),
	];
}

export default [watcherUser];
