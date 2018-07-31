import { createActionCreator, IAsyncAction } from '../../utils';

const createAsyncAction = createActionCreator('USER');

const getProfile     = createAsyncAction('GET_PROFILE');
const changeProfile  = createAsyncAction('CHANGE_PROFILE');
const changePassword = createAsyncAction('CHANGE_PASSWORD');
const deleteAccount  = createAsyncAction('DELETE_ACCOUNT');

export interface IProfileActions {
	getProfile: IAsyncAction<{ token: string }, IGetProfileResponse>;
	changeProfile: IAsyncAction<IChangeProfileRequest, IChangeProfileResponse>;
	changePassword: IAsyncAction<IChangePasswordRequest>;
	deleteAccount: IAsyncAction;
}

export const ProfileActions: IProfileActions = {
	getProfile,
	changeProfile,
	changePassword,
	deleteAccount,
};
