import { call, put } from 'redux-saga/effects';
import { AdsAPI } from 'client/common/api/AdsAPI';
import { delay } from 'redux-saga';
import sagaHelper from 'redux-saga-testing';
import { ownedAdsActions } from 'client/common/entities/user/modules/owned-ads/actions';
import { errorHandler } from 'client/common/store/errorHandler';
import { create } from 'client/common/entities/user/modules/owned-ads/saga';
import { PageNames } from 'client/common/entities/user/modules/owned-ads/interfaces';
import { resolve } from 'url';
import { Toasts } from 'client/common/utils/Toasts';

const request = {
	title: 'Test saga',
	description: 'Test saga',
	city_id: 614,
	body: 'Test saga',
	type_id: 6,
	price: '45000',
	longitude: -54.444,
	latitude: 62.445,
	category_id: 1,
	phone: 'Test saga',
	images: [
		{
			id: 1,
			isBackend: true,
			base64: 'fafsafafafa',
			file: 'fsfafsf',
		},
	],
	options: [
		{
			id: '1',
			value: 'koerete',
		},
	],
	is_vip: true,
};
const error = new Error('lol');

jest.mock('redux-saga');

describe('Success created ad', () => {
	// @ts-ignore
	const saga = sagaHelper(create({payload: request}));

	   saga('Send request for create ad', result => {
		expect(result)
			.toEqual(
				// @ts-ignore
				call(AdsAPI.create, request),
			);
	});

	   saga('Ad success create', result => {
		expect(result)
			.toEqual(
				put(ownedAdsActions.create.SUCCESS({})),
			);
	});

	   saga('Change page', result => {
		expect(result)
			.toEqual(
				put(ownedAdsActions.changePage.REQUEST(PageNames.Profile)),
			);
	});

	   saga('Delay', result => {
		expect(result)
			.toEqual(
				delay(500),
			);
	});

	   saga('Toast', result => {
		expect(result)
			.toEqual(
				Toasts.info('Ad created'),
			);
	});
});

describe('Fails', () => {
	// @ts-ignore
	const saga = sagaHelper(create({ payload: request }));

	   saga('Send request for create ad', result => {
		expect(result)
			.toEqual(
				// @ts-ignore
				call(AdsAPI.create, request),
			);

			return error;
	});

	   saga('Get fail and processing', result => {
		expect(result)
			.toEqual(
				call(errorHandler, error),
			);
	});

	   saga('Create fail action', result => {
		expect(result)
			.toEqual(
				put(ownedAdsActions.create.FAILURE({})),
			);
	});
});