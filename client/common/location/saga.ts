import { select, takeEvery, call, put } from 'redux-saga/effects';
import { get } from '../loader-prepare/loaderPrepare';
import { Toasts } from 'client/common/utils/Toasts';
import { showLocationModal } from 'client/ssr/modals/location/locationModalTriggers';

import { getLocationState } from '../store/selectors';
import { ILocationStoreState, ILocationSession, IRegion, ICity } from './locationInterface';

import {
	INITIALIZE,
	changeState,
	CHANGE_CITY_SESSION,
	CHANGE_CITY_LOCAL,
	CHANGE_COUNTRY_LOCAL,
	CHANGE_COUNTRY_SESSION,
	CHANGE_REGION_LOCAL,
	CHANGE_REGION_SESSION,
} from './module';

function* sagaInitializeLocation(action) {

	const payload: ILocationSession = action.payload;
	const locationState: ILocationStoreState = yield select(getLocationState);

	const getCountries: any = yield call(get, 'getCountries');
	const countries = getCountries.data;

	if (!payload) {
		yield put(changeState({
			...locationState,
			loaded: {
				session: {
					...locationState.loaded.session,
					countries,
				},
				local: {
					...locationState.loaded.local,
					countries,
				},
			},
		}));
		
		showLocationModal();
		return null;
	}

	const getRegions = yield call(get, 'getRegions', { id: payload.idCountry });
	const regions = getRegions.data;

	const getCities = yield call(get, 'getCities', { id: payload.idRegion });
	const cities = getCities.data;

	yield put(changeState({
		...locationState,
		loaded: {
			session: {
				countries,
				regions,
				cities,
			},
			local: {
				countries,
				regions,
				cities,
			},
		},
	}));

}

function* sagaChangeCountryForSession(action) {
	const locationState: ILocationStoreState = yield select(getLocationState);
	const idCountry: number = action.payload;

	if (locationState.session.idCity === idCountry) {
		return null;
	} else {
		try {
			const getRegions = yield call(get, 'getRegions', { id: idCountry });
			const regions: IRegion[] = getRegions.data;
			
			localStorage.setItem('idCountry', String(idCountry));

			yield put(changeState({
				...locationState,
				session: {
					idCountry,
					idRegion: null,
					idCity: null,
				},
				loaded: {
					...locationState.loaded,
					session: {
						countries: locationState.loaded.session.countries,
						regions,
						cities: [],
					},
				},
			}));
		} catch (err) {
			Toasts.error('Error get location');
		}
	}
}

function* sagaChangeCountryForLocal(action) {
	const locationState: ILocationStoreState = yield select(getLocationState);
	const idCountry: number = action.payload;

	if (locationState.local.idCity === idCountry) {
		return null;
	} else {
		try {
			const getRegions = yield call(get, 'getRegions', { id: idCountry });
			const regions: IRegion[] = getRegions.data;
			
			yield put(changeState({
				...locationState,
				local: {
					idCountry,
					idRegion: null,
					idCity: null,
				},
				loaded: {
					...locationState.loaded,
					local: {
						countries: locationState.loaded.local.countries,
						regions,
						cities: [],
					},
				},
			}));
		} catch (err) {
			Toasts.error('Error get location');
		}
	}
}

function* sagaChangeRegionForSession(action) {
	const locationState: ILocationStoreState = yield select(getLocationState);
	const idRegion: number = action.payload;

	if (locationState.session.idCity === idRegion) {
		return null;
	} else {
		try {
			const getCities = yield call(get, 'getCities', { id: idRegion });
			const cities: ICity[] = getCities.data;
			
			localStorage.setItem('idRegion', String(idRegion));

			yield put(changeState({
				...locationState,
				session: {
					...locationState.session,
					idRegion,
					idCity: null,
				},
				loaded: {
					...locationState.loaded,
					session: {
						countries: locationState.loaded.session.countries,
						regions: locationState.loaded.session.regions,
						cities,
					},
				},
			}));
		} catch (err) {
			Toasts.error('Error get location');
		}
	}
}

function* sagaChangeRegionForLocal(action) {
	const locationState: ILocationStoreState = yield select(getLocationState);
	const idRegion: number = action.payload;

	if (locationState.local.idCity === idRegion) {
		return null;
	} else {
		try {
			const getCities = yield call(get, 'getCities', { id: idRegion });
			const cities: ICity[] = getCities.data;
			
			yield put(changeState({
				...locationState,
				local: {
					...locationState.local,
					idRegion,
					idCity: null,
				},
				loaded: {
					...locationState.loaded,
					local: {
						countries: locationState.loaded.local.countries,
						regions: locationState.loaded.local.regions,
						cities,
					},
				},
			}));
		} catch (err) {
			Toasts.error('Error get location');
		}
	}
}

function* sagaChangeCityForSession(action) {
	const locationState: ILocationStoreState = yield select(getLocationState);
	const idCity: number = action.payload;

	localStorage.setItem('idCity', String(idCity));

	if (locationState.local.idCity === idCity) {
		return null;
	} else {
		try {
			yield put(changeState({
				...locationState,
				session: {
					...locationState.session,
					idCity,
				},
			}));
		} catch (err) {
			Toasts.error('Error get location');
		}
	}
}

function* sagaChangeCityForLocal(action) {
	const locationState: ILocationStoreState = yield select(getLocationState);
	const idCity: number = action.payload;

	if (locationState.local.idCity === idCity) {
		return null;
	} else {
		try {
			yield put(changeState({
				...locationState,
				local: {
					...locationState.session,
					idCity,
				},
			}));
		} catch (err) {
			Toasts.error('Error get location');
		}
	}
}

function* watcherLocation() {
	yield [
		takeEvery(INITIALIZE, sagaInitializeLocation),

		takeEvery(CHANGE_COUNTRY_SESSION, sagaChangeCountryForSession),
		takeEvery(CHANGE_COUNTRY_LOCAL, sagaChangeCountryForLocal),

		takeEvery(CHANGE_REGION_SESSION, sagaChangeRegionForSession),
		takeEvery(CHANGE_REGION_LOCAL, sagaChangeRegionForLocal),

		takeEvery(CHANGE_CITY_SESSION, sagaChangeCityForSession),
		takeEvery(CHANGE_CITY_LOCAL, sagaChangeCityForLocal),
	];
}

export {
	sagaInitializeLocation,
};

export default [watcherLocation];