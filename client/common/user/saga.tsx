import { call, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { Action } from 'redux-act';
import axios, { AxiosResponse } from 'axios';

import { UserActions } from 'client/common/user/actions';
import { UserAPI } from 'api/UserAPI';
import { errorHandler } from 'client/common/store/errorHandler';
import {
	CustomStorage,
	getFavoritesFromLocalStorage,
	synchronizeFavoritesLocalStorage
} from 'client/common/user/CustomStorage';
import { ModalNames } from 'client/common/modal-juggler/modalJugglerInterface';
import { show } from 'client/common/modal-juggler/module';
import { hideLoginModal } from 'client/ssr/modals/auth/loginModalTriggers';
import { Toasts } from 'client/common/utils/Toasts';
import { pushInRouter } from 'client/common/utils/utils';
import { IAds } from 'client/common/ads/interface';

export const getUserFavoriteIds = state => state.user.user.favorites_ids;
export const getToken           = state => state.user.user.token;
export const getUserFavoriteAds = state => state.user.favoritesAds;

function* loadingUserIfHasToken() {
	const token = CustomStorage.getToken();
	if (token) {
		yield put(UserActions.getProfile.REQUEST({ token }));
	}
}

function* getProfile(action: Action<{ token: string }>) {
	try {
		const response: AxiosResponse<IUser> = yield call(UserAPI.getProfile);
		const user                           = response.data;
		const isRememberMe                   = true;
		const token                          = action.payload.token;
		const favorites_ids                  = user.favorites_ids;

		yield put(UserActions.getProfile.SUCCESS(user));
		yield put(UserActions.login.SUCCESS({
			user: {
				...user,
				token,
				favorites_ids
			},
			isRememberMe,
		}));

	} catch (e) {
		yield call(errorHandler, e);
		yield put(UserActions.getProfile.FAILURE({}));
	}
}

function* saveTokenInStore(action: Action<{ user: IUser, isRememberMe: boolean }>) {
	const { user: { token }, isRememberMe } = action.payload;
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
		const { isRememberMe }                        = action.payload;
		const response: AxiosResponse<ILoginResponse> = yield call(UserAPI.login, action.payload);
		const { token, user }                         = response.data;
		let favorites_ids;
		if (!user.favorites_ids.length) {
			favorites_ids = yield call(getFavoritesFromLocalStorage);
		} else {
			// Todo: add Comparison localstorage and remote server
			favorites_ids = user.favorites_ids;
			yield call(synchronizeFavoritesLocalStorage, favorites_ids);
		}
		yield put(UserActions.login.SUCCESS({
			user: {
				...user,
				token,
				favorites_ids
			},
			isRememberMe,
		}));
		hideLoginModal();
		pushInRouter('/profile');
	} catch (e) {
		yield call(errorHandler, e);
		yield put(UserActions.login.FAILURE({}));
	}
}

function* register(action: Action<IRegisterRequest>) {
	try {
		yield call(UserAPI.register, action.payload);
		yield put(UserActions.register.SUCCESS({}));
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

function* selectFavorite(action) {
	const selectedAdId = action.payload.id;
	const token        = yield select(getToken);
	let indexInFavorites;
	try {
		const favoriteAds = yield call(getFavoritesFromLocalStorage);
		indexInFavorites  = favoriteAds.indexOf(selectedAdId);
		if (indexInFavorites === -1) {
			yield call(saveFavoriteSaga, favoriteAds, selectedAdId, token);
		} else {
			yield call(removeFavoriteSaga, favoriteAds, selectedAdId, token, indexInFavorites);
		}
	} catch (e) {
		yield call(saveFavoriteSaga, undefined, selectedAdId, token);
	}

}

function* saveFavoriteSaga(favoriteAds, selectedAdId, token) {
	let favoritesIds;
	if (favoriteAds) {
		favoritesIds = [...favoriteAds, selectedAdId];
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

function* removeFavoriteSaga(favoriteAds, selectedAdId, token, indexInFavorites) {
	const favoritesIds = [
		...favoriteAds.slice(0, indexInFavorites),
		...favoriteAds.slice(indexInFavorites + 1),
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

function* removeFavoriteAds(action) {
	const selectedFavoriteIds     = action.payload.favoritesId;
	const token                   = yield select(getToken);
	const localStorageFavoriteIds = yield call(getFavoritesFromLocalStorage);
	const favoritesIds            = localStorageFavoriteIds.filter(storageId => {
		return selectedFavoriteIds.indexOf(storageId) === -1;
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
		const { data }     = yield call(UserAPI.getFavorites, { favorites_ids: favoritesID });
		const favoritesAds = yield call(fromArrayToObject, data.data);
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
		takeEvery(UserActions.login.SUCCESS, saveTokenInStore),
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
