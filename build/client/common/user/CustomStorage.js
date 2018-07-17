const tokenKey = 'token';
function setAndRememberItem(key, value) {
    localStorage.setItem(key, value);
}
function setItem(key, value) {
    sessionStorage.setItem(key, value);
}
function getItem(key) {
    return sessionStorage.getItem(key) || localStorage.getItem(key);
}
function clear() {
    sessionStorage.clear();
    localStorage.clear();
}
function removeItem(key) {
    sessionStorage.removeItem(key);
    localStorage.removeItem(key);
}
function setToken(key) {
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
//# sourceMappingURL=CustomStorage.js.map