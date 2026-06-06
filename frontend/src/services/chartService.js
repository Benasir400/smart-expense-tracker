import axios from "axios";

const API_URL = "https://smart-expense-tracker-api-v898.onrender.com/expenses";

export const getMonthlyChart = async (email) => {
    return await axios.get(
        `${API_URL}/monthly-chart/${email}`
    );
};