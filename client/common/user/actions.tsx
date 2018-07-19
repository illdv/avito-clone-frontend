import { createActionCreator, IAsyncAction } from './utils';

const createAsyncAction = createActionCreator('USER');

const login         = createAsyncAction('LOGIN');
const logout        = createAsyncAction('LOGOUT');
const register      = createAsyncAction('REGISTER');
const sendCode = createAsyncAction('SEND_CODE');
const resetPasswordByCode = createAsyncAction('RESET_PASSWORD__BY_CODE');

export interface IUserActions {
    login: IAsyncAction<ILoginRequest, IUser>;
    register: IAsyncAction<IRegisterRequest>;
    logout: IAsyncAction;
    sendCode: IAsyncAction<ISendCodeToEmailRequest>;
    resetPasswordByCode: IAsyncAction<IResetPasswordByCodeRequest>;
}

export const UserActions: IUserActions = {
    login,
    logout,
    register,
    sendCode,
    resetPasswordByCode
};
