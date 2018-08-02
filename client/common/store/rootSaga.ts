import { all, fork } from 'redux-saga/effects';

import madalJuggler from '../modal-juggler/saga';
import user from '../entities/user/rootSaga';
import location from '../location/saga';

export default function* rootSaga() {
	yield all([
		...madalJuggler.map(fork),
		...location.map(fork),
		...user.map(fork),
	]);
}
