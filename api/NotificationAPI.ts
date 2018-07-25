import { AxiosWrapper } from './AxiosWrapper';

function loading() {
	return AxiosWrapper.get('/notifications');
}

export const NotificationAPI = {
	loading,
};
