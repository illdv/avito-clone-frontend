export interface IData {
	message: string;
}

export interface INotification {
	id: string;
	type: string;
	notifiable_type: string;
	notifiable_id: number;
	data: IData;
	read_at?: any;
	created_at: string;
	updated_at: string;
}