import { useState } from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaUserPlus
} from "react-icons/fa";

import { registerUser }
from "../services/authService";

function Register() {

    const navigate =
        useNavigate();

    const [formData, setFormData] =
        useState({
            name: "",
            email: "",
            password: ""
        });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response =
                await registerUser(formData);

            alert(response.data);

            navigate("/");

        } catch (error) {

            console.log(error);

            alert(
                "Registration Failed"
            );
        }
    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-green-500 to-blue-600 p-4">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
            >

                <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">

                    Register

                </h2>

                {/* Name */}
                <div className="flex items-center border rounded-lg p-3 mb-5">

                    <FaUser className="text-gray-500 mr-3" />

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="outline-none w-full"
                        required
                    />

                </div>

                {/* Email */}
                <div className="flex items-center border rounded-lg p-3 mb-5">

                    <FaEnvelope className="text-gray-500 mr-3" />

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="outline-none w-full"
                        required
                    />

                </div>

                {/* Password */}
                <div className="flex items-center border rounded-lg p-3 mb-6">

                    <FaLock className="text-gray-500 mr-3" />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="outline-none w-full"
                        required
                    />

                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white w-full p-3 rounded-lg flex justify-center items-center gap-2 text-lg"
                >

                    <FaUserPlus />

                    Register

                </button>

                {/* Login Link */}
                <p className="text-center mt-6 text-gray-600">

                    Already have an account?

                    <Link
                        to="/"
                        className="text-blue-500 font-semibold ml-2"
                    >
                        Login
                    </Link>

                </p>

            </form>

        </div>
    );
}

export default Register;
