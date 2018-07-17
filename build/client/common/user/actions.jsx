import { createActionCreator } from './utils';
const createAsyncAction = createActionCreator('USER');
const login = createAsyncAction('LOGIN');
const logout = createAsyncAction('LOGOUT');
const register = createAsyncAction('REGISTER');
export const UserActions = {
    login,
    logout,
    register,
};
//# sourceMappingURL=actions.jsx.map