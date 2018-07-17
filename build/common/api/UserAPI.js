import { AxiosWrapper } from 'api/AxiosWrapper';
function login(loginRequest) {
    return AxiosWrapper.post('/login', loginRequest);
}
function register(registerRequest) {
    return AxiosWrapper.post('/register', { ...registerRequest, name: '123123132' });
}
export const UserAPI = {
    login,
    register,
};
//# sourceMappingURL=UserAPI.js.map