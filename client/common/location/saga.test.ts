import { call, put, select, take } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';

import { get } from '../loader-prepare/loaderPrepare';
import { Toasts } from '../../common/utils/Toasts';
import { getLocationState } from '../store/selectors';

import { ILocationStoreState, ICountry, IRegion, ICity } from './locationInterface';
import { sagaChangeCountryForLocal } from './saga';

import {
	changeState,
} from './module';

jest.mock('../../common/utils/Toasts', () => ({
	Toasts: jest.fn(),
}));

jest.mock('../store/selectors', () => ({
	getLocationState: jest.fn(),
}));

jest.mock('../../ssr/modals/location/locationModalTriggers', () => ({
	showLocationModal: jest.fn(),
}));

jest.mock('../loader-prepare/loaderPrepare', () => ({
	get: jest.fn(),
}));

const defaultState: ILocationStoreState = {
	session: {
		idCountry: null,
		idRegion: null,
		idCity: null,
	},
	local: {
		idCountry: null,
		idRegion: null,
		idCity: null,
	},
	loaded: {
		session: {
			countries: [],
			regions: [],
			cities: [],
		},
		local: {
			countries: [],
			regions: [],
			cities: [],
		},
	},
	locationName: null,
};

const fakeActionChangeCountry = {
	payload: 2,
};

const fakeActionChangeCountryWithoutId = {
	payload: null,
};

const fakeCountries: ICountry[] = [
	{ country_id: 2, title: '2' },
	{ country_id: 3, title: '3' },
	{ country_id: 4, title: '4' },
	{ country_id: 5, title: '5' },
];

const fakeRegions: IRegion[] = [
	{ country_id: 2, region_id: 22, title: '22'  },
	{ country_id: 2, region_id: 33, title: '33'  },
	{ country_id: 2, region_id: 44, title: '44'  },
];

const fakeCities: ICity[] = [
	{ country_id: 2, region_id: 22, city_id: 222, title: '222', area: '222' },
	{ country_id: 2, region_id: 33, city_id: 333, title: '333', area: '333' },
];

describe('Testing location saga', () => {

	describe('Change country local location without id', () => {
		const saga = sagaHelper(sagaChangeCountryForLocal(fakeActionChangeCountryWithoutId));

		saga('Get state', result => {
			expect(result).toEqual(select(getLocationState));

			return {
				...defaultState,
				local: {
					idCountry: 32,
					idRegion: 34,
					idCity: 545,
				},
				loaded: {
					...defaultState.loaded,
					local: {
						countries: fakeCountries,
						regions: fakeRegions, // <- Will be deleted
						cities: fakeCities, // <- Will be deleted
					},
				},
			} as ILocationStoreState;
		});

		saga('Check data in action', result => {
			expect(result).toEqual(put(changeState({
				...defaultState,
				local: {
					idCountry: null,
					idRegion: null,
					idCity: null,
				},
				loaded: {
					...defaultState.loaded,
					local: {
						countries: fakeCountries,
						regions: [],
						cities: [],
					},
				},
			}as ILocationStoreState)));
		});
	});

	describe('Change country local location with id', () => {
		const saga = sagaHelper(sagaChangeCountryForLocal(fakeActionChangeCountry));

		saga('Get state', result => {
			expect(result).toEqual(select(getLocationState));

			return {
				...defaultState,
				local: {
					idCountry: 32,
					idRegion: 34,
					idCity: 545,
				},
				loaded: {
					...defaultState.loaded,
					local: {
						countries: fakeCountries,
						regions: fakeRegions, // <- Will be deleted
						cities: fakeCities, // <- Will be deleted
					},
				},
			} as ILocationStoreState;
		});

		saga('Check data', result => {
			expect(result).toEqual(call(get, 'getRegions', { id: fakeActionChangeCountry.payload }));
			return { data: fakeRegions };
		});

		saga('dsdp', result => {
			expect(result).toEqual(put(changeState({
				...defaultState,
				local: {
					idCountry: fakeActionChangeCountry.payload,
					idRegion: null,
					idCity: null,
				},
				loaded: {
					...defaultState.loaded,
					local: {
						countries: fakeCountries,
						regions: fakeRegions,
						cities: [],
					},
				},
			})));
		});
	});

});