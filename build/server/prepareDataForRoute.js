import axios from 'axios/index';
const prepareAds = async (path, params) => {
    const instance = axios.create({
        baseURL: process.env.API_URL,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });
    const axiosData = await instance.get('/ads');
    return axiosData.data.data;
};
export default {
    ads: prepareAds,
};
//# sourceMappingURL=prepareDataForRoute.js.map