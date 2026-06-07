import API from "./api";

export const saveSalary = (data) =>
    API.post("/salary/save", data);

export const getSalary = (email) =>
    API.get(`/salary/${email}`);