interface IUser {
  email: string;
  token: string;
}

interface ILoginRequest {
  email: string;
  password: string;
}

interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
