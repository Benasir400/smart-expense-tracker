import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import {
    FaLock,
    FaKey,
    FaCheckCircle
} from "react-icons/fa";

function ResetPassword() {

    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            alert("Email missing. Please try again from forgot password.");
            navigate("/");
            return;
        }

        if (!password || password.length < 8) {
            alert("Password must be at least 8 characters");
            return;
        }

        try {
            setLoading(true);

            await axios.post(
                "http://localhost:8080/auth/reset-password",
                {
                    email,
                    newPassword: password
                }
            );

            alert("Password Reset Successful");
            navigate("/");

        } catch (err) {
            console.log(err);
            alert(err?.response?.data || "Error resetting password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden px-4">

            {/* Background */}
            <div className="absolute top-0 left-0 w-72 md:w-96 h-72 md:h-96 bg-cyan-500/20 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 right-0 w-72 md:w-96 h-72 md:h-96 bg-purple-500/20 rounded-full blur-[150px]" />

            {/* Card Wrapper */}
            <div className="relative z-10 w-full flex justify-center">

                <form
                    onSubmit={handleSubmit}
                    className="
                        w-full
                        max-w-sm
                        sm:max-w-md
                        md:max-w-lg
                        backdrop-blur-xl
                        bg-white/10
                        border border-white/20
                        rounded-[24px]
                        sm:rounded-[32px]
                        shadow-[0_20px_80px_rgba(0,0,0,0.4)]
                        p-5
                        sm:p-8
                    "
                >

                    {/* Icon */}
                    <div className="flex justify-center mb-5">
                        <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-lg">
                            <FaKey className="text-white text-3xl sm:text-4xl" />
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-center text-white text-2xl sm:text-3xl font-bold mb-2">
                        Reset Password
                    </h2>

                    <p className="text-center text-slate-300 mb-6 sm:mb-8 text-sm sm:text-base">
                        Create a new strong password
                    </p>

                    {/* Input */}
                    <div className="mb-6">
                        <label className="block text-slate-200 text-sm mb-2">
                            New Password
                        </label>

                        <div className="flex items-center bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-3 sm:py-4 focus-within:border-cyan-400 transition">

                            <FaLock className="text-slate-400 mr-2 sm:mr-3 text-sm sm:text-base" />

                            <input
                                type="password"
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent outline-none text-white placeholder-slate-400 text-sm sm:text-base"
                                required
                            />
                        </div>
                    </div>

                    {/* Strength Bar */}
                    <div className="mb-6">
                        <div className="w-full bg-white/10 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    password.length < 4
                                        ? "bg-red-500 w-1/4"
                                        : password.length < 8
                                        ? "bg-yellow-500 w-2/4"
                                        : "bg-green-500 w-full"
                                }`}
                            />
                        </div>

                        <p className="text-xs text-slate-400 mt-2">
                            Minimum 8 characters recommended
                        </p>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            bg-gradient-to-r
                            from-cyan-500
                            via-blue-500
                            to-purple-600
                            text-white
                            py-3 sm:py-4
                            rounded-xl sm:rounded-2xl
                            font-bold
                            flex
                            items-center
                            justify-center
                            gap-2 sm:gap-3
                            hover:scale-[1.02]
                            transition-all
                            duration-300
                            disabled:opacity-50
                            text-sm sm:text-base
                        "
                    >
                        <FaCheckCircle />
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>

                    {/* Back */}
                    <div className="text-center mt-5 sm:mt-6">
                        <span
                            onClick={() => navigate("/")}
                            className="text-cyan-400 hover:text-cyan-300 cursor-pointer font-medium text-sm sm:text-base"
                        >
                            ← Back to Login
                        </span>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default ResetPassword;