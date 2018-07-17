import { AxiosWrapper } from 'api/AxiosWrapper';

function login(loginRequest: ILoginRequest) {
  return AxiosWrapper.post('/login', loginRequest);
}

function register(registerRequest: IRegisterRequest) {
  return AxiosWrapper.post('/register', {...registerRequest, name: '123123132'});
}

export const UserAPI = {
  login,
  register,
};
