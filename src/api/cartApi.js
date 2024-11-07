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
    }
}

export default cartAPI;