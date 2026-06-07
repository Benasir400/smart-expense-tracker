import API from "./api";

export const getExpenses = () =>
    API.get("/expenses");

export const getUserExpenses = (email) =>
    API.get(`/expenses/user/${email}`);

export const addExpense = (data) =>
    API.post("/expenses", data);

export const deleteExpense = (id) =>
    API.delete(`/expenses/${id}`);

export const updateExpense = (id, data) =>
    API.put(`/expenses/${id}`, data);

export const getMonthlyChart = (email) =>
    API.get(`/expenses/monthly-chart/${email}`);