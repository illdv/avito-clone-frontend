interface IChangePasswordRequest {
	old_password: string;
	password: string;
	password_confirmation: string;
}

interface IChangeProfileRequest {
	old_password: string;
	password: string;
	password_confirmation: string;
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
	favorites_ids: number[];
}

interface IGetProfileResponse extends IUserProfile {
	favorites_ids: number[];
}

interface IAuthResponse { // Login and Register
	token: string;
	token_type: string;
	expires_in: number;
	user: IGetProfileResponse;
}

interface IPostFavoritesRequest extends IFavoritesRequest {}
interface IDeleteFavoritesRequest extends IFavoritesRequest {}