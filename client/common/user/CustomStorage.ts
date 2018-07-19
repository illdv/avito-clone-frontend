const tokenKey = 'token';

function setItem(key: string, value: string) {
	localStorage.setItem(key, value);
}

function setAndRememberItem(key: string, value: string) {
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
	return setAndRememberItem(tokenKey, token);
}

function getToken() {
  return getItem(tokenKey);
}

export const CustomStorage = {
	setAndRememberItem: setItem,
  setItem,
  getItem,
  clear,
  removeItem,
  setToken,
  getToken,
};
