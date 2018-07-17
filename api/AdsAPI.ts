import { AxiosWrapper } from 'api/AxiosWrapper';

function get() {
    return AxiosWrapper.get('/ads');
}

export const AdsAPI = {
    get,
};
