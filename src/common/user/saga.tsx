import { call, put, takeEvery } from 'redux-saga/effects';
import { Action } from 'redux-act';
import { AxiosResponse } from 'axios';

import { UserActions } from '../../common/user/actions';
import { UserAPI } from '../../../api/UserAPI';
import { errorHandler } from '../../common/store/errorHandler';

function* login(action: Action<ILoginRequest>) {
  try {
    const response: AxiosResponse = yield call(UserAPI.login, action.payload);
    console.log(response.data);
    yield put(UserActions.login.SUCCESS({}));
  } catch (e) {
    yield call(errorHandler, e);
    yield put(UserActions.login.FAILURE({}));
  }
}

function* watcherUser() {
  yield [
    takeEvery(UserActions.login.REQUEST, login),
  ];
}

export default [watcherUser];
