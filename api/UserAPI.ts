import { AxiosWrapper } from './AxiosWrapper';

function login(loginRequest) {
	return AxiosWrapper.post('/login', loginRequest);
}

function getProfile() {
	return AxiosWrapper.get('/profile');
}

function changePassword(request: IChangePasswordRequest) {
	return AxiosWrapper.put('/change-password', request);
}

function register(registerRequest) {
	return AxiosWrapper.post('/register', { ...registerRequest });
}

function sendCodeToEmail(request: ISendCodeToEmailRequest) {
	return AxiosWrapper.post('/password/email', request);
}

function resetPasswordByCode(request: IResetPasswordByCodeRequest) {
	return AxiosWrapper.post('/password/reset', request);
}

export const UserAPI = {
	changePassword,
	login,
	register,
	getProfile,
	sendCodeToEmail,
	resetPasswordByCode,
};
