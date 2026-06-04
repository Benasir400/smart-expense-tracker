import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaLock,
    FaUserPlus,
    FaWallet,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";
import { registerUser } from "../services/authService";
function Register() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
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

            const response = await registerUser(formData);

            alert(response.data);

            navigate("/");

        } catch (error) {

            console.log(error);
            alert("Registration Failed");

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden px-4">

            {/* Glow Effects */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-[150px]" />

            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[150px]" />

            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />

            {/* Floating Dots */}
            <div className="absolute top-20 left-20 w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>

            <div className="absolute bottom-24 right-24 w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>

            <div className="absolute top-1/3 right-32 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>

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

                    <h2 className="text-center text-white text-3xl font-bold mb-2">
                        Create Account
                    </h2>

                    <p className="text-center text-slate-300 mb-8">
                        Join ExpenseTracker Pro today
                    </p>

                    {/* Name */}
                    <div className="mb-4">

                        <div className="flex items-center bg-white/10 border border-white/20 rounded-2xl px-4 py-4">

                            <FaUser className="text-slate-400 mr-3" />

                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-transparent outline-none text-white placeholder-slate-400"
                                required
                            />

                        </div>

                    </div>

                    {/* Email */}
                    <div className="mb-4">

                        <div className="flex items-center bg-white/10 border border-white/20 rounded-2xl px-4 py-4">

                            <FaEnvelope className="text-slate-400 mr-3" />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-transparent outline-none text-white placeholder-slate-400"
                                required
                            />

                        </div>

                    </div>

                    {/* Phone */}
                    <div className="mb-4">

                        <div className="flex items-center bg-white/10 border border-white/20 rounded-2xl px-4 py-4">

                            <FaPhone className="text-slate-400 mr-3" />

                            <span className="text-slate-300 mr-2">
                                +91
                            </span>

                            <input
                                type="tel"
                                name="phone"
                                placeholder="9876543210"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full bg-transparent outline-none text-white placeholder-slate-400"
                                required
                            />

                        </div>

                    </div>

                    {/* Password */}
                    <div className="mb-2">

                        <div className="flex items-center bg-white/10 border border-white/20 rounded-2xl px-4 py-4">

                            <FaLock className="text-slate-400 mr-3" />

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Create Password"
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
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>

                        </div>

                    </div>

                    {/* Password Strength */}
                    <div className="mb-6">

                        <div className="w-full bg-white/10 rounded-full h-2">

                            <div
                                className={`h-2 rounded-full ${
                                    formData.password.length < 4
                                        ? "bg-red-500 w-1/4"
                                        : formData.password.length < 8
                                        ? "bg-yellow-500 w-2/4"
                                        : "bg-green-500 w-full"
                                }`}
                            ></div>

                        </div>

                        <p className="text-xs text-slate-400 mt-2">
                            Password should contain at least 8 characters
                        </p>

                    </div>

                    {/* Register Button */}
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
                        justify-center
                        items-center
                        gap-3
                        hover:scale-[1.02]
                        hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]
                        transition-all
                        duration-300
                        "
                    >

                        <FaUserPlus />

                        Create Account

                    </button>

                    {/* Footer */}
                    <p className="text-center text-slate-300 mt-6">

                        Already have an account?

                        <Link
                            to="/"
                            className="ml-2 text-cyan-400 font-semibold hover:text-cyan-300"
                        >
                            Login
                        </Link>

                    </p>

                </form>

            </div>

        </div>

    );

}

export default Register;