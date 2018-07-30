export interface IUser {
	id: number;
	name: string;
	email: string;
	phone: string;
	created_at: string;
	updated_at: string;
	token: string;
	favorites_ids: any[];
	image: IImage;
}

export interface IImage {
	id: string;
	imageable_type: string;
	imageable_id: number;
	file_name: string;
	file: string;
	created_at: string;
	updated_at: string;
	file_url: string;
}

export interface ILoginRequest {
	email: string;
	password: string;
	isRememberMe: boolean;
}

export interface ILoginResponse {
	token: string;
	token_type: string;
	expires_in: number;
	user: IUser;
}

export interface IRegisterRequest {
	email: string;
	name: string;
	phone: string;
	password: string;
	password_confirmation: string;
}

export interface IChangePasswordRequest {
	old_password: string;
	password: string;
	password_confirmation: string;
}

export interface IChangeProfileRequest {
	name: string;
	email: string;
	phone: string;
	image?: any;
}

export interface IChangeProfileResponse {
	id: number;
	name: string;
	email: string;
	phone: string;
	created_at: string;
	updated_at: string;
	favorites_ids: number[];
	image: IImage;
}

export interface ISendCodeToEmailRequest {
	email: string;
}

export interface IResetPasswordByCodeRequest {
	email: string;
	token: string;
	password: string;
	password_confirmation: string;
}
export interface IFavoritesRequest {
	favorites_ids: string[];
}
export interface IPostFavoritesRequest extends IFavoritesRequest{
}
export interface IDeleteFavoritesRequest extends IFavoritesRequest{
}