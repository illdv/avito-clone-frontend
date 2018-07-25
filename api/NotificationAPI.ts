import { AxiosWrapper } from './AxiosWrapper';

function loading() {
	return AxiosWrapper.get('/notifications');
}

function read(id: string) {
	return AxiosWrapper.put(`/notifications/${id}`, { action: 'markAsRead' });
}

export const NotificationAPI = {
	loading,
	read,
};
