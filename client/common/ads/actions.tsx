import { createActionCreator, IAsyncAction } from 'client/common/user/utils';
import { IAds } from 'client/common/ads/interface';

const createAsyncAction = createActionCreator('ADS');

const getMy = createAsyncAction('GET_MY');

export const AdsActions: IAdsActions = {
	getMy,
};

export interface IAdsActions {
	getMy: IAsyncAction<{}, IAds[]>;
}
