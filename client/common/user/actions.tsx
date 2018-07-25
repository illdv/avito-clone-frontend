import { createActionCreator, IAsyncAction } from './utils';
import { IAds } from 'client/common/ads/interface';

const createAsyncAction = createActionCreator('USER');

const login               = createAsyncAction('LOGIN');
const logout              = createAsyncAction('LOGOUT');
const register            = createAsyncAction('REGISTER');
const getProfile          = createAsyncAction('GET_PROFILE');
const initUser            = createAsyncAction('INIT_USER');
const changePassword      = createAsyncAction('CHANGE_PASSWORD');
const sendCode            = createAsyncAction('SEND_CODE');
const resetPasswordByCode = createAsyncAction('RESET_PASSWORD_BY_CODE');
const getFavorites        = createAsyncAction('GET_FAVORITE');
const selectFavorite      = createAsyncAction('SELECT_FAVORITE');
const setFavorite      = createAsyncAction('SET_FAVORITE');
const removeFavorite      = createAsyncAction('REMOVE_FAVORITE');

export interface IUserActions {
	login: IAsyncAction<ILoginRequest, { user: IUser, isRememberMe: boolean }>;
	register: IAsyncAction<IRegisterRequest>;
	getProfile: IAsyncAction<{}, IUser>;
	sendCode: IAsyncAction<ISendCodeToEmailRequest>;
	resetPasswordByCode: IAsyncAction<IResetPasswordByCodeRequest>;
	logout: IAsyncAction;
	initUser: IAsyncAction;
	changePassword: IAsyncAction<IChangePasswordRequest>;
	getFavorites: IAsyncAction<{}, {favoritesAds: IAds[]}>;
	selectFavorite: IAsyncAction<{id: string}>;
	setFavorite: IAsyncAction<{id: string}, {id: string}>;
	removeFavorite: IAsyncAction<{favoritesId: string[]}, {indexInFavorites: number}>;
}
export const UserActions: IUserActions = {
	login,
	logout,
	register,
	getProfile,
	initUser,
	changePassword,
	sendCode,
	resetPasswordByCode,
	getFavorites,
	selectFavorite,
	setFavorite,
	removeFavorite,
};

