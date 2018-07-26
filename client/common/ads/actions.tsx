import { createActionCreator, IAsyncAction } from 'client/common/user/utils';
import { AdsActionType, IAds, ICreateAdRequest, IEditAdRequest } from 'client/common/ads/interface';
import { PageName } from 'client/common/ads/reducer';

const createAsyncAction = createActionCreator('ADS');

const getMy         = createAsyncAction('GET_MY');
const create        = createAsyncAction('CREATE');
const changePage    = createAsyncAction('CHANGE_PAGE');
const remove        = createAsyncAction('REMOVE');
const changeStatus  = createAsyncAction('CHANGE_STATUS');
const selectForEdit = createAsyncAction('SELECT_FOR_EDIT');
const edit          = createAsyncAction('EDIT');
const deleteImage   = createAsyncAction('DELETE_IMAGE');

export const AdsActions: IAdsActions = {
	getMy,
	create,
	changePage,
	remove,
	changeStatus,
	selectForEdit,
	edit,
	deleteImage,
};

export interface IAdsActions {
	getMy: IAsyncAction<{}, IAds[]>;
	create: IAsyncAction<ICreateAdRequest>;
	changePage: IAsyncAction<PageName>;
	remove: IAsyncAction<{ id: string }>;
	changeStatus: IAsyncAction<{ actionType: AdsActionType, id: string }>;
	selectForEdit: IAsyncAction<{ id: string }>;
	edit: IAsyncAction<IEditAdRequest>;
	deleteImage: IAsyncAction<{ id: string }>;
}
