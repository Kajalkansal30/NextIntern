import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Eye, EyeOff, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';


const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // let errors = [];
    // if (password.length < minLength) errors.push('At least 8 characters');
    // if (!hasUpperCase) errors.push('One uppercase letter (A-Z)');
    // if (!hasLowerCase) errors.push('One lowercase letter (a-z)');
    // if (!hasNumbers) errors.push('One number (0-9)');
    // if (!hasSpecialChar) errors.push('One special character (!@#$%^&* etc.)');

    // return errors.length ? errors : null;
    return {
        minLength: password.length >= minLength,
        hasUpperCase,
        hasLowerCase,
        hasNumbers,
        hasSpecialChar
    };
};


const Signup = () => {
    const [input, setInput] = useState({ firstname: '', lastname: '', email: '', phoneNumber: '', password: '', reconfirmPassword: '', role: '', image: null });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(store => store.auth);
    const passwordValidation = validatePassword(input.password);

    // const changeEventHandler = (e) => {
    //     setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
    //     if (e.target.name === "password") {
    //         setIsTyping(e.target.value.length > 0); // Only show validation after user types
    //     }
    // };
    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));

        if (name === "password") {
            setIsTyping(value.length > 0);
            setPasswordMismatch(input.reconfirmPassword !== value && input.reconfirmPassword.length > 0);
        }

        if (name === "reconfirmPassword") {
            setPasswordMismatch(input.password !== value);
        }
    };

    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
        // Skip the file here
        if (key !== "image" && value) formData.append(key, value);
    });

    // Append the image with correct multer field name
    if (input.image) {
        formData.append("image", input.image); // ✔️ This matches multer field
    }
    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                toast.error("Only image files are allowed.");
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                toast.error("Image size should be less than 2MB.");
                return;
            }

            // ✅ Update field name to 'image' to match multer
            setInput(prev => ({ ...prev, image: file }));
        }
    };



    const togglePasswordVisibility = () => {
        setPasswordVisible(prev => !prev);
    };
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(prev => !prev);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!Object.values(passwordValidation).every(Boolean)) {
            toast.error("Password does not meet requirements!");
            return;
        }
        if (passwordMismatch) {
            toast.error("Passwords do not match!");
            return;
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            dispatch(setLoading(false));
        }
    };
    const unmetRequirements = Object.entries(passwordValidation)
        .filter(([_, isValid]) => !isValid)
        .map(([key]) => {
            switch (key) {
                case "minLength":
                    return "At least 8 characters";
                case "hasUpperCase":
                    return "One uppercase letter (A-Z)";
                case "hasLowerCase":
                    return "One lowercase letter (a-z)";
                case "hasNumbers":
                    return "One number (0-9)";
                case "hasSpecialChar":
                    return "One special character (!@#$%^&*)";
                default:
                    return "";
            }
        });

    return (
        <motion.div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}>
            <Navbar />
            <motion.div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 my-10"
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}>
                <h1 className="text-3xl font-semibold text-center mb-5">Sign Up</h1>
                <form onSubmit={submitHandler} className="space-y-4">
                    {['firstname', 'lastname', 'email', 'phoneNumber'].map(field => (
                        <div key={field}>
                            <label className="text-sm font-medium capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                            <input type={field === 'email' ? 'email' : 'text'} name={field} value={input[field]} onChange={changeEventHandler}
                                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring focus:border-blue-500" />
                        </div>
                    ))}
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
                    <div>
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
                    </div>
                    <div className="flex items-center gap-4">
                        {['student', 'recruiter'].map(role => (
                            <label key={role} className="flex items-center space-x-2">
                                <input type="radio" name="role" value={role} checked={input.role === role} onChange={changeEventHandler} className="cursor-pointer" />
                                <span className="capitalize">{role}</span>
                            </label>
                        ))}
                    </div>
                    {/* <div>
                        <label className="text-sm font-medium">Profile Picture</label>
                        <input type="file" accept="image/*" onChange={changeFileHandler} className="cursor-pointer border rounded-md p-2 w-full" />
                    </div> */}
                    <div>
                        <label className="text-sm font-medium">Profile Picture</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={changeFileHandler}
                            className="cursor-pointer border rounded-md p-2 w-full"
                        />
                    </div>

                    <motion.button type="submit" className="w-full bg-[#5ce1e6] hover:bg-[#49b8bf] text-white py-2 rounded-md font-semibold"
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} disabled={loading}>
                        {loading ? 'Please wait...' : 'Signup'}
                    </motion.button>
                    <p className="text-sm text-center">Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link></p>
                </form>
            </motion.div>
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

        </motion.div>
    );
};

export default Signup;