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

        if (!password || password.length < 8) {
            alert("Password must be at least 8 characters");
            return;
        }

        try {

            setLoading(true);

            await axios.post("http://localhost:8080/auth/reset-password", {
                email,
                newPassword: password
            });

            alert("Password Reset Successful");

            navigate("/");

        } catch (err) {

            console.log(err);

            alert(
                err?.response?.data ||
                "Error resetting password"
            );

        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden px-4">

            {/* Glow Background */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[150px]" />

            <div className="relative z-10 w-full max-w-md">

                <form
                    onSubmit={handleSubmit}
                    className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.4)] p-8"
                >

                    {/* Icon */}
                    <div className="flex justify-center mb-5">
                        <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 p-5 rounded-3xl shadow-lg">
                            <FaKey className="text-white text-4xl" />
                        </div>
                    </div>

                    {/* Heading */}
                    <h2 className="text-center text-white text-3xl font-bold mb-2">
                        Reset Password
                    </h2>

                    <p className="text-center text-slate-300 mb-8">
                        Create a new strong password
                    </p>

                    {/* Password Input */}
                    <div className="mb-6">

                        <div className="flex items-center bg-white/10 border border-white/20 rounded-2xl px-4 py-4 focus-within:border-cyan-400 transition">

                            <FaLock className="text-slate-400 mr-3" />

                            <input
                                type="password"
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent outline-none text-white placeholder-slate-400"
                                required
                            />

                        </div>

                    </div>

                    {/* Password Strength */}
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
                            ></div>

                        </div>

                        <p className="text-xs text-slate-400 mt-2">
                            Use at least 8 characters for strong password
                        </p>

                    </div>

                    {/* Submit Button */}
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
                            py-4
                            rounded-2xl
                            font-bold
                            flex
                            items-center
                            justify-center
                            gap-3
                            hover:scale-[1.02]
                            hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]
                            transition-all
                            duration-300
                            disabled:opacity-50
                        "
                    >

                        <FaCheckCircle />

                        {loading ? "Resetting..." : "Reset Password"}

                    </button>

                    {/* Back to login */}
                    <div className="text-center mt-6">

                        <span
                            onClick={() => navigate("/")}
                            className="text-cyan-400 hover:text-cyan-300 cursor-pointer font-medium"
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