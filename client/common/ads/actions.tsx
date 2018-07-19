import { createActionCreator, IAsyncAction } from 'client/common/user/utils';
import { IAds, ICreateAdRequest } from 'client/common/ads/interface';

const createAsyncAction = createActionCreator('ADS');

const getMy  = createAsyncAction('GET_MY');
const create = createAsyncAction('CREATE');

export const AdsActions: IAdsActions = {
	getMy,
	create,
};

export interface IAdsActions {
	getMy: IAsyncAction<{}, IAds[]>;
	create: IAsyncAction<ICreateAdRequest>;
}
