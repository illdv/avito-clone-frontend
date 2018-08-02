import { put } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { commonActions } from 'client/common/entities/user/modules/common/actions';
import { Toasts } from 'client/common/utils/Toasts';

function isArray(value) {
	return value && typeof value === 'object' && value.constructor === Array;
}

export function* errorHandler(error: AxiosError) {
	const messages = yield extractMessages(error);
	Toasts.error(isArray(messages) ? messages[0] : messages);
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
		yield put(commonActions.logout.REQUEST({}));
		return error.response.data.message;
	}
	return error.response.data.message;
}
