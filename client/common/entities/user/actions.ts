import { createAction, ComplexActionCreator1 } from 'redux-act';

import { createActionCreator, IAsyncAction } from './utils';
import { IAds, IFavoritesAds } from 'client/common/ads/interface';

const setToken = createAction<string>('SET_TOKEN');

const createAsyncAction = createActionCreator('USER');

const login               = createAsyncAction('LOGIN');
const logout              = createAsyncAction('LOGOUT');
const register            = createAsyncAction('REGISTER');
const getProfile          = createAsyncAction('GET_PROFILE');
const initUser            = createAsyncAction('INIT_USER');
const changeProfile       = createAsyncAction('CHANGE_PROFILE');
const changePassword      = createAsyncAction('CHANGE_PASSWORD');
const sendCode            = createAsyncAction('SEND_CODE');
const resetPasswordByCode = createAsyncAction('RESET_PASSWORD_BY_CODE');
const getFavoritesAds     = createAsyncAction('GET_FAVORITE_ADS');
const removeFavoritesAds  = createAsyncAction('REMOVE_FAVORITE_ADS');
const removeFavoritesAd   = createAsyncAction('REMOVE_FAVORITE_AD');
const deleteAccount       = createAsyncAction('DELETE_ACCOUNT');

const selectFavorite = createAsyncAction('SELECT_FAVORITE');
const setFavorite    = createAsyncAction('SET_FAVORITE');
const removeFavorite = createAsyncAction('REMOVE_FAVORITE');

export interface IUserActions {
	setToken: ComplexActionCreator1<string, string>;
	register: IAsyncAction<IRegisterRequest, IAuthResponse>;
	initUser: IAsyncAction<{}, { token: string }>;
	getProfile: IAsyncAction<{ token: string }, IGetProfileResponse>;
	login: IAsyncAction<ILoginRequest, IAuthResponse>;
	logout: IAsyncAction;
	changeProfile: IAsyncAction<IChangeProfileRequest, IChangeProfileResponse>;
	changePassword: IAsyncAction<IChangePasswordRequest>;
	sendCode: IAsyncAction<ISendCodeToEmailRequest>;
	resetPasswordByCode: IAsyncAction<IResetPasswordByCodeRequest>;
	deleteAccount: IAsyncAction;

	getFavoritesAds: IAsyncAction<{}, { favoritesAds: IAds[] }>;
	removeFavoritesAds: IAsyncAction<{}, { favoritesIds: number[] }>;
	removeFavoritesAd: IAsyncAction<{ id: any }, { favoritesIds: number[] }>;

	selectFavorite: IAsyncAction<{ id: number }>;
	setFavorite: IAsyncAction<{ id: number }, { favoritesIds: number[] }>;
	removeFavorite: IAsyncAction<{}, { favoritesIds: number[] }>;
}

export const UserActions: IUserActions = {
	login,
	logout,
	setToken,
	register,
	getProfile,
	initUser,
	changeProfile,
	changePassword,
	sendCode,
	resetPasswordByCode,
	getFavoritesAds,
	removeFavoritesAds,
	removeFavoritesAd,
	selectFavorite,
	setFavorite,
	removeFavorite,
	deleteAccount,
};
