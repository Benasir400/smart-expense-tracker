import axios from "axios";

const BASE_URL = "http://localhost:8080/salary";

export const saveSalary = (data) => {
    return axios.post(`${BASE_URL}/save`, data);
};

export const getSalary = (userId) => {
    return axios.get(`${BASE_URL}/${userId}`);
};