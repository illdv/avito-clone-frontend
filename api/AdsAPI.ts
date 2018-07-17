import { AxiosWrapper } from 'api/AxiosWrapper';

function get() {
    return AxiosWrapper.get('/ads');
}
function show(id) {
    return AxiosWrapper.get(id);
}

export const AdsAPI = {
    get, show
};
