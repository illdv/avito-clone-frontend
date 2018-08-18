import { AxiosWrapper } from './AxiosWrapper';
import {AxiosPromise} from 'axios';

export class UserAPI {
	public static login(loginRequest): AxiosPromise<any> {
		return AxiosWrapper.post('/login', loginRequest);
	}

	public static getProfile() {
		return AxiosWrapper.get('/profile');
	}

	public static changePassword(request: IChangePasswordRequest): AxiosPromise<any> {
		return AxiosWrapper.put('/change-password', request);
	}

	public static changeProfile({ image,  ...data }: IChangeProfileRequest): AxiosPromise<any> {
		const formData = new FormData();

		if (image) {
			formData.append('image', image);
		}

		Object.entries(data).forEach(([key, value]) => {
			formData.append(key, value);
		});

		formData.append('_method', 'put');

		return AxiosWrapper.post('/profile', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
	}

	public static register(registerRequest): AxiosPromise<any> {
		return AxiosWrapper.post('/register', { ...registerRequest });
	}

	public static sendCodeToEmail(request: ISendCodeToEmailRequest): AxiosPromise<any> {
		return AxiosWrapper.post('/password/email', request);
	}

	public static resetPasswordByCode(request: IResetPasswordByCodeRequest): AxiosPromise<any> {
		return AxiosWrapper.post('/password/reset', request);
	}

	public static deleteAccount(): AxiosPromise<any> {
		return AxiosWrapper.deleteResponse('/profile');
	}
}
