import { select, takeEvery } from 'redux-saga/effects';

import { SHOW, HIDE, HIDE_ALL, SHOW_AND_HIDE_ALL, SHOW_AND_HIDE_SPECIFIED } from './module';
import { getModals } from '../store/selectors';

function* sagaModalJuggler() {
	const modals = yield select(getModals);

	document.documentElement.style.overflow = modals.length > 0 ? 'hidden' : 'auto';
}

function* watcherModalJuggler() {
	yield takeEvery([SHOW, HIDE, HIDE_ALL, SHOW_AND_HIDE_ALL, SHOW_AND_HIDE_SPECIFIED], sagaModalJuggler);
}

export {
	sagaModalJuggler,
};


export default [watcherModalJuggler];