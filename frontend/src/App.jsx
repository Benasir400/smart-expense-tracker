import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";

import AddExpense from "./pages/AddExpense";

import ExpenseList from "./components/ExpenseList";

import DashboardCards from "./components/DashboardCards";

import ExpensePieChart from "./components/ExpensePieChart";

import MonthlyBarChart from "./components/MonthlyBarChart";

import ProtectedRoute from "./components/ProtectedRoute";
import BudgetAlert from "./components/BudgetAlert";
function App() {

    return (

        <Routes>

            {/* Login */}
            <Route
                path="/"
                element={<Login />}
            />

            {/* Register */}
            <Route
                path="/register"
                element={<Register />}
            />

            {/* Protected Dashboard */}
            <Route
                path="/dashboard"
                element={

                    <ProtectedRoute>

                        <div className="bg-gray-100 min-h-screen">

                            <Dashboard />

                            <DashboardCards />
                            <BudgetAlert />

                            <ExpensePieChart />

                            <MonthlyBarChart />

                            <AddExpense />

                            <ExpenseList />

                        </div>

                    </ProtectedRoute>
                }
            />

        </Routes>
    );
}

export default App;