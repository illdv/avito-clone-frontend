import { all, fork } from 'redux-saga/effects';

import madalJuggler from '../modal-juggler/saga';
import user from '../user/saga';
import ads from '../ads/saga';

export default function* rootSaga() {
	yield all([
		...madalJuggler.map(fork),
		...user.map(fork),
		...ads.map(fork),
	]);
}
