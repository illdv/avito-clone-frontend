import { all, fork } from 'redux-saga/effects';

import madalJuggler from '../modal-juggler/saga';
import user from '../user/saga';

export default function* rootSaga() {
  yield all([
    ...madalJuggler.map(fork),
    ...user.map(fork),
  ]);
}
