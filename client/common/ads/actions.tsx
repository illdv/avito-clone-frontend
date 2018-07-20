import { createActionCreator, IAsyncAction } from 'client/common/user/utils';
import { IAds, ICreateAdRequest } from 'client/common/ads/interface';
import { PageName } from 'client/common/ads/reducer';
import { MyAdsStatus } from 'client/spa/pages/utils';

const createAsyncAction = createActionCreator('ADS');

const getMy        = createAsyncAction('GET_MY');
const create       = createAsyncAction('CREATE');
const changePage   = createAsyncAction('CHANGE_PAGE');
const remove       = createAsyncAction('REMOVE');
const changeStatus = createAsyncAction('CHANGE_STATUS');

export const AdsActions: IAdsActions = {
	getMy,
	create,
	changePage,
	remove,
	changeStatus,
};

export interface IAdsActions {
	getMy: IAsyncAction<{}, IAds[]>;
	create: IAsyncAction<ICreateAdRequest>;
	changePage: IAsyncAction<PageName>;
	remove: IAsyncAction<{ id: string }>;
	changeStatus: IAsyncAction<{ status: MyAdsStatus, id: string }>;
}
