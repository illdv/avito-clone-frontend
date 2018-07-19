const tokenKey = 'token';

function setAndRememberItem(key: string, value: string) {
	localStorage.setItem(key, value);
}

function setItem(key: string, value: string) {
	sessionStorage.setItem(key, value);
}

function getItem(key: string) {
	return localStorage.getItem(key) || sessionStorage.getItem(key);
}

function clear() {
	sessionStorage.clear();
	localStorage.clear();
}

function removeItem(key: string) {
	sessionStorage.removeItem(key);
	localStorage.removeItem(key);
}

function setToken(token: string) {
	return setItem(tokenKey, token);
}

function setAndRememberToken(token: string) {
	return setAndRememberItem(tokenKey, token);
}

function getToken() {
	return getItem(tokenKey);
}

export const CustomStorage = {
	setAndRememberItem,
	setItem,
	getItem,
	clear,
	removeItem,
	setToken,
	setAndRememberToken,
	getToken,
};
