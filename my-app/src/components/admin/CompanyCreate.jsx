// import React, { useState } from 'react';
// import Navbar from '../shared/Navbar';
// import { Label } from '@radix-ui/react-label';
// import { Input } from '../ui/input';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { COMPANY_API_END_POINT } from '@/utils/constant';
// import { toast } from 'sonner';
// import { useDispatch } from 'react-redux';
// import { setSingleCompany } from '@/redux/companySlice';
// import { motion } from "framer-motion";

// const pageVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
// };

// const CompanyCreate = () => {
//     const navigate = useNavigate();
//     const [companyName, setCompanyName] = useState('');
//     const dispatch = useDispatch();

//     const registerNewCompany = async () => {
//         try {
//             const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 withCredentials: true
//             });
//             if (res?.data?.success) {
//                 dispatch(setSingleCompany(res.data.company));
//                 toast.success(res.data.message);
//                 const companyId = res?.data?.company?._id;
//                 navigate(`/admin/companies/${companyId}`);
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error("Failed to register company. Please try again.");
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100">
//             <Navbar />
//             <div className="flex justify-center items-center min-h-[80vh]">
//                 <motion.div
//                     variants={pageVariants}
//                     initial="hidden"
//                     animate="visible"
//                     className="max-w-2xl w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-200"
//                 >
//                     <div className="text-center">
//                         <h3 className="font-bold text-3xl text-gray-800">Your Company Name</h3>
//                         <p className="text-gray-500 text-md mt-2">
//                             What would you like to name your company? You can change this later.
//                         </p>
//                     </div>

//                     <div className="mt-6">
//                         <Label className="text-gray-700 text-md font-medium">Company Name</Label>
//                         <Input
//                             type="text"
//                             className="mt-3 w-full p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition-all"
//                             placeholder="JobHunt, Microsoft, etc."
//                             value={companyName}
//                             onChange={(e) => setCompanyName(e.target.value)}
//                         />
//                     </div>

//                     <div className="flex items-center justify-center gap-6 mt-10">
//                         <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="px-6 py-3 border border-gray-400 rounded-lg text-gray-600 hover:bg-gray-200 transition-all"
//                             onClick={() => navigate("/admin/companies")}
//                         >
//                             Cancel
//                         </motion.button>

//                         <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="px-6 py-3 bg-[#5ce1e6] text-white font-semibold rounded-lg hover:bg-[#49b8bf] transition-all"
//                             onClick={registerNewCompany}
//                         >
//                             Continue
//                         </motion.button>
//                     </div>
//                 </motion.div>
//             </div>
//         </div>
//     );
// };

// export default CompanyCreate;

import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';
import { motion } from "framer-motion";

const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to register company. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
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

            <div className="flex justify-center items-center min-h-[80vh]">
                <motion.div
                    variants={pageVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-2xl w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-200"
                >
                    <div className="text-center">
                        <h3 className="font-bold text-3xl text-gray-800">Your Company Name</h3>
                        <p className="text-gray-500 text-md mt-2">
                            What would you like to name your company? You can change this later.
                        </p>
                    </div>

                    <div className="mt-6">
                        <Label className="text-gray-700 text-md font-medium">Company Name</Label>
                        <Input
                            type="text"
                            className="mt-3 w-full p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder="JobHunt, Microsoft, etc."
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-center gap-6 mt-10">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 border border-gray-400 rounded-lg text-gray-600 hover:bg-gray-200 transition-all"
                            onClick={() => navigate("/admin/profile")}
                        >
                            Cancel
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-[#5ce1e6] text-white font-semibold rounded-lg hover:bg-[#49b8bf] transition-all"
                            onClick={registerNewCompany}
                        >
                            Continue
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CompanyCreate;