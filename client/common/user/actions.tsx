import { createActionCreator, IAsyncAction } from './utils';

const createAsyncAction = createActionCreator('USER');

const login      = createAsyncAction('LOGIN');
const logout     = createAsyncAction('LOGOUT');
const register   = createAsyncAction('REGISTER');
const getProfile = createAsyncAction('GET_PROFILE');
const initUser   = createAsyncAction('INIT_USER');

export const UserActions: IUserActions = {
	login,
	logout,
	register,
	getProfile,
	initUser,
};

export interface IUserActions {
	login: IAsyncAction<ILoginRequest, { user: IUser, isRememberMe: boolean }>;
	register: IAsyncAction<IRegisterRequest>;
	getProfile: IAsyncAction<{}, IUser>;
	logout: IAsyncAction;
	initUser: IAsyncAction;
}
