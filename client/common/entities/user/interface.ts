interface IFavoritesItems {
	[key: number]: IAd;
}

interface IFavoritesState {
	ids: number[];
	items: IFavoritesItems;
}

interface IProfileState {
	id: number;
	name: string;
	email: string;
	phone: string;
	created_at: string;
	updated_at: string;
	count_unread_notifications?: number;
	image: IImage;
}

interface IUserState {
	notifications: INotificationState;
	favorites: IFavoritesState;
	ownedAds: IOwnedAdsState; // TODO refactor
	profile: IProfileState;
	token: string;
	isLoading: boolean;
}

// Owned ads
interface IOwnedAdsState {
	items: IAd[];
	isLoading: boolean;
}

// Notifocation
interface INotificationState {
	items: INotification[];
	noReadCount: number;
}

interface INotificationData {
	message: string;
}

interface INotification {
	id: string;
	type: string;
	notifiable_type: string;
	notifiable_id: number;
	data: INotificationData;
	read_at?: any;
	created_at: string;
	updated_at: string;
}

enum NotificationTypeStep {
	Read   = 'Read',
	NoRead = 'No read',
	All    = 'All',
}

// For saga
interface ILoginRequest {
	email: string;
	password: string;
	isRememberMe: boolean;
}

interface IRegisterRequest {
	email: string;
	name: string;
	phone: string;
	password: string;
	password_confirmation: string;
}

interface IChangeProfileRequest {
	name: string;
	email: string;
	phone: string;
	image?: any;
}

interface IChangeProfileResponse {
	id: number;
	name: string;
	email: string;
	phone: string;
	created_at: string;
	updated_at: string;
	favorites_ids: number[];
	image: IImage;
}