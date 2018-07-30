export interface ICountry {
	country_id: number;
	title: string;
}

export interface IRegion {
	country_id: number;
	region_id: number;
	title: string;
}

export interface ICity {
	city_id: number;
	country_id: number;
	region_id: number;
	title: string;
	area: string;
}

export interface ILocationSession {
	idCountry: number;
	idRegion: number;
	idCity: number;
}

export interface ILocationLocal {
	idCountry: number;
	idRegion: number;
	idCity: number;
}

export interface ILoadedData {
	countries: ICountry[];
	regions: IRegion[];
	cities: ICity[];
}

export interface ILoaded {
	local: ILoadedData;
	session: ILoadedData;
}

export interface ILocationStoreState {
	session: ILocationSession;
	local: ILocationLocal;
	loaded: ILoaded;
	locationName: string;
}