// import { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//     FaEnvelope,
//     FaArrowLeft,
//     FaPaperPlane,
//     FaWallet
// } from "react-icons/fa";

// function ForgotPassword() {

//     const [email, setEmail] = useState("");

//     const handleSubmit = (e) => {

//         e.preventDefault();

//         // API Call Here
//         alert(`Password reset link sent to ${email}`);

//     };

//     return (

//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden px-4">

//             {/* Background Effects */}
//             <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-[150px]" />

//             <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[150px]" />

//             <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />

//             {/* Floating Dots */}
//             <div className="absolute top-20 left-20 w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>

//             <div className="absolute bottom-24 right-24 w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>

//             <div className="absolute top-1/3 right-32 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>

//             <div className="relative z-10 w-full max-w-md">

//                 <form
//                     onSubmit={handleSubmit}
//                     className="
//                     backdrop-blur-xl
//                     bg-white/10
//                     border border-white/20
//                     rounded-[32px]
//                     shadow-[0_20px_80px_rgba(0,0,0,0.4)]
//                     p-8
//                     "
//                 >

//                     {/* Logo */}
//                     <div className="flex justify-center mb-5">

//                         <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 p-5 rounded-3xl shadow-lg">

//                             <FaWallet className="text-white text-4xl" />

//                         </div>

//                     </div>

//                     {/* Heading */}
//                     <h2 className="text-center text-white text-3xl font-bold mb-2">
//                         Forgot Password?
//                     </h2>

//                     <p className="text-center text-slate-300 mb-8">
//                         Enter your email address and we'll send you a password reset link.
//                     </p>

//                     {/* Email */}
//                     <div className="mb-6">

//                         <label className="block text-slate-200 text-sm font-medium mb-2">
//                             Email Address
//                         </label>

//                         <div className="flex items-center bg-white/10 border border-white/20 rounded-2xl px-4 py-4 focus-within:border-cyan-400 transition">

//                             <FaEnvelope className="text-slate-400 mr-3" />

//                             <input
//                                 type="email"
//                                 placeholder="Enter your email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 className="w-full bg-transparent outline-none text-white placeholder-slate-400"
//                                 required
//                             />

//                         </div>

//                     </div>

//                     {/* Send Button */}
//                     <button
//                         type="submit"
//                         className="
//                         w-full
//                         bg-gradient-to-r
//                         from-cyan-500
//                         via-blue-500
//                         to-purple-600
//                         text-white
//                         py-4
//                         rounded-2xl
//                         font-bold
//                         flex
//                         items-center
//                         justify-center
//                         gap-3
//                         hover:scale-[1.02]
//                         hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]
//                         transition-all
//                         duration-300
//                         "
//                     >

//                         <FaPaperPlane />

//                         Send Reset Link

//                     </button>

//                     {/* Back To Login */}
//                     <div className="text-center mt-6">

//                         <Link
//                             to="/"
//                             className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium"
//                         >

//                             <FaArrowLeft />

//                             Back to Login

//                         </Link>

//                     </div>

//                 </form>

//             </div>

//         </div>

//     );

// }

// export default ForgotPassword;