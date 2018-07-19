import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { Action } from 'redux-act';
import axios, { AxiosResponse } from 'axios';

import { UserActions } from 'client/common/user/actions';
import { UserAPI } from 'api/UserAPI';
import { errorHandler } from 'client/common/store/errorHandler';
import { CustomStorage } from 'client/common/user/CustomStorage';
import { hideLoginModal } from 'client/ssr/modals/auth/loginModalTriggers';
import Router from 'next/router';

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
    Router.push('/', '/', { shallow: true });
}

function* login(action: Action<ILoginRequest>) {
    try {
        const { email, isRememberMe }                    = action.payload;
        const response: AxiosResponse<{ token: string }> = yield call(UserAPI.login, action.payload);
        yield put(UserActions.login.SUCCESS({
            user: {
                email,
                token: response.data.token,
            },
            isRememberMe,
        }));
        hideLoginModal();
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
    } catch (e) {
        yield call(errorHandler, e);
        yield put(UserActions.register.FAILURE({}));
    }
}

function* getProfile() {
    console.log('getProfile');
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
    } catch (e) {
        yield call(errorHandler, e);
        yield put(UserActions.changePassword.FAILURE({}));
    }
}

function* loadingUserIfHasToken() {
    console.log('in not serfer');
    const token = CustomStorage.getToken();
    console.log('Token = ' + token);
    if (token) {
        yield put(UserActions.getProfile.REQUEST({}));
    }
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

    ];
}

export default [watcherUser];
