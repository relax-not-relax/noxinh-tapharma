import axiosClientServer from "./axiosClientServer";

const orderAPI = {
    add: (data) => {
        return axiosClientServer.post('/order/', data);
    },
    get: ({ pageNumber, pageSize }) => {
        return axiosClientServer.get(`/order/user?page=${pageNumber}&size=${pageSize}&sort=id,desc`);
    },
    getById: ({ id }) => {
        return axiosClientServer.get(`/order/${id}`);
    }
}

export default orderAPI;