import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaEnvelope,
    FaLock,
    FaSignInAlt,
    FaWallet,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";
import { loginUser } from "../services/authService";

function Login() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await loginUser(formData);

            if (response.data.token) {

                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userEmail", response.data.email);
                localStorage.setItem("userName", response.data.name);
                localStorage.setItem("userPhone", response.data.phone);

                alert("Login Successful");

                navigate("/dashboard");

            } else {

                alert(response.data.message);

            }

        } catch (error) {

            console.log(error);
            alert("Login Failed");

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden px-4">

            {/* Background Glow Effects */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-[150px]" />

            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[150px]" />

            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />

            {/* Floating Dots */}
            <div className="absolute top-20 left-20 w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>

            <div className="absolute bottom-24 right-24 w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>

            <div className="absolute top-1/3 right-32 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md">

                <form
                    onSubmit={handleSubmit}
                    className="
                    backdrop-blur-xl
                    bg-white/10
                    border border-white/20
                    rounded-[32px]
                    shadow-[0_20px_80px_rgba(0,0,0,0.4)]
                    p-8
                    "
                >

                    {/* Logo */}
                    <div className="flex justify-center mb-5">

                        <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 p-5 rounded-3xl shadow-lg">

                            <FaWallet className="text-white text-4xl" />

                        </div>

                    </div>

                    {/* Brand */}
                    <h2 className="text-center text-white text-2xl font-bold mb-2">
                        ExpenseTracker Pro
                    </h2>

                    <p className="text-center text-slate-300 mb-8">
                        Welcome back! Login to continue
                    </p>

                   

                    {/* Email */}
                    <div className="mb-5">

                        <label className="block text-slate-200 text-sm font-medium mb-2">
                            Email Address
                        </label>

                        <div className="flex items-center bg-white/10 border border-white/20 rounded-2xl px-4 py-4 focus-within:border-cyan-400 transition">

                            <FaEnvelope className="text-slate-400 mr-3" />

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-transparent outline-none text-white placeholder-slate-400"
                                required
                            />

                        </div>

                    </div>

                    {/* Password */}
                    <div className="mb-4">

                        <label className="block text-slate-200 text-sm font-medium mb-2">
                            Password
                        </label>

                        <div className="flex items-center bg-white/10 border border-white/20 rounded-2xl px-4 py-4 focus-within:border-cyan-400 transition">

                            <FaLock className="text-slate-400 mr-3" />

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-transparent outline-none text-white placeholder-slate-400"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-slate-400 hover:text-cyan-400"
                            >

                                {
                                    showPassword
                                        ? <FaEyeSlash />
                                        : <FaEye />
                                }

                            </button>

                        </div>

                    </div>

                   {/* Forgot Password */}
<div className="flex justify-end mb-6">

    <Link
        to="/forgot-password"
        className="text-cyan-400 text-sm hover:text-cyan-300 transition"
    >
        Forgot Password?
    </Link>

</div>

                    {/* Login Button */}
                    <button
                        type="submit"
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
                        "
                    >

                        <FaSignInAlt />

                        Login

                    </button>

                    {/* Divider */}
                    <div className="flex items-center my-6">

                        <div className="flex-1 border-t border-white/20"></div>

                        <span className="px-3 text-slate-400 text-sm">
                            OR
                        </span>

                        <div className="flex-1 border-t border-white/20"></div>

                    </div>

                    {/* Register */}
                    <p className="text-center text-slate-300">

                        Don't have an account?

                        <Link
                            to="/register"
                            className="ml-2 font-semibold text-cyan-400 hover:text-cyan-300"
                        >
                            Register
                        </Link>

                    </p>

                </form>

            </div>

        </div>

    );

}

export default Login;