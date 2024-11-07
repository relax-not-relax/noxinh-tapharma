import axiosClientServer from "./axiosClientServer"

const addressAPI = {
    getProvince: () => {
        return axiosClientServer.get('/address/province');
    },
    getDistrict: (provinceId) => {
        return axiosClientServer.get(`/address/district/${provinceId}`);
    },
    getWard: (districtId) => {
        return axiosClientServer.get(`/address/ward/${districtId}`);
    },
}

export default addressAPI;