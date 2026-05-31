import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import { loginUser } from "../services/authService";

function Login() {

    const navigate = useNavigate();

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1f3a] to-[#142a4f]">

            <form onSubmit={handleSubmit}
                className="bg-white w-full max-w-md p-10 rounded-2xl shadow-2xl">

                <h2 className="text-3xl font-bold text-center text-[#0b1f3a] mb-8">
                    Welcome Back
                </h2>

                {/* Email */}
                <div className="flex items-center border border-gray-300 rounded-lg p-3 mb-5 focus-within:border-[#0b1f3a]">
                    <FaEnvelope className="text-[#0b1f3a] mr-2" />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full outline-none"
                        required
                    />
                </div>

                {/* Password */}
                <div className="flex items-center border border-gray-300 rounded-lg p-3 mb-6 focus-within:border-[#0b1f3a]">
                    <FaLock className="text-[#0b1f3a] mr-2" />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full outline-none"
                        required
                    />
                </div>

                {/* Button */}
                <button
                    className="w-full bg-[#0b1f3a] hover:bg-[#142a4f] text-white py-3 rounded-lg flex justify-center items-center gap-2 font-semibold transition"
                >
                    <FaSignInAlt />
                    Login
                </button>

                {/* Footer */}
                <p className="text-center mt-6 text-gray-600">
                    Don’t have an account?
                    <Link to="/register" className="text-[#0b1f3a] font-semibold ml-2">
                        Register
                    </Link>
                </p>

            </form>

        </div>
    );
}

export default Login;