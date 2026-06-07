import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    FaEnvelope,
    FaArrowLeft,
    FaPaperPlane,
    FaWallet
} from "react-icons/fa";

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await axios.post("${import.meta.env.VITE_API_URL}/auth/forgot-password", {
                email
            });

            alert("OTP sent to your email");

            navigate("/verify-otp", { state: { email } });

        } catch (error) {

            console.log(error);

            alert(
                error?.response?.data ||
                "Failed to send OTP"
            );

        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden px-4">

            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-72 md:w-96 h-72 md:h-96 bg-cyan-500/20 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 right-0 w-72 md:w-96 h-72 md:h-96 bg-purple-500/20 rounded-full blur-[150px]" />
            <div className="absolute top-1/2 left-1/2 w-64 md:w-80 h-64 md:h-80 bg-blue-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />

            <div className="relative z-10 w-full max-w-sm md:max-w-md">

                <form
                    onSubmit={handleSubmit}
                    className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl md:rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.4)] p-6 md:p-8"
                >

                    {/* Logo */}
                    <div className="flex justify-center mb-5">
                        <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 p-4 md:p-5 rounded-3xl shadow-lg">
                            <FaWallet className="text-white text-3xl md:text-4xl" />
                        </div>
                    </div>

                    {/* Heading */}
                    <h2 className="text-center text-white text-2xl md:text-3xl font-bold mb-2">
                        Forgot Password?
                    </h2>

                    <p className="text-center text-slate-300 mb-6 md:mb-8 text-sm md:text-base">
                        Enter your email and we will send OTP
                    </p>

                    {/* Email */}
                    <div className="mb-6">

                        <label className="block text-slate-200 text-sm font-medium mb-2">
                            Email Address
                        </label>

                        <div className="flex items-center bg-white/10 border border-white/20 rounded-xl md:rounded-2xl px-3 md:px-4 py-3 md:py-4 focus-within:border-cyan-400 transition">

                            <FaEnvelope className="text-slate-400 mr-3" />

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent outline-none text-white placeholder-slate-400 text-sm md:text-base"
                                required
                            />

                        </div>

                    </div>

                    {/* Send Button */}
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
                        py-3 md:py-4
                        rounded-xl md:rounded-2xl
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
                        text-sm md:text-base
                        "
                    >

                        <FaPaperPlane />

                        {loading ? "Sending OTP..." : "Send OTP"}

                    </button>

                    {/* Back To Login */}
                    <div className="text-center mt-5 md:mt-6">

                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium text-sm md:text-base"
                        >
                            <FaArrowLeft />
                            Back to Login
                        </Link>

                    </div>

                </form>

            </div>

        </div>

    );
}

export default ForgotPassword;