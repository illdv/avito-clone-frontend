import { createReducer, createAction } from 'redux-act';

import { ILocationStoreState, ILocationSession, ILoaded } from './locationInterface';

export { ILocationStoreState, ILocationSession, ILoaded };

const REDUCER = 'LOCALE';
const NS      = `${REDUCER}__`;

export const INITIALIZE = `${NS}INITIALIZE`;
export const SET_LOADED = `${NS}SET_LOADED`;
export const CHANGE_STATE = `${NS}CHANGE_STATE`;

// For saga
export const CHANGE_COUNTRY_SESSION = `${NS}CHANGE_COUNTRY_SESSION`;
export const CHANGE_COUNTRY_LOCAL = `${NS}CHANGE_COUNTRY_LOCAL`;
export const CHANGE_REGION_SESSION = `${NS}CHANGE_REGION_SESSION`;
export const CHANGE_REGION_LOCAL = `${NS}CHANGE_REGION_LOCAL`;
export const CHANGE_CITY_SESSION = `${NS}CHANGE_CITY_SESSION`;
export const CHANGE_CITY_LOCAL = `${NS}CHANGE_CITY_LOCAL`;

export const initialize = createAction(INITIALIZE, (data: ILocationStoreState) => data);
export const setLoaded  = createAction(SET_LOADED, (data: ILoaded) => data);
export const changeState = createAction(CHANGE_STATE, (data: ILocationStoreState) => data);
export const changeCountrySession = createAction(CHANGE_COUNTRY_SESSION, (id: number) => id);
export const changeCountryLocal = createAction(CHANGE_COUNTRY_LOCAL, (id: number) => id);
export const changeRegionSession = createAction(CHANGE_REGION_SESSION, (id: number) => id);
export const changeRegionLocal = createAction(CHANGE_REGION_LOCAL, (id: number) => id);
export const changeCitySession = createAction(CHANGE_CITY_SESSION, (id: number) => id);
export const changeCityLocal = createAction(CHANGE_CITY_LOCAL, (id: number) => id);

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
		local: {
			countries: [],
			regions: [],
			cities: [],
		},
		session: {
			countries: [],
			regions: [],
			cities: [],
		},
	},
	locationName: 'World',
};

const reducer = createReducer({}, defaultState);

reducer.on(initialize, (state, payload): ILocationStoreState => payload);

reducer.on(setLoaded, (state, payload): ILocationStoreState => ({
	...state,
	loaded: payload,
}));

reducer.on(changeState, (state, payload): ILocationStoreState => payload);

export default reducer;