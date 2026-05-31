import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaUserPlus } from "react-icons/fa";
import { registerUser } from "../services/authService";

function Register() {

    const navigate = useNavigate();

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1f3a] to-[#142a4f]">

            <form onSubmit={handleSubmit}
                className="bg-white w-full max-w-md p-10 rounded-2xl shadow-2xl">

                <h2 className="text-3xl font-bold text-center text-[#0b1f3a] mb-8">
                    Create Account
                </h2>

                {/* Name */}
                <input
                    name="name"
                    placeholder="Full Name"
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-4 focus:border-[#0b1f3a] outline-none"
                    required
                />

                {/* Email */}
                <input
                    name="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-4 focus:border-[#0b1f3a] outline-none"
                    required
                />

                {/* Phone */}
                <input
                    name="phone"
                    placeholder="Phone Number"
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-4 focus:border-[#0b1f3a] outline-none"
                    required
                />

                {/* Password */}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-6 focus:border-[#0b1f3a] outline-none"
                    required
                />

                {/* Button */}
                <button
                    className="w-full bg-[#0b1f3a] hover:bg-[#142a4f] text-white py-3 rounded-lg flex justify-center items-center gap-2 font-semibold"
                >
                    <FaUserPlus />
                    Register
                </button>

                {/* Footer */}
                <p className="text-center mt-6 text-gray-600">
                    Already have an account?
                    <Link to="/" className="text-[#0b1f3a] font-semibold ml-2">
                        Login
                    </Link>
                </p>

            </form>

        </div>
    );
}

export default Register;