import jsCookie from 'js-cookie';
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
	changeCityLocal,
} from './module';

import { favoritesActions } from 'client/common/entities/user/modules/favorites/actions';
import { getFavoritesFromLocalStorage } from 'client/common/entities/user/CustomStorage';

function* sagaInitializeLocation(action) {
	const payload: ILocationStoreState = action.payload;
	if (!payload.session.idCity && !payload.session.idRegion && !payload.session.idCountry) {
		if (localStorage.getItem('location-ask') !== 'no-ask') {
			showLocationModal(ModalNames.location);
		}
	}

	const search = location.search.match(/city_id=([^&]+)/);

	if (search) {
		yield put(changeCityLocal(Number(search[1])));
	}

	// TODO remove
	const favoritesIds = yield call(getFavoritesFromLocalStorage);
	yield put(favoritesActions.setFavorite.SUCCESS({ favoritesIds }));
}

function* sagaChangeCountryForSession(action) {
	const locationState: ILocationStoreState = yield select(getLocationState);
	const idCountry: number = action.payload;

	if (locationState.session.idCountry === idCountry) {
		return null;
	}

	if (idCountry === null) {
		jsCookie.remove('idCountry');
	} else {
		jsCookie.set('idCountry', idCountry);
	}
	jsCookie.remove('idRegion');
	jsCookie.remove('idCity');

	if (!idCountry) {
		yield put(changeState({
			...locationState,
			session: {
				idCountry: null,
				idRegion: null,
				idCity: null,
				locationName: 'World',
			},
			local: {
				idCountry: null,
				idRegion: null,
				idCity: null,
				locationName: 'World',
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

			yield put(changeState({
				...locationState,
				session: {
					...locationState.session,
					idCountry,
					idRegion: null,
					idCity: null,
				},
				local: {
					...locationState.local,
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

	if (locationState.local.idCountry === idCountry) {
		return null;
	}

	if (!idCountry) {
		yield put(changeState({
			...locationState,
			local: {
				idCountry: null,
				idRegion: null,
				idCity: null,
				locationName: 'World',
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
					...locationState.local,
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

	if (locationState.session.idRegion === idRegion) {
		return null;
	}

	if (idRegion === null) {
		jsCookie.remove('idRegion');
	} else {
		jsCookie.set('idRegion', idRegion);
	}
	jsCookie.remove('idCity');

	if (!idRegion) {
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

	if (locationState.local.idRegion === idRegion) {
		return;
	}

	if (!idRegion) {
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

	if (locationState.local.idCity === idCity) {
		return null;
	}

	if (idCity === null) {
		jsCookie.remove('idCity');
	} else {
		jsCookie.set('idCity', idCity);
	}

	if (!idCity) {
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

	if (locationState.local.idCity === idCity) {
		return null;
	}

	if (!idCity) {
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