import { AxiosWrapper } from 'api/AxiosWrapper';
function get() {
    return AxiosWrapper.get('/ads');
}
export const AdsAPI = {
    get,
};
//# sourceMappingURL=AdsAPI.js.map