import axios from "axios";

const SUPPLIERS_API_BASE_URL = "/api/suppliers";

const SupplierService = {
    getAllSuppliers: (params) => {
        const queryString = params?.query ? `?query=${params.query}` : '';
        return axios.get(`${SUPPLIERS_API_BASE_URL}/${queryString}`);
    }
};

export default SupplierService;