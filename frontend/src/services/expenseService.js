import axios from "axios";

const API_URL =
    "https://smart-expense-tracker-api-v898.onrender.com/expenses";

// Get All Expenses
export const getExpenses =
    async () => {

        return await axios.get(
            API_URL
        );
    };

// Get User Expenses
export const getUserExpenses =
    async (email) => {

        return await axios.get(
            `${API_URL}/user/${email}`
        );
    };

// Add Expense
export const addExpense =
    async (expense) => {

        return await axios.post(
            API_URL,
            expense
        );
    };

// Delete Expense
export const deleteExpense =
    async (id) => {

        return await axios.delete(
            `${API_URL}/${id}`
        );
    };

// Update Expense
export const updateExpense =
    async (id, expense) => {

        return await axios.put(
            `${API_URL}/${id}`,
            expense
        );
    };
