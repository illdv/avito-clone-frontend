import { createActionCreator, IAsyncAction } from '../../utils';

const createAsyncAction = createActionCreator('FAVORITES');

const getFavoritesAds     = createAsyncAction('GET_ADS');
const removeFavoritesAds  = createAsyncAction('REMOVE_ADS');
const removeFavoritesAd   = createAsyncAction('REMOVE_AD');

const selectFavorite = createAsyncAction('SELECT_FAVORITE');
const setFavorite    = createAsyncAction('SET_FAVORITE');
const removeFavorite = createAsyncAction('REMOVE_FAVORITE');
const composeFavoritesIds = createAsyncAction('COMPOSE_IDS');

export interface IFavoritesActions {
	getFavoritesAds: IAsyncAction<{}, { favoritesAds: IAd[] }>;
	removeFavoritesAds: IAsyncAction<{}, { favoritesIds: number[] }>;
	removeFavoritesAd: IAsyncAction<{ id: any }, { favoritesIds: number[] }>;
	composeFavoritesIds: IAsyncAction<{ ids: number[] }>;

	selectFavorite: IAsyncAction<{ id: number }>;
	setFavorite: IAsyncAction<{ id: number }, { favoritesIds: number[] }>;
	removeFavorite: IAsyncAction<{}, { favoritesIds: number[] }>;
}

export const favoritesActions: IFavoritesActions = {
	composeFavoritesIds,
	getFavoritesAds,
	removeFavoritesAds,
	removeFavoritesAd,
	selectFavorite,
	setFavorite,
	removeFavorite,
};
