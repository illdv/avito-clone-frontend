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
	telephone: string;
	password: string;
	password_confirmation: string;
}

interface IChangePasswordRequest {
    old_password: string;
    password: string;
    password_confirmation: string;
}
