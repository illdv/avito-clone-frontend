interface IChangePasswordRequest {
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

interface IGetProfileResponse extends IProfileState {
	favorites_ids: number[];
}

interface IAuthResponse { // Login and Register
	token: string;
	token_type: string;
	expires_in: number;
	user: IGetProfileResponse;
}
