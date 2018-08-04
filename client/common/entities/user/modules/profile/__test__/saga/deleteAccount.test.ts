import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';
import { UserAPI } from 'client/common/api/userAPI';
import { tokenActions } from 'client/common/entities/user/modules/token/actions';
import { deleteAccount } from 'client/common/entities/user/modules/profile/saga';
import { errorHandler } from 'client/common/store/errorHandler';

const error = new Error('failed');

describe('User success delete profile', () => {
	const saga = sagaHelper(deleteAccount());

	saga('User send request on delete account', result => {
		expect(result)
			.toEqual(
				call(UserAPI.deleteAccount),
			);
	});

	saga('Clear JWT token', result => {
		expect(result)
			.toEqual(
				put(tokenActions.clearToken.REQUEST({})),
			);
	});
});
describe('An error occurred while deleting', () => {
	const saga = sagaHelper(deleteAccount());

	saga('User send request on delete account', result => {
		expect(result)
			.toEqual(
				call(UserAPI.deleteAccount),
			);

		return error;
	});

	saga('Failed', result => {
		expect(result)
			.toEqual(
				call(errorHandler, error),
			);
	});
});