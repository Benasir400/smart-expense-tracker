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

    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;

    useEffect(() => {
        if (timer === 0) {
            return;
        }

        const interval = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);

    }, [timer]);

    const canResendOtp = timer === 0 || canResend;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await axios.post(`${import.meta.env.VITE_API_URL}/auth/verify-otp`, {
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

    const handleResend = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, {
                email
            });

            alert("OTP Resent Successfully");

            setTimer(60);
            setCanResend(false);

        } catch {
            alert("Failed to resend OTP");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-4">

            {/* Card wrapper */}
            <div className="w-full flex justify-center">

                <form
                    onSubmit={handleSubmit}
                    className="
                        w-full
                        max-w-sm
                        sm:max-w-md
                        md:max-w-lg
                        backdrop-blur-xl
                        bg-white/10
                        border border-white/20
                        rounded-[24px]
                        sm:rounded-[32px]
                        shadow-[0_20px_80px_rgba(0,0,0,0.4)]
                        p-5
                        sm:p-8
                    "
                >

                    {/* Icon */}
                    <div className="flex justify-center mb-5">
                        <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-lg">
                            <FaKey className="text-white text-3xl sm:text-4xl" />
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-center text-white text-2xl sm:text-3xl font-bold mb-2">
                        Verify OTP
                    </h2>

                    <p className="text-center text-slate-300 text-sm sm:text-base mb-1">
                        OTP sent to
                    </p>

                    <p className="text-center text-cyan-400 mb-6 font-semibold text-sm sm:text-base break-all">
                        {email}
                    </p>

                    {/* OTP Input */}
                    <input
                        type="text"
                        maxLength={6}
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="
                            w-full
                            mb-6
                            px-3 sm:px-4
                            py-3 sm:py-4
                            rounded-xl sm:rounded-2xl
                            bg-white/10
                            border border-white/20
                            text-white
                            text-center
                            tracking-widest
                            text-base sm:text-lg
                            outline-none
                        "
                        required
                    />

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            bg-gradient-to-r
                            from-cyan-500
                            via-blue-500
                            to-purple-600
                            text-white
                            py-3 sm:py-4
                            rounded-xl sm:rounded-2xl
                            font-bold
                            flex
                            items-center
                            justify-center
                            gap-2
                            hover:scale-[1.02]
                            transition-all
                            duration-300
                            disabled:opacity-50
                            text-sm sm:text-base
                        "
                    >
                        <FaCheckCircle />
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>

                    {/* Timer / Resend */}
                    <div className="text-center mt-6 text-slate-300 text-sm sm:text-base">

                        {canResendOtp ? (
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
