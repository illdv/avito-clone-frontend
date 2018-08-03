import { call, put, takeEvery } from 'redux-saga/effects';
import { Action } from 'redux-act';

import { errorHandler } from 'client/common/store/errorHandler';
import { ownedAdsActions } from './actions';
import { AdsAPI } from 'client/common/api/AdsAPI';
import { ResponseWhitPagination } from 'client/common/utils/interface';
import { IAds, ICreateAdRequest, AdsActionType, PageNames } from './interfaces';
import { Toasts } from 'client/common/utils/Toasts';
import { delay } from 'redux-saga';
import { pushInRouter } from '../../../../utils/utils';

function* getMy(action: Action<IRegisterRequest>) {
	try {
		const response: ResponseWhitPagination<IAd> = yield call(AdsAPI.getMy, action.payload);

		yield put(ownedAdsActions.getMy.SUCCESS(response.data.data));
	} catch (e) {
		yield call(errorHandler, e);
		yield put(ownedAdsActions.getMy.FAILURE({}));
	}
}

function* create(action: Action<ICreateAdRequest>) {
	try {
		yield call(AdsAPI.create, action.payload);
		yield put(ownedAdsActions.create.SUCCESS({}));
		yield put(ownedAdsActions.changePage.REQUEST(PageNames.Profile));
		yield delay(500);
		Toasts.info('Ad created');
		pushInRouter('/profile/my-ads/avtive');
	} catch (e) {
		yield call(errorHandler, e);
		Toasts.info('Failed ad created');
		yield put(ownedAdsActions.create.FAILURE({}));
	}
}

function* remove(action: Action<{ id: string }>) {
	try {
		yield call(AdsAPI.remove, action.payload.id);
		yield put(ownedAdsActions.remove.SUCCESS({}));
		yield put(ownedAdsActions.getMy.REQUEST({}));
		Toasts.info('Ad removed');
	} catch (e) {
		yield call(errorHandler, e);
		Toasts.info('Failed ad removed');
		yield put(ownedAdsActions.remove.FAILURE({}));
	}
}

function* changeStatus(action: Action<{ actionType: AdsActionType, id: string }>) {
	try {
		const { id, actionType } = action.payload;

		yield call(AdsAPI.useAction, id, actionType);

		yield put(ownedAdsActions.changeStatus.SUCCESS({}));
		yield put(ownedAdsActions.getMy.REQUEST({}));
		// Toasts.info('Status changed');
	} catch (e) {
		yield call(errorHandler, e);
		Toasts.info('Failed status changed');
		yield put(ownedAdsActions.changeStatus.FAILURE({}));
	}
}

function* edit(action: Action<any>) {
	try {
		yield call(AdsAPI.edit, action.payload);
		yield put(ownedAdsActions.edit.SUCCESS({}));
		yield put(ownedAdsActions.getMy.REQUEST({}));
		Toasts.info('Ad saved');
		pushInRouter('/profile/my-ads/avtive');
	} catch (e) {
		yield call(errorHandler, e);
		Toasts.info('Failed ad save');
		yield put(ownedAdsActions.edit.FAILURE({}));
	}
}

function* deleteImage(action: Action<{ id: string }>) {
	try {
		yield call(AdsAPI.deleteImage, action.payload.id);
		yield put(ownedAdsActions.deleteImage.SUCCESS({}));
		Toasts.info('Image deleted');
	} catch (e) {
		yield call(errorHandler, e);
		Toasts.info('Failed delete image');
		yield put(ownedAdsActions.deleteImage.FAILURE({}));
	}
}

function* watcherUser() {
	yield [
		takeEvery(ownedAdsActions.getMy.REQUEST, getMy),
		takeEvery(ownedAdsActions.create.REQUEST, create),
		takeEvery(ownedAdsActions.remove.REQUEST, remove),
		takeEvery(ownedAdsActions.changeStatus.REQUEST, changeStatus),
		takeEvery(ownedAdsActions.edit.REQUEST, edit),
		takeEvery(ownedAdsActions.deleteImage.REQUEST, deleteImage),
	];
}

export default [watcherUser];
