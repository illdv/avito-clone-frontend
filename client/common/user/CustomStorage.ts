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

export function synchronizeFavoritesLocalStorage(favoritesList) {
	CustomStorage.setItem('favorites_ids', JSON.stringify(favoritesList));
}

export function getFavoritesFromLocalStorage(): string[] {
	return JSON.parse(CustomStorage.getItem('favorites_ids'));
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
