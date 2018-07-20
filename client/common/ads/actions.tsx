import { createActionCreator, IAsyncAction } from 'client/common/user/utils';
import { IAds, ICreateAdRequest } from 'client/common/ads/interface';
import { PageName } from 'client/common/ads/reducer';

const createAsyncAction = createActionCreator('ADS');

const getMy      = createAsyncAction('GET_MY');
const create     = createAsyncAction('CREATE');
const changePage = createAsyncAction('CHANGE_PAGE');

export const AdsActions: IAdsActions = {
	getMy,
	create,
	changePage,
};

export interface IAdsActions {
	getMy: IAsyncAction<{}, IAds[]>;
	create: IAsyncAction<ICreateAdRequest>;
	changePage: IAsyncAction<PageName>;
}
