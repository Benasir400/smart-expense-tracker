import {
    Routes,
    Route
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import ExpenseHistory from "./pages/ExpenseHistory";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
function App() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/dashboard"
                element={<Dashboard />}
            />

            <Route
                path="/add-expense"
                element={<AddExpense />}
            />
            
            <Route
                path="/history"
                element={<ExpenseHistory />}
            />

            <Route
                path="/reports"
                element={<Reports />}
            />
            <Route
                path="/forgot-password"
                element={<ForgotPassword />}
            />
            <Route
                path="/verify-otp" 
                element={<VerifyOtp/>} 
            />
            <Route
                path="/reset-password"
                element={<ResetPassword />}
            />

            <Route
                path="/profile"
                element={<Profile />}
            />

        </Routes>
    );
}

export default App;
