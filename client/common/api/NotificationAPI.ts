import {AxiosWrapper} from './AxiosWrapper';

function loading() {
	return AxiosWrapper.get('/notifications');
}

function read(ids: string[]) {
	const promiseRead = ids.map(id => AxiosWrapper.put(`/notifications/${id}`, {action: 'markAsRead'}));
	return Promise.all(promiseRead);
}

export const NotificationAPI = {
	loading,
	read,
};
