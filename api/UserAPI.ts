import { AxiosWrapper } from './AxiosWrapper';

function login(loginRequest) {
    return AxiosWrapper.post('/login', loginRequest);
}

function getProfile() {
    return AxiosWrapper.get('/profile');
}

function register(registerRequest) {
    return AxiosWrapper.post('/register', { ...registerRequest, name: '123123132' });
}

function sendCodeToEmail(request: ISendCodeToEmailRequest) {
    return AxiosWrapper.post('/password/email', request);
}

function resetPasswordByCode(request: IResetPasswordByCodeRequest) {
    return AxiosWrapper.post('/password/reset', request);
}

export const UserAPI = {
    login,
    register,
    getProfile,
    sendCodeToEmail,
    resetPasswordByCode,
};
