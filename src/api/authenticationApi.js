import axiosClientServer from "./axiosClientServer"

const authenticationAPI = {
    register: (data) => {
        return axiosClientServer.post('auth/register', data);
    },
    login: (data) => {
        return axiosClientServer.post('auth/login', data);
    },
    getAccount: () => {
        return axiosClientServer.get('account/profile');
    },
    logout: () => {
        return axiosClientServer.post('account/logout', {}, { useAltToken: true });
    }
}

export default authenticationAPI;