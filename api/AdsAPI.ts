import { AxiosWrapper } from './AxiosWrapper';

function get() {
    return AxiosWrapper.get('/ads');
}

export const AdsAPI = {
    get,
};
