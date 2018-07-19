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

interface IChangePasswordRequest {
    old_password: string;
    password: string;
    password_confirmation: string;
}

interface ISendCodeToEmailRequest {
    email: string;
}

interface IResetPasswordByCodeRequest {
    email: string,
    token: string,
    password: string
    password_confirmation: string
}
