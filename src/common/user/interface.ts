interface IUser {

}

interface ILoginRequest {
  login: string;
  password: string;
}

interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
