import { call, put, takeEvery } from 'redux-saga/effects';
import { Action } from 'redux-act';
import axios, { AxiosResponse } from 'axios';

import { UserActions } from 'src/common/user/actions';
import { UserAPI } from 'api/UserAPI';
import { errorHandler } from 'src/common/store/errorHandler';
import { CustomStorage } from 'src/common/user/CustomStorage';

function* saveTokenInStore(action: Action<IUser>) {
  const token = action.payload.token;
  CustomStorage.setToken(token);
  axios.defaults.headers.common.authorization = `Bearer ${token}`;
}

function* clearToken() {
  CustomStorage.clear();
  axios.defaults.headers.common.authorization = ``;
}

function* login(action: Action<ILoginRequest>) {
  try {
    const response: AxiosResponse<{ token: string }> = yield call(UserAPI.login, action.payload);
    yield put(UserActions.login.SUCCESS({
      email: action.payload.email,
      token: response.data.token,
    }));
  } catch (e) {
    yield call(errorHandler, e);
    yield put(UserActions.login.FAILURE({}));
  }
}

function* watcherUser() {
  yield [
    takeEvery(UserActions.login.REQUEST, login),
    takeEvery(UserActions.login.SUCCESS, saveTokenInStore),
    takeEvery(UserActions.logout.REQUEST, clearToken),
  ];
}

export default [watcherUser];
