import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaCheckCircle } from "react-icons/fa";
import { resetPassword } from "../services/authService";

function ResetPassword() {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const email = localStorage.getItem("resetEmail");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {

            setLoading(true);

            const res = await resetPassword(
                email,
                password
            );

            alert(res.data);

            localStorage.removeItem("resetEmail");

            navigate("/");

        } catch (error) {

            alert(
                error?.response?.data ||
                "Reset Failed"
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-4">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8"
            >

                <div className="flex justify-center mb-5">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-3xl">
                        <FaLock className="text-white text-4xl" />
                    </div>
                </div>

                <h2 className="text-center text-white text-3xl font-bold">
                    Reset Password
                </h2>

                <p className="text-center text-slate-300 mt-2 mb-6">
                    Create a new password
                </p>

                <input
                    type="password"
                    placeholder="New Password"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white outline-none mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white outline-none mb-6"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 py-3 rounded-xl text-white font-bold"
                >
                    <FaCheckCircle className="inline mr-2" />
                    {loading ? "Resetting..." : "Reset Password"}
                </button>

            </form>

        </div>
    );
}

export default ResetPassword;