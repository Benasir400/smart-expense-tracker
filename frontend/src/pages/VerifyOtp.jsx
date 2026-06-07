import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaKey, FaCheckCircle, FaRedo } from "react-icons/fa";
import { verifyOtp, forgotPassword } from "../services/authService";

function VerifyOtp() {

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    const navigate = useNavigate();

    const email = localStorage.getItem("resetEmail");

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

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await verifyOtp(email, otp);

            alert(res.data);

            navigate("/reset-password");

        } catch (error) {

            alert(
                error?.response?.data ||
                "Invalid OTP"
            );

        } finally {

            setLoading(false);
        }
    };

    const handleResend = async () => {

        try {

            await forgotPassword(email);

            alert("OTP Sent Again");

            setTimer(60);
            setCanResend(false);

        } catch {

            alert("Failed to resend OTP");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-4">

            <form className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8">

                <div className="flex justify-center mb-5">
                    <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 p-4 rounded-3xl">
                        <FaKey className="text-white text-4xl" />
                    </div>
                </div>

                <h2 className="text-center text-white text-3xl font-bold">
                    Verify OTP
                </h2>

                <p className="text-center text-cyan-400 mt-2 mb-6 break-all">
                    {email}
                </p>

                <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter OTP"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-center tracking-widest text-white outline-none mb-6"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 py-3 rounded-xl text-white font-bold"
                >
                    <FaCheckCircle className="inline mr-2" />
                    {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <div className="text-center mt-5">

                    {canResend ? (
                        <button
                            onClick={handleResend}
                            className="text-cyan-400"
                        >
                            <FaRedo className="inline mr-2" />
                            Resend OTP
                        </button>
                    ) : (
                        <p className="text-slate-300">
                            Resend OTP in
                            <span className="text-cyan-400 ml-2">
                                {timer}s
                            </span>
                        </p>
                    )}

                </div>

            </form>

        </div>
    );
}

export default VerifyOtp;