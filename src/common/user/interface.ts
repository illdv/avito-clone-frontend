interface IUser {
  email: string;
  token: string;
}

interface ILoginRequest {
  email: string;
  password: string;
}

interface IRegisterRequest {
  email: string;
  telephone: string;
  password: string;
  password_confirmation: string;
}
