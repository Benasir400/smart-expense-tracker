// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { FaEnvelope, FaArrowLeft, FaPaperPlane, FaWallet } from "react-icons/fa";
// import { forgotPassword } from "../services/authService";

// function ForgotPassword() {

//     const [email, setEmail] = useState("");
//     const [loading, setLoading] = useState(false);

//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         try {

//             setLoading(true);

//             const res = await forgotPassword(email);

//             alert(res.data);

//             localStorage.setItem("resetEmail", email);

//             navigate("/verify-otp");

//         } catch (error) {

//             alert(
//                 error?.response?.data ||
//                 error?.message ||
//                 "Failed to send OTP"
//             );

//         } finally {

//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-4">

//             <form
//                 onSubmit={handleSubmit}
//                 className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 w-full max-w-md shadow-[0_20px_80px_rgba(0,0,0,0.4)]"
//             >

//                 <div className="flex justify-center mb-5">
//                     <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 p-4 rounded-3xl">
//                         <FaWallet className="text-white text-4xl" />
//                     </div>
//                 </div>

//                 <h2 className="text-center text-white text-3xl font-bold">
//                     Forgot Password
//                 </h2>

//                 <p className="text-center text-slate-300 mt-2 mb-6">
//                     Enter your registered email
//                 </p>

//                 <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4 py-3 mb-6">
//                     <FaEnvelope className="text-slate-400 mr-3" />

//                     <input
//                         type="email"
//                         placeholder="Email Address"
//                         className="w-full bg-transparent text-white outline-none"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </div>

//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white py-3 rounded-xl font-bold hover:scale-[1.02] transition-all duration-300"
//                 >
//                     <FaPaperPlane className="inline mr-2" />
//                     {loading ? "Sending..." : "Send OTP"}
//                 </button>

//                 <div className="text-center mt-5">
//                     <Link
//                         to="/"
//                         className="text-cyan-400 flex items-center justify-center gap-2"
//                     >
//                         <FaArrowLeft />
//                         Back to Login
//                     </Link>
//                 </div>

//             </form>

//         </div>
//     );
// }

// export default ForgotPassword;