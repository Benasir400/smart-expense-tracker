import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaWallet,
  FaSignInAlt
} from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
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
      await axios.post("https://smart-expense-tracker-api-v898.onrender.com/auth/register", formData);

      alert("Registration Successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error?.response?.data || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[150px]" />
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md mx-auto">

        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.4)] p-6 md:p-8"
        >

          {/* Logo */}
          <div className="flex justify-center mb-5">
            <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 p-5 rounded-3xl shadow-lg">
              <FaWallet className="text-white text-4xl" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-center text-white text-2xl md:text-3xl font-bold mb-2">
            Create Account
          </h2>

          <p className="text-center text-slate-300 mb-6 md:mb-8">
            Register to start tracking expenses
          </p>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-slate-200 text-sm mb-2">
              Full Name
            </label>

            <div className="flex items-center bg-white/10 border border-white/20 rounded-2xl px-4 py-3 md:py-4">
              <FaUser className="text-slate-400 mr-3" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full bg-transparent outline-none text-white placeholder-slate-400"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-slate-200 text-sm mb-2">
              Email Address
            </label>

            <div className="flex items-center bg-white/10 border border-white/20 rounded-2xl px-4 py-3 md:py-4">
              <FaEnvelope className="text-slate-400 mr-3" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none text-white placeholder-slate-400"
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-slate-200 text-sm mb-2">
              Phone Number
            </label>

            <div className="flex items-center bg-white/10 border border-white/20 rounded-2xl px-4 py-3 md:py-4">
              <FaPhone className="text-slate-400 mr-3" />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full bg-transparent outline-none text-white placeholder-slate-400"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-slate-200 text-sm mb-2">
              Password
            </label>

            <div className="flex items-center bg-white/10 border border-white/20 rounded-2xl px-4 py-3 md:py-4">
              <FaLock className="text-slate-400 mr-3" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full bg-transparent outline-none text-white placeholder-slate-400"
                required
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white py-3 md:py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition"
          >
            <FaSignInAlt />
            Register
          </button>

          {/* Login Link */}
          <p className="text-center text-slate-300 mt-6 text-sm md:text-base">
            Already have an account?
            <Link to="/" className="ml-2 text-cyan-400 hover:text-cyan-300">
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Register;