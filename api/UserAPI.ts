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

function getFavorites(request: IFavoritesRequest) {
	const ids = request.favorites_ids;
	if (ids) {
		const list = [];
		ids.forEach(id => {
			const template = `favorites_ids[]=${ id }`;
			list.push(template);
		});
		const string = list.join('&');
		console.log('string', string);
		return AxiosWrapper.get(`/favorites?${string}`);
	}

}

function postFavorites(request: IPostFavoritesRequest) {
	return AxiosWrapper.post('/favorites', request);
}

function deleteFavorites(request: IDeleteFavoritesRequest) {
	return AxiosWrapper.deleteResponse('/favorites', request);
}

export const UserAPI = {
	changePassword,
	login,
	register,
	getProfile,
	sendCodeToEmail,
	resetPasswordByCode,
	postFavorites,
	deleteFavorites,
	getFavorites,
};
