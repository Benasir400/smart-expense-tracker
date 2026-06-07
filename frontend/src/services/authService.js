import API from "./api";

// Register
export const registerUser = (data) => API.post("/auth/register", data);

// Login
export const loginUser = (data) => API.post("/auth/login", data);

// Forgot Password
export const forgotPassword = (email) =>
  API.post("/auth/forgot-password", {
    email,
  });

// Verify OTP
export const verifyOtp = (email, otp) =>
  API.post("/auth/verify-otp", {
    email,
    otp,
  });

// Reset Password
export const resetPassword = (email, newPassword) =>
  API.post("/auth/reset-password", {
    email,
    newPassword,
  });
