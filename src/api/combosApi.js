import buildQueryParams from "../util/buildQueryParams";
import axiosClientServer from "./axiosClientServer"

const combosAPI = {
    getBanners: () => {
        return axiosClientServer.get('banner/display');
    },
    getSlider: () => {
        return axiosClientServer.get('/slider/?page=0');
    },
    getCombos: () => {
        return axiosClientServer.get('combo/?comboPage_size=6');
    },
    getComboById: ({ id, pageNumber, pageSize, sort, search, minPrice, maxPrice }) => {
        const params = {
            page: pageNumber,
            size: pageSize,
            sort: sort,
            minPrice: minPrice,
            maxPrice: maxPrice,
            search: search,
        };
        const queryParams = buildQueryParams(params);
        return axiosClientServer.get(`combo/${id}/${queryParams}`);
    },
    getProductsBySearch: ({ search, sort, pageNumber, pageSize }) => {
        return axiosClientServer.get(`product/search?productName=${search}&page=${pageNumber}&size=${pageSize}&sort=${sort}`)
    },
    getProductById: ({ id }) => {
        return axiosClientServer.get(`/product/${id}/include-categories/true`);
    }
}

export default combosAPI;