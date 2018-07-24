import { select, takeEvery, call, put } from 'redux-saga/effects';
import { get } from '../loader-prepare/loaderPrepare';
import { Toasts } from '../../common/utils/Toasts';

import { ModalNames } from '../../common/modal-juggler/modalJugglerInterface';
import { showLocationModal } from '../../ssr/modals/location/locationModalTriggers';

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
		
		showLocationModal(ModalNames.location);
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

	if (!idCountry || locationState.session.idCountry === idCountry) {
		yield put(changeState({
			...locationState,
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
					...locationState.loaded.session,
					regions: [],
					cities: [],
				},
				local: {
					...locationState.loaded.local,
					regions: [],
					cities: [],
				},
			},
		}));
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
				local: {
					idCountry,
					idRegion: null,
					idCity: null,
				},
				loaded: {
					session: {
						countries: locationState.loaded.session.countries,
						regions,
						cities: [],
					},
					local: {
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

	if (!idCountry || locationState.local.idCountry === idCountry) {
		yield put(changeState({
			...locationState,
			local: {
				idCountry: null,
				idRegion: null,
				idCity: null,
			},
			loaded: {
				...locationState.loaded,
				local: {
					...locationState.loaded.local,
					regions: [],
					cities: [],
				},
			},
		}));
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
						...locationState.loaded.local,
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

	if (!idRegion || locationState.session.idRegion === idRegion) {
		yield put(changeState({
			...locationState,
			session: {
				...locationState.local,
				idRegion: null,
				idCity: null,
			},
			local: {
				...locationState.local,
				idRegion: null,
				idCity: null,
			},
		}));
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
				local: {
					...locationState.session,
					idRegion,
					idCity: null,
				},
				loaded: {
					session: {
						countries: locationState.loaded.session.countries,
						regions: locationState.loaded.session.regions,
						cities,
					},
					local: {
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

	if (!idRegion || locationState.local.idRegion === idRegion) {
		yield put(changeState({
			...locationState,
			local: {
				...locationState.local,
				idRegion: null,
				idCity: null,
			},
		}));
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

	if (!idCity || locationState.local.idCity === idCity) {
		yield put(changeState({
			...locationState,
			session: {
				...locationState.local,
				idCity: null,
			},
			local: {
				...locationState.local,
				idCity: null,
			},
		}));
	} else {
		try {
			yield put(changeState({
				...locationState,
				session: {
					...locationState.session,
					idCity,
				},
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

function* sagaChangeCityForLocal(action) {
	const locationState: ILocationStoreState = yield select(getLocationState);
	const idCity: number = action.payload;

	if (!idCity || locationState.local.idCity === idCity) {
		yield put(changeState({
			...locationState,
			local: {
				...locationState.local,
				idCity: null,
			},
		}));
	} else {
		try {
			yield put(changeState({
				...locationState,
				local: {
					...locationState.local,
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

	sagaChangeCityForLocal,
	sagaChangeCityForSession,

	sagaChangeRegionForLocal,
	sagaChangeRegionForSession,
	
	sagaChangeCountryForLocal,
	sagaChangeCountryForSession,
};

export default [watcherLocation];