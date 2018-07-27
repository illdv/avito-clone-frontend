interface IUser {
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

interface IImage {
	id: string;
	imageable_type: string;
	imageable_id: number;
	file_name: string;
	file: string;
	created_at: string;
	updated_at: string;
	file_url: string;
}

interface ILoginRequest {
	email: string;
	password: string;
	isRememberMe: boolean;
}

interface ILoginResponse {
	token: string;
	token_type: string;
	expires_in: number;
	user: IUser;
}

interface IRegisterRequest {
	email: string;
	name: string;
	phone: string;
	password: string;
	password_confirmation: string;
}

interface IChangePasswordRequest {
	old_password: string;
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

interface ISendCodeToEmailRequest {
	email: string;
}

interface IResetPasswordByCodeRequest {
	email: string;
	token: string;
	password: string;
	password_confirmation: string;
}
interface IFavoritesRequest {
	favorites_ids: string[];
}
interface IPostFavoritesRequest extends IFavoritesRequest{
}
interface IDeleteFavoritesRequest extends IFavoritesRequest{
}