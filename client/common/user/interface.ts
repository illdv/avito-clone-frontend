interface IUser {
	id: number;
	name: string;
	email: string;
	phone: string;
	created_at: string;
	updated_at: string;
	token: string;
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

interface ISendCodeToEmailRequest {
	email: string;
}

interface IResetPasswordByCodeRequest {
	email: string;
	token: string;
	password: string;
	password_confirmation: string;
}