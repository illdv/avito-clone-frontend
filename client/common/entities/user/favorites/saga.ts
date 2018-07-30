import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { Action } from 'redux-act';

import { FavoritesActions } from './actions';
import { UserAPI } from 'client/common/api/userAPI';
import { errorHandler } from 'client/common/store/errorHandler';
import { IAds } from 'client/common/ads/interface';
import { IRootState } from '../../../store/storeInterface';
import {
	getFavoritesFromLocalStorage,
	synchronizeFavoritesLocalStorage,
} from '../CustomStorage';

// TODO
export const getUserFavoriteIds = (state: IRootState): number[] => state.user.favorites.ids;
export const getToken           = (state: IRootState): string => state.user.token;
export const getUserFavoriteAds = (state: IRootState): IAd[] => state.user.favorites.items;

function* selectFavorite(action: Action<{ id: number }>) {
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

	yield put(FavoritesActions.setFavorite.SUCCESS({ favoritesIds }));
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
	yield put(FavoritesActions.removeFavorite.SUCCESS({ favoritesIds }));
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

	yield put(FavoritesActions.removeFavorite.SUCCESS({ favoritesIds }));
	yield put(FavoritesActions.removeFavoritesAds.SUCCESS({ favoritesIds: selectedFavoriteIds }));

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

		yield put(FavoritesActions.getFavoritesAds.SUCCESS({ favoritesAds }));
	} catch (e) {
		yield call(errorHandler, e);
	}
}

function fromArrayToObject(adsCollection: IAds[]) {
	return adsCollection.reduce((result, item) => {
		const id   = item.id;
		result[id] = item;
		return result;
	}, {});
}

function* watcherUser() {
	yield [
		takeEvery(FavoritesActions.selectFavorite.REQUEST, selectFavorite),
		takeEvery(FavoritesActions.getFavoritesAds.REQUEST, getFavorites),
		takeEvery(FavoritesActions.removeFavoritesAds.REQUEST, removeFavoriteAds),
	];
}

export default [watcherUser];
