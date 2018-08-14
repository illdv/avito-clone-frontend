import {AxiosInstance, AxiosPromise, AxiosRequestConfig, default as axios} from 'axios';

const instance: AxiosInstance = axios.create({
	baseURL: process.env.API_URL,
	headers: {
		'Accept-Language': 'en-US,en;q=0.9',
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
});

export class AxiosWrapper {
	public static get(apiMethod: string, urlParams: { [key: string]: string | number } = {}): AxiosPromise<any>  {
		return instance.get(apiMethod, {params: urlParams});
	}

	public static post(apiMethod: string, body: any = {}, config?: AxiosRequestConfig): AxiosPromise<any> {
		return instance.post(apiMethod, body, config);
	}

	public static put(apiMethod: string, body: any = {}, config?: AxiosRequestConfig): AxiosPromise<any> {
		return instance.put(apiMethod, body, config);
	}

	public static deleteResponse(apiMethod: string, body?: any): AxiosPromise<any> {
		return instance.delete(apiMethod, {data: body});
	}
}
