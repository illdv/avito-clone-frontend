import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';
import { UserAPI } from 'client/common/api/userAPI';
import { profileActions } from 'client/common/entities/user/modules/profile/actions';
import { changeProfile } from 'client/common/entities/user/modules/profile/saga';
import { errorHandler } from 'client/common/store/errorHandler';

const data = {
	name: 'Maxim Galkin',
	email: 'konstet@mail.ru',
	phone: '88966633',
};

const response = {
	data: {
		id: 112,
		name: 'Maxim Galkin',
		email: 'konstet@mail.ru',
		phone: '88966633',
		created_at: '2018-08-12',
		updated_at: '2018-08-17',
		favorites_ids: [],
		image: {
			id: '11',
			imageable_type: 'wtf',
			imageable_id: 5,
			file_name: 'konst',
			file: 'fdfdfdw422.jpg',
			created_at: '2018-08-12',
			updated_at: '2018-08-15',
			file_url: 'stor/files/img/fdfdfdw422.jpg',
		},
	},

};

const error = new Error('failed');

describe('The user can successfully change the information of his profile', () => {
	const saga = sagaHelper(changeProfile({ payload: data }));

	saga('User set new personal information', result => {
		expect(result)
			.toEqual(
				call(UserAPI.changeProfile, data),
			);

		return response;
	});

	saga('User success set new personal information', result => {
		expect(result)
			.toEqual(
				put(profileActions.changeProfile.SUCCESS(response.data)),
			);
	});
});

describe('User received an error when changing information', () => {
	const saga = sagaHelper(changeProfile({ payload: data }));

	saga('User set new personal information', result => {
		expect(result)
			.toEqual(
				call(UserAPI.changeProfile, data),
			);

		return error;
	});

	saga('Invalid data', result => {
		expect(result)
			.toEqual(
				call(errorHandler, error),
			);
	});

	saga('Fail action', result => {
		expect(result)
			.toEqual(
				put(profileActions.changeProfile.FAILURE({})),
			);
	});
});