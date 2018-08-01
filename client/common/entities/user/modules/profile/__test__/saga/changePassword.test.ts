import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';
import { UserAPI } from 'client/common/api/userAPI';

import { changePassword } from 'client/common/entities/user/modules/profile/saga';
import { profileActions } from 'client/common/entities/user/modules/profile/actions';
import { show } from 'client/common/modal-juggler/module';
import { ModalNames } from 'client/common/modal-juggler/modalJugglerInterface';

const pass = '11111';

describe('User success set new password', () => {
	const saga = sagaHelper(changePassword({payload: pass}));

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