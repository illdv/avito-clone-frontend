import { createActionCreator, IAsyncAction } from 'client/common/user/utils';
import { IAds, ICreateAdRequest } from 'client/common/ads/interface';

const createAsyncAction = createActionCreator('ADS');

const getMy  = createAsyncAction('GET_MY');
const create = createAsyncAction('CREATE');
const getFavorites = createAsyncAction('GET_FAVORITE');
const selectFavorite = createAsyncAction('SELECT_FAVORITE');
const removeFavorite = createAsyncAction('REMOVE_FAVORITE');

export const AdsActions: IAdsActions = {
	getMy,
	create,
	getFavorites,
	selectFavorite,
	removeFavorite,
};

export interface IAdsActions {
	getMy: IAsyncAction<{}, IAds[]>;
	create: IAsyncAction<ICreateAdRequest>;
	getFavorites: IAsyncAction<{}>;
	selectFavorite: IAsyncAction<{}>;
	removeFavorite: IAsyncAction<{}>;
}
