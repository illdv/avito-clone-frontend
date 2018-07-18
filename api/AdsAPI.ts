import { AxiosWrapper } from 'api/AxiosWrapper';

function get() {
    return AxiosWrapper.get('/ads');
}
function show(id) {
    return AxiosWrapper.get('/ads/'+id);
}

export const AdsAPI = {
    get, show
};
