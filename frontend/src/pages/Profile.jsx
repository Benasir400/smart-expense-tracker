import { useState } from "react";

import Sidebar from "../components/Sidebar";

import {
    FaUser,
    FaEnvelope,
    FaMoneyBillWave,
    FaEdit,
    FaSave
} from "react-icons/fa";

function Profile() {

    const [editing, setEditing] =
        useState(false);

    const [profile, setProfile] =
        useState({

            name:
                localStorage.getItem(
                    "userName"
                ) || "",

            email:
                localStorage.getItem(
                    "userEmail"
                ) || "",

            phone:
                localStorage.getItem(
                    "userPhone"
                ) || "",

            salary:
                localStorage.getItem(
                    "salary"
                ) || ""
        });

    // Handle Change
    const handleChange = (e) => {

        setProfile({

            ...profile,

            [e.target.name]:
                e.target.value
        });
    };

    // Save Profile
    const handleSave = () => {

        localStorage.setItem(
            "userName",
            profile.name
        );

        localStorage.setItem(
            "userEmail",
            profile.email
        );

        localStorage.setItem(
            "userPhone",
            profile.phone
        );

        localStorage.setItem(
            "salary",
            profile.salary
        );

        alert(
            "Profile Updated Successfully"
        );

        setEditing(false);
    };

    return (

        <div className="flex">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 min-h-screen bg-gray-100 p-8">

                {/* Heading */}
                <div className="mb-8">

                    <h1 className="text-4xl font-bold">

                        My Profile

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Manage your account details

                    </p>

                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl">

                    {/* Profile Image */}
                    <div className="flex justify-center mb-8">

                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            alt="profile"
                            className="w-32 h-32 rounded-full border-4 border-blue-500"
                        />

                    </div>

                    {/* Name */}
                    <div className="mb-5">

                        <label className="font-semibold flex items-center gap-2 mb-2">

                            <FaUser />

                            Name

                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Your Name"
                            value={profile.name}
                            onChange={handleChange}
                            disabled={!editing}
                            className="w-full border p-3 rounded-lg"
                        />

                    </div>

                    {/* Email */}
                    <div className="mb-5">

                        <label className="font-semibold flex items-center gap-2 mb-2">

                            <FaEnvelope />

                            Email

                        </label>

                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            disabled
                            className="w-full border p-3 rounded-lg bg-gray-100"
                        />

                    </div>

        

                    {/* Salary */}
                    <div className="mb-8">

                        <label className="font-semibold flex items-center gap-2 mb-2">

                            <FaMoneyBillWave />

                            Monthly Salary

                        </label>

                        <input
                            type="number"
                            name="salary"
                            placeholder="Enter Monthly Salary"
                            value={profile.salary}
                            onChange={handleChange}
                            disabled={!editing}
                            className="w-full border p-3 rounded-lg"
                        />

                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4">

                        {!editing ? (

                            <button
                                onClick={() =>
                                    setEditing(true)
                                }
                                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2"
                            >

                                <FaEdit />

                                Edit Profile

                            </button>

                        ) : (

                            <button
                                onClick={handleSave}
                                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2"
                            >

                                <FaSave />

                                Save Profile

                            </button>

                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Profile;