import { call, put, takeEvery } from 'redux-saga/effects';
import { Action } from 'redux-act';

import { errorHandler } from 'client/common/store/errorHandler';
import { CategoryActions } from 'client/common/categories/actions';
import { CategoriesAPI } from 'api/CategoriesAPI';
import { ICategory } from 'client/common/categories/interface';
import { AxiosResponse } from 'axios';

function* loading(action: Action<IRegisterRequest>) {
	try {
		const response: AxiosResponse<ICategory[]> = yield call(CategoriesAPI.getCategories, action.payload);
		yield put(CategoryActions.loading.SUCCESS(response.data));
	} catch (e) {
		yield call(errorHandler, e);
		yield put(CategoryActions.loading.FAILURE({}));
	}
}

function* watcher() {
	yield [
		takeEvery(CategoryActions.loading.REQUEST, loading),
	];
}

export default [watcher];
