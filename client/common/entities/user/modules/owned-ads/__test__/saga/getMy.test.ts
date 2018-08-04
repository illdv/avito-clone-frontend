import { call, put, takeEvery } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';
import { getMy } from 'client/common/entities/user/modules/owned-ads/saga';
import { AdsAPI } from 'client/common/api/AdsAPI';
import { ownedAdsActions } from 'client/common/entities/user/modules/owned-ads/actions';
import { errorHandler } from 'client/common/store/errorHandler';

const response = {
	data: {
		data: [],
		current_page: 1,
		first_page_url: 'serbuhov',
		from: 52,
		last_page: 444,
		last_page_url: 'serbuhob/333',
		path: 'local',
		per_page: 1,
		to: 2,
		total: 21,
	},
};

const error = new Error('failed');

describe('User get their ads', () => {
	const saga = sagaHelper(getMy());

	saga('It can get response with my ads', result => {
		expect(result)
			.toEqual(
				call(AdsAPI.getMy),
			);

		return response;
	});

	saga('He success get ads', result =>{
		expect(result)
			.toEqual(
				put(ownedAdsActions.getMy.SUCCESS(response.data.data)),
			);
	});
});

describe('Failed get ads current user', () => {
	const saga = sagaHelper(getMy());

	saga('It can get response with my ads', result => {
		expect(result)
			.toEqual(
				call(AdsAPI.getMy),
			);

		return error;
	});

	saga('Call errorhandler', result => {
		expect(result)
			.toEqual(
				call(errorHandler, error),
			);
	});

	saga('Fail saga', result => {
		expect(result)
			.toEqual(
				put(ownedAdsActions.getMy.FAILURE({})),
			);
	});
});