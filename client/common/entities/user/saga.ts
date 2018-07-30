import { call, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { Action } from 'redux-act';
import axios, { AxiosResponse } from 'axios';

import { UserActions } from './actions';
import { UserAPI } from 'client/common/api/userAPI';
import { errorHandler } from 'client/common/store/errorHandler';
import {
	CustomStorage,
	getFavoritesFromLocalStorage,
	synchronizeFavoritesLocalStorage
} from './CustomStorage';
import { ModalNames } from 'client/common/modal-juggler/modalJugglerInterface';
import { show } from 'client/common/modal-juggler/module';
import { hideLoginModal } from 'client/ssr/modals/auth/loginModalTriggers';
import { Toasts } from 'client/common/utils/Toasts';
import { pushInRouter } from 'client/common/utils/utils';
import { IAds } from 'client/common/ads/interface';
import { IRootState } from '../../store/storeInterface';

// TODO
export const getUserFavoriteIds = (state: IRootState): number[] => state.user.favorites.ids;
export const getToken           = (state: IRootState): string => state.user.token;
export const getUserFavoriteAds = (state: IRootState): IAd[] => state.user.favorites.items;

function* loadingUserIfHasToken() {
	const token = CustomStorage.getToken();
	if (token) {
		yield put(UserActions.getProfile.REQUEST({ token }));
	}
}

function* getProfile(action: Action<{ token: string }>) {
	try {
		const response: AxiosResponse<IGetProfileResponse> = yield call(UserAPI.getProfile);
		const profile                                      = response.data;

		yield put(UserActions.getProfile.SUCCESS(profile));
		yield put(UserActions.setToken(action.payload.token));
	} catch (e) {
		yield call(errorHandler, e);
		yield put(UserActions.getProfile.FAILURE({}));
	}
}

function* saveTokenInStore(token, isRememberMe) {
	if (isRememberMe) {
		CustomStorage.setAndRememberToken(token);
	} else {
		CustomStorage.setToken(token);
	}
	axios.defaults.headers.common.authorization = `Bearer ${token}`;
}

function* clearToken() {
	CustomStorage.clear();
	axios.defaults.headers.common.authorization = ``;
	pushInRouter('/');
}

function* resetPassword(action) {
	try {
		yield call(UserAPI.sendCodeToEmail, action.payload);
		yield put(UserActions.sendCode.SUCCESS({}));
		yield put(show(ModalNames.forgotPassword));
		const userData = yield take(UserActions.resetPasswordByCode.REQUEST);
		yield call(UserAPI.resetPasswordByCode, userData.payload);
		yield put(show(ModalNames.success));
	} catch (e) {
		yield call(errorHandler, e);
	}
	yield put(show(ModalNames.login));
}

function* login(action: Action<ILoginRequest>) {
	try {
		const response: AxiosResponse<IAuthResponse> = yield call(UserAPI.login, action.payload);

		const { isRememberMe } = action.payload;
		const { token }  = response.data;

		let favorites_ids;

		if (!response.data.user.favorites_ids.length) {
			favorites_ids = yield call(getFavoritesFromLocalStorage);
		} else {
			// Todo: add Comparison localstorage and remote server
			favorites_ids = response.data.user.favorites_ids;
			yield call(synchronizeFavoritesLocalStorage, favorites_ids);
		}

		yield put(UserActions.login.SUCCESS({
			...response.data,
			user: {
				...response.data.user,
				favorites_ids,
			},
		}));
		yield put(UserActions.setToken(token));

		yield call(saveTokenInStore, token, isRememberMe);

		hideLoginModal();
		pushInRouter('/profile');
	} catch (e) {
		yield call(errorHandler, e);
		yield put(UserActions.login.FAILURE({}));
	}
}

function* register(action: Action<IRegisterRequest>) {
	try {
		const response: AxiosResponse<IAuthResponse> = yield call(UserAPI.register, action.payload);
		const data = response.data;

		yield put(UserActions.register.SUCCESS(data));

		yield call(saveTokenInStore, data.token, false);

		hideLoginModal();
		Toasts.info('You have registered successfully!');
	} catch (e) {
		yield call(errorHandler, e);
		yield put(UserActions.register.FAILURE({}));
	}
}

function* changePassword(action) {
	try {
		yield call(UserAPI.changePassword, action.payload);
		yield put(UserActions.changePassword.SUCCESS({}));
		yield put(show(ModalNames.success));
	} catch (e) {
		yield call(errorHandler, e);
		yield put(UserActions.changePassword.FAILURE({}));
	}
}

function* changeProfile(action) {
	try {
		const response = yield call(UserAPI.changeProfile, action.payload);
		yield put(UserActions.changeProfile.SUCCESS(response.data));
		Toasts.info('Profile changed');
	} catch (e) {
		yield call(errorHandler, e);
		yield put(UserActions.changeProfile.FAILURE({}));
	}
}

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

	yield put(UserActions.setFavorite.SUCCESS({ favoritesIds }));
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
	yield put(UserActions.removeFavorite.SUCCESS({ favoritesIds }));
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

	yield put(UserActions.removeFavorite.SUCCESS({ favoritesIds }));
	yield put(UserActions.removeFavoritesAds.SUCCESS({ favoritesIds: selectedFavoriteIds }));

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
	const favoritesID = yield call(getFavoritesFromLocalStorage);
	try {
		const { data }            = yield call(UserAPI.getFavorites, { favorites_ids: favoritesID });
		const favoritesAds: IAd[] = yield call(fromArrayToObject, data.data);

		yield put(UserActions.getFavoritesAds.SUCCESS({ favoritesAds }));
	} catch (e) {
		yield call(errorHandler, e);
	}
}

function* deleteAccount() {
	try {
		yield call(UserAPI.deleteAccount);
		yield call(clearToken);
	} catch (err) {
		yield call(errorHandler, err);
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
		takeEvery(UserActions.login.REQUEST, login),
		takeEvery(UserActions.register.REQUEST, register),
		takeEvery(UserActions.logout.REQUEST, clearToken),
		takeEvery(UserActions.getProfile.REQUEST, getProfile),
		takeEvery(UserActions.initUser.REQUEST, loadingUserIfHasToken),
		takeLatest(UserActions.changePassword.REQUEST, changePassword),
		takeLatest(UserActions.sendCode.REQUEST, resetPassword),
		takeEvery(UserActions.changeProfile.REQUEST, changeProfile),
		takeEvery(UserActions.selectFavorite.REQUEST, selectFavorite),
		takeEvery(UserActions.getFavoritesAds.REQUEST, getFavorites),
		takeEvery(UserActions.removeFavoritesAds.REQUEST, removeFavoriteAds),
		takeEvery(UserActions.deleteAccount.REQUEST, deleteAccount),
	];
}

export default [watcherUser];
