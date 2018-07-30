import { createActionCreator, IAsyncAction } from '../utils';
import { IAds } from 'client/common/ads/interface';

const createAsyncAction = createActionCreator('FAVORITES');

const getFavoritesAds     = createAsyncAction('GET_ADS');
const removeFavoritesAds  = createAsyncAction('REMOVE_ADS');
const removeFavoritesAd   = createAsyncAction('REMOVE_AD');

const selectFavorite = createAsyncAction('SELECT_FAVORITE');
const setFavorite    = createAsyncAction('SET_FAVORITE');
const removeFavorite = createAsyncAction('REMOVE_FAVORITE');

export interface IFavoritesActions {
	getFavoritesAds: IAsyncAction<{}, { favoritesAds: IAds[] }>;
	removeFavoritesAds: IAsyncAction<{}, { favoritesIds: number[] }>;
	removeFavoritesAd: IAsyncAction<{ id: any }, { favoritesIds: number[] }>;

	selectFavorite: IAsyncAction<{ id: number }>;
	setFavorite: IAsyncAction<{ id: number }, { favoritesIds: number[] }>;
	removeFavorite: IAsyncAction<{}, { favoritesIds: number[] }>;
}

export const FavoritesActions: IFavoritesActions = {
	getFavoritesAds,
	removeFavoritesAds,
	removeFavoritesAd,
	selectFavorite,
	setFavorite,
	removeFavorite,
};
