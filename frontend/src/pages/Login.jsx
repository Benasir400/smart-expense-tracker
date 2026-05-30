import { useState } from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    FaEnvelope,
    FaLock,
    FaSignInAlt
} from "react-icons/fa";

import { loginUser }
from "../services/authService";

function Login() {

    const navigate =
        useNavigate();

    const [formData, setFormData] =
        useState({
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
                await loginUser(formData);

            if (response.data.token) {

                localStorage.setItem(
                    "token",
                    response.data.token
                );

                alert(
                    "Login Successful"
                );

                navigate("/dashboard");

            } else {

                alert(
                    response.data.message
                );
            }

        } catch (error) {

            console.log(error);

            alert("Login Failed");
        }
    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
            >

                <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">

                    Login

                </h2>

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
                    className="bg-blue-500 hover:bg-blue-600 text-white w-full p-3 rounded-lg flex justify-center items-center gap-2 text-lg"
                >

                    <FaSignInAlt />

                    Login

                </button>

                {/* Register Link */}
                <p className="text-center mt-6 text-gray-600">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="text-blue-500 font-semibold ml-2"
                    >
                        Register
                    </Link>

                </p>

            </form>

        </div>
    );
}

export default Login;
