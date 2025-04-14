import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import store from '@/redux/store';
import useGetCompanyById from '@/hooks/useGetCompanyById';
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        practioner: false, // Default value for checkbox
        city: "",
        industry: "",
        employeeNumber: "",
        reqDoc: false, // Default value for checkbox
        logo: null,
        verifiedDoc: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setInput({ ...input, [name]: checked });
        } else if (name === "employeeNumber") {
            setInput({ ...input, [name]: value }); // Cast to number
        } else {
            setInput({ ...input, [name]: value });
        }
    };
    // if (!input.name || !input.description || !input.city || !input.industry) {
    //     return toast.error("Please fill all required fields.");
    // }


    // const changeFileHandler = (e) => {
    //     const { name, files } = e.target;
    //     const file = files?.[0];

    //     if (name === "verifiedDoc") {
    //         setInput({ ...input, verifiedDoc: file });
    //     } else if (name === "logo") {
    //         setInput({ ...input, logo: file });
    //     }
    // };
    const changeFileHandler = (e) => {
        const { name, files } = e.target;
        const file = files?.[0];

        if (name === "verifiedDoc") {
            setInput({ ...input, verifiedDoc: file });
        } else if (name === "logo") {
            setInput({ ...input, logo: file });
        }
    };


    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("practioner", input.practioner);
        formData.append("city", input.city);
        formData.append("industry", input.industry);
        formData.append("employeeNumber", input.employeeNumber);
        formData.append("reqDoc", input.reqDoc);
        formData.append("pdf", input.verifiedDoc);  // Must match backend fieldname
        formData.append("image", input.logo);       // Must match backend fieldname
        // if (input.verifiedDoc) {
        //     formData.append("verifiedDoc", input.verifiedDoc);
        // }
        // if (input.logo) {
        //     formData.append("logo", input.logo);
        // }

        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            practioner: singleCompany.practioner || false,
            reqDoc: singleCompany.reqDoc || false,
            employeeNumber: singleCompany.employeeNumber || "",
            logo: null,          // Files must be set manually via file input
            verifiedDoc: null    // Same here
            // logo: singleCompany.logo || null,
            // verifiedDoc: singleCompany.verifiedDoc || null
        });
    }, [singleCompany]);

    return (
        <div className="flex flex-col justify-center items-center">
            <Navbar />

            {/* Stepper Navigation */}
            <div className="flex justify-center items-center my-6 space-x-8">
                {[
                    { label: "Personal Details", route: "", active: true },
                    { label: "Organization Details", route: "", active: false },
                ].map((step, index, arr) => (
                    <React.Fragment key={index}>
                        <div
                            className={`flex items-center cursor-pointer group transition-all duration-300`}
                            onClick={() => navigate(step.route)}
                        >
                            <div
                                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300 
            ${step.active
                                        ? "border-blue-600 bg-blue-100 text-blue-600"
                                        : "border-gray-300 bg-white text-gray-400 group-hover:border-blue-300 group-hover:text-blue-400"
                                    }`}
                            >
                                {index + 1}
                            </div>
                            <span
                                className={`ml-3 text-base font-medium transition-colors duration-300 
            ${step.active ? "text-blue-600" : "text-gray-500 group-hover:text-blue-500"}`}
                            >
                                {step.label}
                            </span>
                        </div>

                        {/* Separator */}
                        {index < arr.length - 1 && (
                            <div className="w-10 md:w-16 h-1 bg-gray-300 mx-2 rounded"></div>
                        )}
                    </React.Fragment>
                ))}
            </div>


            <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl border border-gray-200">
                <h2 className="text-3xl font-semibold mb-6 text-gray-800">Company Details</h2>

                {/* Independent Practitioner Checkbox */}
                <label className="flex items-center gap-3 mb-6">
                    <input
                        type="checkbox"
                        checked={input.practioner}
                        name="practioner"
                        onChange={changeEventHandler}
                        className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="text-gray-700">I am an independent practitioner (freelancer, architect, lawyer, etc.)</span>
                </label>

                {/* Organization Name */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">Company Name</label>
                    <input
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={changeEventHandler}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Organization Description */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">Company Description</label>
                    <textarea
                        value={input.description}
                        onChange={changeEventHandler}
                        name="description"
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Organization City */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">Company City</label>
                    <input
                        type="text"
                        placeholder="e.g. Mumbai"
                        name="city"
                        value={input.city}
                        onChange={changeEventHandler}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Industry Selection */}

                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">Industry</label>
                    <select
                        name="industry"
                        value={input.industry}
                        onChange={changeEventHandler}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select industry</option>
                        <option value="IT">IT</option>
                        <option value="Finance">Finance</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                        <option value="Others">Others</option>
                    </select>
                </div>


                {/* Number of Employees */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">No. of Employees</label>
                    <select
                        name="employeeNumber"
                        value={input.employeeNumber}
                        onChange={changeEventHandler}
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select an option</option>
                        <option value="1-10">1-10</option>
                        <option value="11-50">11-50</option>
                        <option value="51-200">51-200</option>
                        <option value="200+">200+</option>
                    </select>
                </div>
                {/* Organization Logo Upload */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">Company Logo (Recommended)</label>
                    <input
                        type="file"
                        name="logo"
                        accept="image/jpeg, image/jpg, image/png, image/gif, image/bmp, image/*"
                        onChange={changeFileHandler}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                    />
                    <small className="text-gray-500">Max file size: 1MB, Max resolution: 500x500</small>
                </div>

                {/* Official Documents Upload */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">Upload Official Document</label>
                    <input
                        type="file"
                        name="verifiedDoc"
                        accept="application/pdf, image/jpeg, image/png"
                        onChange={changeFileHandler}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>


                {/* Organization Logo Upload
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">Company Logo (Recommended)</label>
                    <input
                        type="file"
                        accept="image/jpeg, image/jpg, image/png, image/gif, image/bmp image/*"
                        onChange={changeFileHandler}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                    />
                    <small className="text-gray-500">Max file size: 1MB, Max resolution: 500x500</small>
                </div>

                {/* Official Documents Upload */}
                {/* <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">Upload Official Document</label>
                    <input
                        type="file"
                        accept="application/pdf, image/jpeg, image/png"
                        onChange={changeFileHandler}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                    />
                </div> */}

                {/* View Accepted Documents Link */}
                <p className="text-blue-600 hover:underline cursor-pointer mb-6">
                    View the list of documents accepted here
                </p>

                {/* No Documents Checkbox */}
                <label className="flex items-center gap-3 mb-6">
                    <input
                        type="checkbox"
                        checked={input.reqDoc}
                        name="reqDoc"
                        onChange={changeEventHandler}
                        className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="text-gray-700">I do not have the required documents</span>
                </label>

                <div className="mt-8">
                    {loading ? (
                        <motion.button
                            className="w-full flex items-center justify-center bg-gray-400 text-white py-3 rounded-lg cursor-not-allowed"
                        >
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please Wait
                        </motion.button>
                    ) : (
                        <button
                            onClick={submitHandler}
                            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompanySetup;
