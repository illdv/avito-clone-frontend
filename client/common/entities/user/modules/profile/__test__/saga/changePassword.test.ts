import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';
import { UserAPI } from 'client/common/api/UserAPI';

import { changePassword } from 'client/common/entities/user/modules/profile/saga';
import { profileActions } from 'client/common/entities/user/modules/profile/actions';
import { show } from 'client/common/modal-juggler/module';
import { ModalNames } from 'client/common/modal-juggler/modalJugglerInterface';
import { errorHandler } from 'client/common/store/errorHandler';

const pass = '11111';
const error = new Error('Invalid request');

describe('User success set new password', () => {
	const saga = sagaHelper(changePassword({ payload: pass }));

	saga('User set new password', result => {
		expect(result)
			.toEqual(
				call(UserAPI.changePassword, pass),
			);
	});

	saga('User success set new password', result => {
		expect(result)
			.toEqual(
				put(profileActions.changePassword.SUCCESS({})),
			);
	});

	saga('Hide modal if success set new password', result => {
		expect(result)
			.toEqual(
				put(show(ModalNames.success)),
			);
	});
});

describe('An error occurred while changing your password', () => {
	const saga = sagaHelper(changePassword({ payload: pass }));

	saga('User entered an incorrect password', result => {
		expect(result)
			.toEqual(
				call(UserAPI.changePassword, pass),
			);

		return error;
	});

	saga('User get error', result => {
		expect(result)
			.toEqual(
				call(errorHandler, error),
			);
	});

	saga('After receiving the error, the action failed', result => {
		expect(result)
			.toEqual(
				put(profileActions.changePassword.FAILURE({})),
			);
	});
});