import axiosClientServer from "./axiosClientServer";


const cartAPI = {
    getAll: () => {
        return axiosClientServer.get('/cart/');
    },
    add: ({ id, amount }) => {
        return axiosClientServer.post(`/cart/${id}?amount=${amount}`)
    },
    delete: ({ id }) => {
        return axiosClientServer.delete(`/cart/${id}`);
    },
    update: (data) => {
        return axiosClientServer.put('/cart/', data);
    },
    getById: ({ id }) => {
        return axiosClientServer.get(`cart/detail/${id}`);
    },
}

export default cartAPI;