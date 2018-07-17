import { put } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { UserActions } from 'src/common/user/actions';
import { Toasts } from 'src/common/utils/Toasts';

export function* errorHandler(error: AxiosError) {
  const messages = yield extractMessages(error);
  Toasts.error(messages[0] || messages);
}

export function* extractMessages(error: AxiosError) {
  if (!error.response) {
    return error.message;
  }
  const status = error.response.status;
  if (status === 422) {
    const errors          = error.response.data.errors;
    const keyFirstElement = Object.keys(errors)[0];
    return errors[keyFirstElement];
  }
  if (status === 401) {
    yield put(UserActions.logout.REQUEST({}));
    return error.response.data.message;
  }
  return error.response.data.message;
}
