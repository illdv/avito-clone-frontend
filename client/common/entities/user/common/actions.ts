import { createActionCreator, IAsyncAction } from '../utils';

const createAsyncAction = createActionCreator('USER');

const login               = createAsyncAction('LOGIN');
const logout              = createAsyncAction('LOGOUT');
const register            = createAsyncAction('REGISTER');
const initUser            = createAsyncAction('INIT_USER');
const sendCode            = createAsyncAction('SEND_CODE');
const resetPasswordByCode = createAsyncAction('RESET_PASSWORD_BY_CODE');

export interface ICommonActions {
	register: IAsyncAction<IRegisterRequest, IAuthResponse>;
	initUser: IAsyncAction<{}, { token: string }>;
	login: IAsyncAction<ILoginRequest, IAuthResponse>;
	logout: IAsyncAction;
	sendCode: IAsyncAction<ISendCodeToEmailRequest>;
	resetPasswordByCode: IAsyncAction<IResetPasswordByCodeRequest>;
}

export const CommonActions: ICommonActions = {
	login,
	logout,
	register,
	initUser,
	sendCode,
	resetPasswordByCode,
};
