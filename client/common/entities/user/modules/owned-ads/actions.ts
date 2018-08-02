import { createActionCreator, IAsyncAction } from '../../utils';
import { AdsActionType, IAds, ICreateAdRequest, IEditAdRequest, PageNames } from './interfaces';


const createAsyncAction = createActionCreator('ADS');

const getMy         = createAsyncAction('GET_MY');
const create        = createAsyncAction('CREATE');
const changePage    = createAsyncAction('CHANGE_PAGE');
const remove        = createAsyncAction('REMOVE');
const changeStatus  = createAsyncAction('CHANGE_STATUS');
const selectForEdit = createAsyncAction('SELECT_FOR_EDIT');
const edit          = createAsyncAction('EDIT');
const deleteImage   = createAsyncAction('DELETE_IMAGE');

export interface IOwnedAdsActions {
	getMy: IAsyncAction<{}, IAds[]>;
	create: IAsyncAction<ICreateAdRequest>;
	changePage: IAsyncAction<PageNames>;
	remove: IAsyncAction<{ id: string }>;
	changeStatus: IAsyncAction<{ actionType: AdsActionType, id: string }>;
	selectForEdit: IAsyncAction<{ id: string }>;
	edit: IAsyncAction<IEditAdRequest>;
	deleteImage: IAsyncAction<{ id: string }>;
}

export const ownedAdsActions: IOwnedAdsActions = {
	getMy,
	create,
	changePage,
	remove,
	changeStatus,
	selectForEdit,
	edit,
	deleteImage,
};