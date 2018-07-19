import { call, put, takeEvery } from 'redux-saga/effects';
import { Action } from 'redux-act';

import { errorHandler } from 'client/common/store/errorHandler';
import { AdsActions } from 'client/common/ads/actions';
import { AdsAPI } from 'api/AdsAPI';
import { ResponseWhitPagination } from 'client/common/utils/interface';
import { IAds } from 'client/common/ads/interface';

function* getMy(action: Action<IRegisterRequest>) {
	try {
		const response: ResponseWhitPagination<IAds> = yield call(AdsAPI.getMy, action.payload);

		yield put(AdsActions.getMy.SUCCESS(response.data.data));
	} catch (e) {
		yield call(errorHandler, e);
		yield put(AdsActions.getMy.FAILURE({}));
	}
}

function* watcherUser() {
	yield [
		takeEvery(AdsActions.getMy.REQUEST, getMy),
	];
}

export default [watcherUser];
