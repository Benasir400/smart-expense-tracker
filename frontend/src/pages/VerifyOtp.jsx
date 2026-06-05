import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
    FaKey,
    FaCheckCircle,
    FaRedo
} from "react-icons/fa";

function VerifyOtp() {

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    // ⏱ timer state
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;

    // 🔥 countdown timer logic
    useEffect(() => {

        if (timer === 0) {
            setCanResend(true);
            return;
        }

        const interval = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);

    }, [timer]);

    // verify OTP
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await axios.post("http://localhost:8080/auth/verify-otp", {
                email,
                otp
            });

            alert("OTP Verified Successfully");

            navigate("/reset-password", { state: { email } });

        } catch (err) {
            alert(err?.response?.data || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    // 🔁 resend OTP
    const handleResend = async () => {

        try {

            await axios.post("http://localhost:8080/auth/forgot-password", {
                email
            });

            alert("OTP Resent Successfully");

            // reset timer
            setTimer(60);
            setCanResend(false);

        } catch (err) {
            alert("Failed to resend OTP");
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-4">

            <div className="w-full max-w-md">

                <form
                    onSubmit={handleSubmit}
                    className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-[32px] shadow-[0_20px_80px_rgba(0,0,0,0.4)] p-8"
                >

                    {/* Icon */}
                    <div className="flex justify-center mb-5">
                        <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 p-5 rounded-3xl shadow-lg">
                            <FaKey className="text-white text-4xl" />
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-center text-white text-3xl font-bold mb-2">
                        Verify OTP
                    </h2>

                    <p className="text-center text-slate-300 mb-1">
                        OTP sent to
                    </p>

                    <p className="text-center text-cyan-400 mb-6 font-semibold">
                        {email}
                    </p>

                    {/* OTP input */}
                    <input
                        type="text"
                        maxLength={6}
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full mb-6 px-4 py-4 rounded-2xl bg-white/10 border border-white/20 text-white text-center tracking-widest text-lg outline-none"
                        required
                    />

                    {/* Verify button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        <FaCheckCircle />
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>

                    {/* Timer + Resend */}
                    <div className="text-center mt-6 text-slate-300">

                        {canResend ? (
                            <button
                                type="button"
                                onClick={handleResend}
                                className="flex items-center justify-center gap-2 text-cyan-400 hover:text-cyan-300 mx-auto"
                            >
                                <FaRedo />
                                Resend OTP
                            </button>
                        ) : (
                            <p>
                                Resend OTP in{" "}
                                <span className="text-cyan-400 font-bold">
                                    {timer}s
                                </span>
                            </p>
                        )}

                    </div>

                </form>

            </div>

        </div>
    );
}

export default VerifyOtp;