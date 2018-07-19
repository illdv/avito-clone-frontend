interface IUser {
	email: string;
	token: string;
}

interface ILoginRequest {
	email: string;
	password: string;
	isRememberMe: boolean;
}

interface IRegisterRequest {
	email: string;
	phone: string;
	password: string;
	password_confirmation: string;
}
