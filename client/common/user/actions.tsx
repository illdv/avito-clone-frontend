import { createActionCreator, IAsyncAction } from './utils';

const createAsyncAction = createActionCreator('USER');

const login               = createAsyncAction('LOGIN');
const logout              = createAsyncAction('LOGOUT');
const register            = createAsyncAction('REGISTER');
const getProfile          = createAsyncAction('GET_PROFILE');
const initUser            = createAsyncAction('INIT_USER');
const changePassword      = createAsyncAction('CHANGE_PASSWORD');
const sendCode            = createAsyncAction('SEND_CODE');
const resetPasswordByCode = createAsyncAction('RESET_PASSWORD__BY_CODE');

export const UserActions: IUserActions = {
	login,
	logout,
	register,
	getProfile,
	initUser,
	changePassword,
	sendCode,
	resetPasswordByCode,
};

export interface IUserActions {
	login: IAsyncAction<ILoginRequest, { user: IUser, isRememberMe: boolean }>;
	register: IAsyncAction<IRegisterRequest>;
	getProfile: IAsyncAction<{}, IUser>;
	sendCode: IAsyncAction<ISendCodeToEmailRequest>;
	resetPasswordByCode: IAsyncAction<IResetPasswordByCodeRequest>;
	logout: IAsyncAction;
	initUser: IAsyncAction;
	changePassword: IAsyncAction<IChangePasswordRequest>;
}