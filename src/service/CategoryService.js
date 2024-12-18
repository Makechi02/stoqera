import axios from "axios";

const CATEGORIES_API_BASE_URL = "/api/categories";

const CategoryService = {
    getAllCategories: (params) => {
        const queryString = params?.query ? `?query=${params.query}` : '';
        return axios.get(`${CATEGORIES_API_BASE_URL}/${queryString}`);
    }
};

export default CategoryService;