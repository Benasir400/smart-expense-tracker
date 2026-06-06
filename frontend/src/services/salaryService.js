import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL + "/salary";

export const saveSalary = (data) => {
    return axios.post(
        `${BASE_URL}/save`,
        data
    );
};

export const getSalary = (email) => {
    return axios.get(
        `${BASE_URL}/${email}`
    );
};