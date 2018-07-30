interface IUserFavorites {
	ids: number[];
	items: IAd[];
}

interface IUserProfile {
	id: number;
	name: string;
	email: string;
	phone: string;
	created_at: string;
	updated_at: string;
	image: IImage;
}

interface IUser {
	favorites: IUserFavorites;
	ownedAds: IAd[];
	profile: IUserProfile;
	token: string;
	isLoading: boolean;
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