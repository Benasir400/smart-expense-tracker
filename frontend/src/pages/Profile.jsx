import { useState } from "react";

import { useNavigate } from "react-router-dom";
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
        <div className="relative min-h-screen overflow-hidden p-4 sm:p-5 md:p-8">
                <div className="relative z-10">

                    {/* Header */}
                    <div className="mb-5 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-lg backdrop-blur-xl sm:p-5 md:mb-8 md:rounded-3xl md:p-6">

                        <h1 className="text-2xl font-bold text-white md:text-4xl">
                            My Profile
                        </h1>

                        <p className="text-slate-300 mt-2 text-sm md:text-base">
                            Manage your account information
                        </p>

                    </div>

                    {/* Profile Card */}
                    <div className="mx-auto max-w-4xl rounded-2xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-xl sm:p-5 md:rounded-3xl md:p-8">

                        {/* Avatar */}
                        <div className="flex flex-col items-center mb-8">

                            <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white text-2xl md:text-4xl font-bold shadow-lg">

                                {initials}

                            </div>

                            <h2 className="text-xl md:text-2xl font-bold text-white mt-4 text-center">
                                {profile.name}
                            </h2>

                            <p className="text-slate-300 text-sm md:text-base">
                                Expense Tracker User
                            </p>

                        </div>

                        {/* Info Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

                            <div className="bg-white/10 rounded-2xl p-5 text-center">
                                <FaUser className="mx-auto text-cyan-400 text-2xl mb-2" />
                                <p className="text-slate-300 text-sm">Name</p>
                                <p className="text-white font-semibold break-words">
                                    {profile.name}
                                </p>
                            </div>

                            <div className="bg-white/10 rounded-2xl p-5 text-center">
                                <FaEnvelope className="mx-auto text-green-400 text-2xl mb-2" />
                                <p className="text-slate-300 text-sm">Email</p>
                                <p className="text-white font-semibold break-words">
                                    {profile.email}
                                </p>
                            </div>

                            <div className="bg-white/10 rounded-2xl p-5 text-center">
                                <FaPhone className="mx-auto text-yellow-400 text-2xl mb-2" />
                                <p className="text-slate-300 text-sm">Phone</p>
                                <p className="text-white font-semibold">
                                    {profile.phone}
                                </p>
                            </div>

                        </div>

                        {/* FORM */}
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
                                    placeholder="Enter your name"
                                    className="w-full bg-white/10 border border-white/20 text-white rounded-xl p-3 md:p-4 outline-none"
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
                                    className="w-full bg-white/5 border border-white/10 text-slate-400 rounded-xl p-3 md:p-4"
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
                                    className="w-full bg-white/10 border border-white/20 text-white rounded-xl p-3 md:p-4 outline-none"
                                />
                            </div>

                        </div>

                        {/* BUTTONS */}
                        <div className="flex flex-col md:flex-row gap-4 mt-8">

                            {!editing ? (
                                <button
                                    onClick={() => setEditing(true)}
                                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition"
                                >
                                    <FaEdit />
                                    Edit Profile
                                </button>
                            ) : (
                                <button
                                    onClick={handleSave}
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition"
                                >
                                    <FaSave />
                                    Save Changes
                                </button>
                            )}

                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition"
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
