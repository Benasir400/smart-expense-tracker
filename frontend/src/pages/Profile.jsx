import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FaUser, FaEnvelope, FaEdit, FaSave, FaSignOutAlt, FaPhone, FaMoneyBillWave } from "react-icons/fa";

function Profile() {

    const navigate = useNavigate();
    const [editing, setEditing] = useState(false);

    const [profile, setProfile] = useState({
        name: localStorage.getItem("userName") || "",
        email: localStorage.getItem("userEmail") || "",
        phone: localStorage.getItem("userPhone") || "",
        salary: localStorage.getItem("salary") || ""
    });

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        localStorage.setItem("userName", profile.name);
        localStorage.setItem("userEmail", profile.email);
        localStorage.setItem("userPhone", profile.phone);
        localStorage.setItem("salary", profile.salary);

        alert("Profile Updated Successfully");
        setEditing(false);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-[#0b1f3a] to-[#142a4f]">

            <Sidebar />

            <div className="flex-1 p-10">

                {/* Heading */}
                <div className="mb-8 text-white">
                    <h1 className="text-4xl font-bold">My Profile</h1>
                    <p className="text-gray-300 mt-2">Manage your account details</p>
                </div>

                {/* Card */}
                <div className="bg-white max-w-3xl mx-auto rounded-2xl shadow-2xl p-8">

                    {/* Avatar */}
                    <div className="flex justify-center mb-6">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            className="w-28 h-28 rounded-full border-4 border-[#0b1f3a]"
                            alt="profile"
                        />
                    </div>

                    {/* Name */}
                    <div className="mb-4">
                        <label className="flex items-center gap-2 font-semibold text-[#0b1f3a]">
                            <FaUser /> Name
                        </label>
                        <input
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            disabled={!editing}
                            className="w-full border p-3 rounded-lg mt-2 focus:border-[#0b1f3a] outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="flex items-center gap-2 font-semibold text-[#0b1f3a]">
                            <FaEnvelope /> Email
                        </label>
                        <input
                            name="email"
                            value={profile.email}
                            disabled
                            className="w-full border p-3 rounded-lg mt-2 bg-gray-100"
                        />
                    </div>

                    {/* Phone */}
                    <div className="mb-4">
                        <label className="flex items-center gap-2 font-semibold text-[#0b1f3a]">
                            <FaPhone /> Phone
                        </label>
                        <input
                            name="phone"
                            value={profile.phone}
                            onChange={handleChange}
                            disabled={!editing}
                            className="w-full border p-3 rounded-lg mt-2 focus:border-[#0b1f3a] outline-none"
                        />
                    </div>

                    {/* Salary */}
                    <div className="mb-6">
                        <label className="flex items-center gap-2 font-semibold text-[#0b1f3a]">
                            <FaMoneyBillWave /> Salary
                        </label>
                        <input
                            name="salary"
                            value={profile.salary}
                            onChange={handleChange}
                            disabled={!editing}
                            className="w-full border p-3 rounded-lg mt-2 focus:border-[#0b1f3a] outline-none"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4">

                        {!editing ? (
                            <button
                                onClick={() => setEditing(true)}
                                className="bg-[#0b1f3a] hover:bg-[#142a4f] text-white px-6 py-3 rounded-lg flex items-center gap-2"
                            >
                                <FaEdit />
                                Edit Profile
                            </button>
                        ) : (
                            <button
                                onClick={handleSave}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
                            >
                                <FaSave />
                                Save
                            </button>
                        )}

                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg flex items-center gap-2"
                        >
                            <FaSignOutAlt />
                            Logout
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Profile;