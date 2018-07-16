import { createActionCreator, IAsyncAction } from './utils';

const createAsyncAction = createActionCreator('USER');

const login = createAsyncAction('LOGIN');
const logout = createAsyncAction('LOGOUT');
const register = createAsyncAction('REGISTER');

export const UserActions: IUserActions = {
  login,
  logout,
  register,
};

export interface IUserActions {
  login: IAsyncAction<ILoginRequest, IUser>;
  register: IAsyncAction<IRegisterRequest>;
  logout: IAsyncAction;
}
