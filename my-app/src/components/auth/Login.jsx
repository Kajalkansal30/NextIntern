import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2, Eye, EyeOff, Info } from 'lucide-react';
import { motion } from "framer-motion";
import { Dialog } from '@headlessui/react';

// Password validation function
const validatePassword = (password) => {
    return {
        minLength: password.length >= 8,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumbers: /[0-9]/.test(password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
};

const Login = () => {
    const [input, setInput] = useState({ email: "", password: "", reconfirmPassword: "", role: "" });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    // const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    const { loading } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const passwordValidation = validatePassword(input.password);

    // Handle input change
    // const changeEventHandler = (e) => {
    //     setInput({ ...input, [e.target.name]: e.target.value });
    //     if (e.target.name === "password") {
    //         setIsTyping(e.target.value.length > 0); // Show validation hints only when typing
    //     }
    // };
    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));

        if (name === "password") {
            setIsTyping(value.length > 0);
            setPasswordMismatch(input.reconfirmPassword !== value && input.reconfirmPassword.length > 0);
        }

        // if (name === "reconfirmPassword") {
        //     setPasswordMismatch(input.password !== value);
        // }
    };

    // Toggle password visibility
    // const togglePasswordVisibility = () => {
    //     setPasswordVisible(!passwordVisible);
    // };
    const togglePasswordVisibility = () => {
        setPasswordVisible(prev => !prev);
    };

    // const toggleConfirmPasswordVisibility = () => {
    //     // setConfirmPasswordVisible(prev => !prev);
    // };

    // Form submit handler
    const submitHandler = async (e) => {
        e.preventDefault();

        if (!Object.values(passwordValidation).every(Boolean)) {
            toast.error("Password does not meet requirements!");
            return;
        }
        // if (passwordMismatch) {
        //     toast.error("Passwords do not match!");
        //     return;
        // }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            // if (res.data.success) {
            //     dispatch(setUser(res.data.user));
            //     navigate("/");
            //     toast.success(res.data.message);
            // }
            if (res.data.success) {
                const { user, step, company } = res.data;

                dispatch(setUser(user));
                localStorage.setItem('user', JSON.stringify(user));
                if (company) {
                    localStorage.setItem('company', JSON.stringify(company));
                }

                console.log("Login Response:", res.data);

                // Navigate based on step
                switch (step) {
                    case "AdminProfile1":
                        navigate('/admin/profile');
                        break;
                    case "CompanyCreate":
                        navigate('/admin/companies/create');
                        break;
                    case "CompanySetup":
                        navigate(`/admin/companies/${company?._id}`);
                        break;
                    case "PostJob":
                        navigate('/admin/jobs/create');
                        break;
                    case "AdminJobs":
                        navigate('/admin/jobs');
                        break;
                    default:
                        navigate('/');
                        break;
                }

                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong!");
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Unmet password requirements
    const unmetRequirements = Object.entries(passwordValidation)
        .filter(([_, isValid]) => !isValid)
        .map(([key]) => ({
            minLength: "At least 8 characters",
            hasUpperCase: "One uppercase letter (A-Z)",
            hasLowerCase: "One lowercase letter (a-z)",
            hasNumbers: "One number (0-9)",
            hasSpecialChar: "One special character (!@#$%^&*)"
        }[key]));

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100">
            <Navbar />
            <motion.div
                className="flex flex-col max-w-md w-full items-center bg-white shadow-lg rounded-lg p-6 my-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h1>

                <form onSubmit={submitHandler} className="space-y-5 w-full">
                    {/* Email Field */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            placeholder="Kajal@gmail.com"
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            Password
                            <button type="button" onClick={() => setIsDialogOpen(true)}>
                                <Info className="h-4 w-4 text-blue-500" />
                            </button>
                        </label>

                        <div className="relative">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                name="password"
                                value={input.password}
                                onChange={changeEventHandler}
                                placeholder="Enter your password"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                                {passwordVisible ? (
                                    <Eye className="w-5 h-5 text-gray-500" />
                                ) : (
                                    <EyeOff className="w-5 h-5 text-gray-500" />
                                )}
                            </button>
                        </div>

                        {/* Password Validation Messages */}
                        {isTyping && unmetRequirements.length > 0 && (
                            <ul className="mt-2 text-sm text-red-600">
                                {unmetRequirements.map((requirement, index) => (
                                    <li key={index}>❌ {requirement}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {/* Confirm Password Field */}
                    {/* <div>
                        <label className="text-sm font-medium">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                name="reconfirmPassword"
                                value={input.reconfirmPassword}
                                onChange={changeEventHandler}
                                placeholder="Re-enter your password"
                                className="border border-gray-300 rounded px-3 py-2 w-full"
                            />
                            <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                {confirmPasswordVisible ? <Eye className="w-5 h-5 text-gray-500" /> : <EyeOff className="w-5 h-5 text-gray-500" />}
                            </button>
                        </div>
                        {passwordMismatch && input.reconfirmPassword.length > 0 && (
                            <p className="text-sm text-red-600 mt-2">❌ Passwords do not match!</p>
                        )}
                    </div> */}

                    {/* Role Selection */}
                    <div className="flex items-center gap-4">
                        <label className="flex items-center cursor-pointer">
                            <input type="radio" name="role" value="student" checked={input.role === 'student'} onChange={changeEventHandler} className="cursor-pointer" />
                            <span>Student</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input type="radio" name="role" value="recruiter" checked={input.role === 'recruiter'} onChange={changeEventHandler} className="cursor-pointer" />
                            <span>Recruiter</span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Login"}
                    </button>

                    {/* Signup Link */}
                    <p className="text-sm text-center text-gray-600">
                        Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Signup</Link>
                    </p>
                </form>
            </motion.div>

            {/* Password Requirement Dialog */}
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-6 w-80 text-center">
                    <h2 className="text-lg font-bold">Password Requirements</h2>
                    <ul className="mt-4 text-sm text-gray-700 text-left">
                        <li>✅ At least 8 characters</li>
                        <li>✅ One uppercase letter (A-Z)</li>
                        <li>✅ One lowercase letter (a-z)</li>
                        <li>✅ One number (0-9)</li>
                        <li>✅ One special character (!@#$%^&*)</li>
                    </ul>
                    <button onClick={() => setIsDialogOpen(false)} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">OK</button>
                </div>
            </Dialog>
        </div>
    );
};

export default Login;
