import axios from 'axios';
const instance = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});
function get(apiMethod, urlParams = {}) {
    return instance.get(apiMethod, { params: urlParams });
}
function post(apiMethod, body = {}) {
    return instance.post(apiMethod, body);
}
function put(apiMethod, body = {}) {
    return instance.put(apiMethod, body);
}
function deleteResponse(apiMethod, body) {
    return instance.delete(apiMethod, { data: body });
}
export const AxiosWrapper = {
    get,
    post,
    put,
    deleteResponse,
};
//# sourceMappingURL=AxiosWrapper.js.map