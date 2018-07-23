import { createActionCreator, IAsyncAction } from 'client/common/user/utils';
import { IAds, ICreateAdRequest } from 'client/common/ads/interface';
import { PageName } from 'client/common/ads/reducer';
import { MyAdsStatus } from 'client/spa/pages/utils';

const createAsyncAction = createActionCreator('ADS');

const getMy         = createAsyncAction('GET_MY');
const create        = createAsyncAction('CREATE');
const changePage    = createAsyncAction('CHANGE_PAGE');
const remove        = createAsyncAction('REMOVE');
const changeStatus  = createAsyncAction('CHANGE_STATUS');
const selectForEdit = createAsyncAction('SELECT_FOR_EDIT');
const edit          = createAsyncAction('EDIT');

export const AdsActions: IAdsActions = {
	getMy,
	create,
	changePage,
	remove,
	changeStatus,
	selectForEdit,
	edit,
};

export interface IAdsActions {
	getMy: IAsyncAction<{}, IAds[]>;
	create: IAsyncAction<ICreateAdRequest>;
	changePage: IAsyncAction<PageName>;
	remove: IAsyncAction<{ id: string }>;
	changeStatus: IAsyncAction<{ status: MyAdsStatus, id: string }>;
	selectForEdit: IAsyncAction<{ id: string }>;
	edit: IAsyncAction<IAds>;
}
