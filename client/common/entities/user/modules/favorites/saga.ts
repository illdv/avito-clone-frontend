import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { Action } from 'redux-act';

import { favoritesActions } from './actions';
import { UserAPI } from 'client/common/api/userAPI';
import { errorHandler } from 'client/common/store/errorHandler';
import { IRootState } from '../../../../store/storeInterface';
import {
	getFavoritesFromLocalStorage,
	synchronizeFavoritesLocalStorage,
} from '../../CustomStorage';

// TODO
export const getUserFavoriteIds = (state: IRootState): number[] => state.user.favorites.ids;
export const getToken           = (state: IRootState): string => state.user.token;
export const getUserFavoriteAds = (state: IRootState): IAd[] => state.user.favorites.items;

function* composeFavoritesIds(action: Action<{ ids: number[] }>) {
	let correctFavoritesIds;

	if (!action.payload.ids.length) {
		correctFavoritesIds = yield call(getFavoritesFromLocalStorage);
	} else {
		// Todo: add Comparison localstorage and remote server
		correctFavoritesIds = action.payload.ids;
		yield call(synchronizeFavoritesLocalStorage, correctFavoritesIds);
	}

	yield call(favoritesActions.setFavorite.REQUEST, correctFavoritesIds);
}

export function* selectFavorite(action: Action<{ id: number }>) {
	const selectedAdId  = action.payload.id;
	const token: string = yield select(getToken);

	try {
		const favoritesAds: string[] = yield call(getFavoritesFromLocalStorage);
		const correctFavorites: number[] = favoritesAds.map(ad => Number(ad));

		const indexInFavorites  = correctFavorites.indexOf(selectedAdId);

		if (indexInFavorites === -1) {
			yield call(saveFavoriteSaga, correctFavorites, selectedAdId, token);
		} else {
			yield call(removeFavoriteSaga, correctFavorites, selectedAdId, token, indexInFavorites);
		}
	} catch (e) {
		yield call(saveFavoriteSaga, undefined, selectedAdId, token);
	}
}

function* saveFavoriteSaga(favoritesAds: number[], selectedAdId: number, token: string) {
	let favoritesIds: number[];

	if (favoritesAds) {
		favoritesIds = [...favoritesAds, selectedAdId];
	} else {
		favoritesIds = [selectedAdId];
	}

	yield put(favoritesActions.setFavorite.SUCCESS({ favoritesIds }));
	yield call(synchronizeFavoritesLocalStorage, favoritesIds);

	if (token) {
		try {
			yield call(UserAPI.postFavorites, { favorites_ids: [selectedAdId] });
		} catch (e) {
			yield call(errorHandler, e);
		}
	}
}

function* removeFavoriteSaga(favoritesAds, selectedAdId, token, indexInFavorites) {
	const favoritesIds = [
		...favoritesAds.slice(0, indexInFavorites),
		...favoritesAds.slice(indexInFavorites + 1),
	];
	yield put(favoritesActions.removeFavorite.SUCCESS({ favoritesIds }));
	yield call(synchronizeFavoritesLocalStorage, favoritesIds);
	if (token) {
		try {
			yield call(UserAPI.deleteFavorites, { favorites_ids: [selectedAdId] });
		} catch (e) {
			yield call(errorHandler, e);
		}
	}
}

function* removeFavoriteAds(action: Action<{ favoritesId: number[] }>) {
	const selectedFavoriteIds               = action.payload.favoritesId;
	const token: string                     = yield select(getToken);
	const localStorageFavoriteIds: string[] = yield call(getFavoritesFromLocalStorage);
	const correctFavoritesIds: number[]     = localStorageFavoriteIds.map(id => Number(id));

	const favoritesIds = correctFavoritesIds.filter(storageId => {
		return selectedFavoriteIds.indexOf(Number(storageId)) === -1;
	});

	yield put(favoritesActions.removeFavorite.SUCCESS({ favoritesIds }));
	yield put(favoritesActions.removeFavoritesAds.SUCCESS({ favoritesIds: selectedFavoriteIds }));

	yield call(synchronizeFavoritesLocalStorage, favoritesIds);

	if (token) {
		try {
			yield call(UserAPI.deleteFavorites, { favorites_ids: favoritesIds });
		} catch (e) {
			yield call(errorHandler, e);
		}
	}
}

function* getFavorites() {
	const favoritesId = yield call(getFavoritesFromLocalStorage);
	try {
		const { data }            = yield call(UserAPI.getFavorites, { favorites_ids: favoritesId });
		const favoritesAds: IAd[] = yield call(fromArrayToObject, data.data);

		yield put(favoritesActions.getFavoritesAds.SUCCESS({ favoritesAds }));
	} catch (e) {
		yield call(errorHandler, e);
	}
}

function fromArrayToObject(adsCollection: IAd[]) {
	return adsCollection.reduce((result, item) => {
		const id   = item.id;
		result[id] = item;
		return result;
	}, {});
}

function* watcherUser() {
	yield [
		takeEvery(favoritesActions.selectFavorite.REQUEST, selectFavorite),
		takeEvery(favoritesActions.getFavoritesAds.REQUEST, getFavorites),
		takeEvery(favoritesActions.removeFavoritesAds.REQUEST, removeFavoriteAds),
		takeEvery(favoritesActions.composeFavoritesIds.REQUEST, composeFavoritesIds),
	];
}

export default [watcherUser];
