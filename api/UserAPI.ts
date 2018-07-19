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

export const UserAPI = {
	login,
	register,
	getProfile,
};
