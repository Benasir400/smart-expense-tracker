import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

import {
    FaUser,
    FaEnvelope,
    FaEdit,
    FaSave,
    FaSignOutAlt,
    FaPhone
} from "react-icons/fa";

function Profile() {

    const navigate = useNavigate();

    const [editing, setEditing] = useState(false);

    const [profile, setProfile] = useState({
        name: localStorage.getItem("userName") || "",
        email: localStorage.getItem("userEmail") || "",
        phone: localStorage.getItem("userPhone") || ""
    });

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {

        localStorage.setItem("userName", profile.name);
        localStorage.setItem("userPhone", profile.phone);

        alert("Profile Updated Successfully");

        setEditing(false);
    };

    const handleLogout = () => {

        localStorage.clear();

        navigate("/");
    };

    const initials =
        profile.name
            ?.split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase() || "U";

    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden p-8">

                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px]" />

                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px]" />

                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />

                <div className="relative z-10">

                    {/* Header */}
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 mb-8 shadow-lg">

                        <h1 className="text-4xl font-bold text-white">
                            My Profile
                        </h1>

                        <p className="text-slate-300 mt-2">
                            Manage your account information
                        </p>

                    </div>

                    {/* Profile Card */}
                    <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">

                        {/* Avatar */}
                        <div className="flex flex-col items-center mb-8">

                            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">

                                {initials}

                            </div>

                            <h2 className="text-2xl font-bold text-white mt-4">
                                {profile.name}
                            </h2>

                            <p className="text-slate-300">
                                Expense Tracker User
                            </p>

                        </div>

                        {/* User Info Cards */}
                        <div className="grid md:grid-cols-3 gap-4 mb-8">

                            <div className="bg-white/10 rounded-2xl p-5 text-center">

                                <FaUser className="mx-auto text-cyan-400 text-2xl mb-2" />

                                <p className="text-slate-300 text-sm">
                                    Name
                                </p>

                                <p className="text-white font-semibold">
                                    {profile.name}
                                </p>

                            </div>

                            <div className="bg-white/10 rounded-2xl p-5 text-center">

                                <FaEnvelope className="mx-auto text-green-400 text-2xl mb-2" />

                                <p className="text-slate-300 text-sm">
                                    Email
                                </p>

                                <p className="text-white font-semibold truncate">
                                    {profile.email}
                                </p>

                            </div>

                            <div className="bg-white/10 rounded-2xl p-5 text-center">

                                <FaPhone className="mx-auto text-yellow-400 text-2xl mb-2" />

                                <p className="text-slate-300 text-sm">
                                    Phone
                                </p>

                                <p className="text-white font-semibold">
                                    {profile.phone}
                                </p>

                            </div>

                        </div>

                        {/* Form */}
                        <div className="space-y-5">

                            {/* Name */}
                            <div>

                                <label className="text-slate-200 flex items-center gap-2 mb-2">

                                    <FaUser />
                                    Full Name

                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleChange}
                                    disabled={!editing}
                                    className="w-full bg-white/10 border border-white/20 text-white rounded-xl p-4 outline-none"
                                />

                            </div>

                            {/* Email */}
                            <div>

                                <label className="text-slate-200 flex items-center gap-2 mb-2">

                                    <FaEnvelope />
                                    Email Address

                                </label>

                                <input
                                    type="email"
                                    value={profile.email}
                                    disabled
                                    className="w-full bg-white/5 border border-white/10 text-slate-400 rounded-xl p-4"
                                />

                            </div>

                            {/* Phone */}
                            <div>

                                <label className="text-slate-200 flex items-center gap-2 mb-2">

                                    <FaPhone />
                                    Phone Number

                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleChange}
                                    disabled={!editing}
                                    placeholder="+91 9876543210"
                                    className="w-full bg-white/10 border border-white/20 text-white rounded-xl p-4 outline-none"
                                />

                            </div>

                        </div>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-4 mt-8">

                            {!editing ? (

                                <button
                                    onClick={() => setEditing(true)}
                                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition"
                                >
                                    <FaEdit />
                                    Edit Profile
                                </button>

                            ) : (

                                <button
                                    onClick={handleSave}
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition"
                                >
                                    <FaSave />
                                    Save Changes
                                </button>

                            )}

                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition"
                            >
                                <FaSignOutAlt />
                                Logout
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Profile;