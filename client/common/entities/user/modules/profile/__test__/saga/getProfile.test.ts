import { types } from 'redux-act';
import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import { UserAPI } from 'client/common/api/userAPI';
import { profileActions } from 'client/common/entities/user/modules/profile/actions';
import { tokenActions } from 'client/common/entities/user/modules/token/actions';
import { getProfile } from 'client/common/entities/user/modules/profile/saga';
import { errorHandler } from 'client/common/store/errorHandler';

types.disableChecking();

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9jbGllbnRcL3YxXC9sb2dpbiIsImlhdCI6MTUzMzExNjcyMiwiZXhwIjoxNTMzMTIwMzIyLCJuYmYiOjE1MzMxMTY3MjIsImp0aSI6ImFmOUt0dEFvdmZNWkxScEwiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.KIvge9VuO-oEA5v5w5beFHziXvgKPxIFsLYv5YJ8nPA';

const response = {
	data: {
		this: 'mock response',
	},
};

const error = () => {
	return new Error('failed');
};

describe('Success get current user profile', () => {
	const saga = sagaHelper(getProfile({ payload: { token } }));
	saga('Get profile', result => {
		expect(result)
			.toEqual(
				call(UserAPI.getProfile),
			);

		return response;
	});

	saga('Profile user get success', result => {
		expect(result)
			.toEqual(
				put(profileActions.getProfile.SUCCESS(response.data)),
			);

		return token;
	});

	saga('Set user token', result => {
		expect(result)
			.toEqual(
				put(tokenActions.setTokenToState(token)),
			);
	});
});

describe('Failed get user profile', () => {
	const saga = sagaHelper(getProfile({ payload: { token } }));

	saga('We get an error instead of profile', result => {
		expect(result)
			.toEqual(
				call(UserAPI.getProfile),
			);

		return error();
	});

	saga('Calling errorHandler', result => {
		expect(result)
			.toEqual(
				call(errorHandler, error()),
			);
	});

	saga('Calling actions on error', result => {
		expect(result)
			.toEqual(
				put(profileActions.getProfile.FAILURE({})),
			);
	});
});