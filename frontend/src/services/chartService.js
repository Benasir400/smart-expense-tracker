import axios from "axios";

const API_URL =
  "http://localhost:8080/expenses";

export const getMonthlyChart = async (
  email
) => {

  const response =
    await axios.get(
      `${API_URL}/monthly-chart/${email}`
    );

  return response.data;
};