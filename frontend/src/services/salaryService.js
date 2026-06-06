import axios from "axios";

const BASE_URL = "https://smart-expense-tracker-api-v898.onrender.com/salary";

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