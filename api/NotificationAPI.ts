import { AxiosWrapper } from './AxiosWrapper';

function loading() {
	return AxiosWrapper.get('/notifications');
}

function read(id: string) {
	return AxiosWrapper.put(`/notifications/${id}`);
}

export const NotificationAPI = {
	loading,
	read,
};
