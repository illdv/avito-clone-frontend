import { call, put, takeEvery } from 'redux-saga/effects';
import { Action } from 'redux-act';

import { errorHandler } from 'client/common/store/errorHandler';
import { AdsActions } from 'client/common/ads/actions';
import { AdsAPI } from 'api/AdsAPI';
import { ResponseWhitPagination } from 'client/common/utils/interface';
import { IAds, ICreateAdRequest } from 'client/common/ads/interface';
import { Toasts } from 'client/common/utils/Toasts';
import { PageName } from 'client/common/ads/reducer'
import { delay } from 'redux-saga';

function* getMy(action: Action<IRegisterRequest>) {
	try {
		const response: ResponseWhitPagination<IAds> = yield call(AdsAPI.getMy, action.payload);

		yield put(AdsActions.getMy.SUCCESS(response.data.data));
	} catch (e) {
		yield call(errorHandler, e);
		yield put(AdsActions.getMy.FAILURE({}));
	}
}

function* create(action: Action<ICreateAdRequest>) {
	try {
		yield call(AdsAPI.create, action.payload);
		yield put(AdsActions.create.SUCCESS({}));
		yield put(AdsActions.changePage.REQUEST(PageName.Profile));
		yield delay(500);
		Toasts.info('Ad created');
	} catch (e) {
		yield call(errorHandler, e);
		Toasts.info('Failed ad created');
		yield put(AdsActions.create.FAILURE({}));
	}
}

function* remove(action: Action<{ id: string }>) {
	try {
		yield call(AdsAPI.remove, action.payload.id);
		yield put(AdsActions.remove.SUCCESS({}));
		yield put(AdsActions.getMy.REQUEST({}));
		Toasts.info('Ad removed');
	} catch (e) {
		yield call(errorHandler, e);
		Toasts.info('Failed ad removed');
		yield put(AdsActions.remove.FAILURE({}));
	}
}

function* watcherUser() {
	yield [
		takeEvery(AdsActions.getMy.REQUEST, getMy),
		takeEvery(AdsActions.create.REQUEST, create),
		takeEvery(AdsActions.remove.REQUEST, remove),
	];
}

export default [watcherUser];
