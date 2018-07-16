const tokenKey = 'token';

function setAndRememberItem(key: string, value: string) {
  localStorage.setItem(key, value);
}

function setItem(key: string, value: string) {
  sessionStorage.setItem(key, value);
}

function getItem(key: string) {
  return sessionStorage.getItem(key) || localStorage.getItem(key);
}

function clear() {
  sessionStorage.clear();
  localStorage.clear();
}

function removeItem(key: string) {
  sessionStorage.removeItem(key);
  localStorage.removeItem(key);
}

function setToken(key: string) {
  return setItem(key, tokenKey);
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
  getToken,
};
