import { call, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { Action } from 'redux-act';
import axios, { AxiosResponse } from 'axios';

import { UserActions } from 'client/common/user/actions';
import { UserAPI } from 'api/UserAPI';
import { errorHandler } from 'client/common/store/errorHandler';
import { CustomStorage } from 'client/common/user/CustomStorage';
import { ModalNames } from 'client/common/modal-juggler/modalJugglerInterface';
import { show } from 'client/common/modal-juggler/module';
import { hideLoginModal } from 'client/ssr/modals/auth/loginModalTriggers';
import { Toasts } from 'client/common/utils/Toasts';
import { pushInRouter } from 'client/common/utils/utils';
import { IAds } from 'client/common/ads/interface';

export const getUserFavoriteIds = state => state.user.user.favorites_ids;
export const getToken           = state => state.user.user.token;
export const getUserFavoriteAds = state => state.user.favoritesAds;

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
		debugger;
		if (!user.favorites_ids.length) {
			// favorites_ids = yield select(getUserFavorite);
			favorites_ids = yield call(readLocalStorage);
		} else {
			favorites_ids = user.favorites_ids;
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

function* getProfile() {
	try {
		const response: AxiosResponse<IUser> = yield call(UserAPI.getProfile);
		yield put(UserActions.getProfile.SUCCESS(response.data));
	} catch (e) {
		yield call(errorHandler, e);
		yield put(UserActions.getProfile.FAILURE({}));
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

	function* loadingUserIfHasToken() {
	const token = CustomStorage.getToken();
	if (token) {
		yield put(UserActions.getProfile.REQUEST({}));
	}
}

function* selectFavorite(action) {
	const selectedAdId     = action.payload.id;
	const favoriteAds      = yield select(getUserFavoriteIds);
	const indexInFavorites = favoriteAds.indexOf(selectedAdId);
	if (indexInFavorites === -1) {
		yield put(UserActions.setFavorite.SUCCESS({ id: selectedAdId }));
	} else {
		// yield call()
		yield put(UserActions.removeFavorite.SUCCESS({ indexInFavorites }));
	}
	const changedFavoriteAds = yield select(getUserFavoriteIds);
	yield call(synchronizeLocalStorage, changedFavoriteAds);
	const token = yield select(getToken);
	if (token) {
		try {
			yield call(UserAPI.postFavorites, { favorites_ids: changedFavoriteAds });
		} catch (e) {
			yield call(errorHandler, e);
		}
	}
}

function* getFavorites() {
	const favoritesID = yield call(readLocalStorage);
	try {
		const { data }     = yield call(UserAPI.getFavorites, { favorites_ids: favoritesID });
		const favoritesAds = yield call(fromArrayToObject, data.data);
		yield put(UserActions.getFavoritesAds.SUCCESS({ favoritesAds }));
	} catch (e) {
		yield call(errorHandler, e);
	}
}

function* removeFavoriteAds(action) {
	const favoritesIDs = action.payload.favoritesId;
	const token        = yield select(getToken);
	// const favoritesID = yield call(readLocalStorage);
	for (let i = 0; i <= favoritesIDs.length + 1; i++) {
		const id = favoritesIDs[i];
		yield put(UserActions.removeFavoritesAd.REQUEST({ id }));
	}
	if (token) {
		try {
			yield call(UserAPI.deleteFavorites, { favorites_ids: favoritesIDs });
		} catch (e) {
			yield call(errorHandler, e);
		}
	}
}

function synchronizeLocalStorage(favoritesList) {
	CustomStorage.setItem('favorites_ids', JSON.stringify(favoritesList));
}

function readLocalStorage() {
	return JSON.parse(CustomStorage.getItem('favorites_ids'));
}

function fromArrayToObject(adsCollection: IAds[]) {
	return adsCollection.reduce((result, item) => {
		const id   = item.id;
		result[id] = item;
		return result;
	}, {});
}

function saveInStorege(id) {
	const oldData = JSON.parse(CustomStorage.getItem('favorites_ids'));
	if (oldData.length === 0) {
		CustomStorage.setItem('favorites_ids', JSON.stringify([id]));
		return;
	}
	let newData      = [];
	const isFavorite = oldData.indexOf(this.props.id);
	if (isFavorite !== -1) {
		oldData.splice(isFavorite, 1);
		newData = oldData;
	} else {
		newData = oldData.concat(this.props.id);
	}
	CustomStorage.setItem('favorites_ids', JSON.stringify(newData));
	return;
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
		takeEvery(UserActions.selectFavorite.REQUEST, selectFavorite),
		takeEvery(UserActions.getFavoritesAds.REQUEST, getFavorites),
		takeEvery(UserActions.removeFavoritesAds.REQUEST, removeFavoriteAds),

	];
}

export default [watcherUser];
