import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../shared/Navbar";
import { Loader2 } from "lucide-react";
import { DialogFooter } from "../ui/dialog";
import axios from "axios"; // Ensure axios is imported
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
// import CompanySetup from "./CompanySetup";
import CompanyCreate from "./CompanyCreate";

const AdminProfile1 = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false); // Added state to track submission
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    firstName: user?.firstname || "",
    lastName: user?.lastname || "",
    email: user?.email || "",
    designation: user?.designation || "",
    mobile: user?.phoneNumber || "",
  });
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = () => {
    alert("Mobile number verified!");
    setIsVerified(true);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("designation", input.designation);
    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        withCredentials: true
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setSubmitted(true); // Set submitted to true after successful form submission
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
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


      {/* Conditional Rendering: Show the form or the CompanySetup component */}
      {!submitted ? (
        // Show the form if not submitted yet
        <motion.div
          className="flex flex-grow items-center justify-center py-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
            <motion.h2
              className="text-2xl font-bold text-center mb-4 text-blue-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Personal Details
            </motion.h2>

            <form onSubmit={submitHandler} className="space-y-3" method="POST" encType="multipart/form-data">
              {[{ label: "First Name", name: "firstName", disabled: true },
              { label: "Last Name", name: "lastName", disabled: true },
              { label: "E-mail", name: "email", type: "email", disabled: true }]
                .map(({ label, name, type = "text", disabled }) => (
                  <motion.div key={name} className="mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                    <label className="block text-gray-700 font-medium">{label}</label>
                    <input
                      type={type}
                      name={name}
                      value={input[name]}
                      disabled={disabled}
                      className={`w-full px-3 py-2 border rounded-md text-gray-900 ${disabled ? "bg-gray-200" : "bg-white"}`}
                    />
                  </motion.div>
                ))}

              {/* Designation Input */}
              <motion.div className="mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                <label className="block text-gray-700 font-medium">Designation</label>
                <input
                  type="text"
                  name="designation"
                  placeholder="E.g. HR Manager"
                  value={input.designation}
                  onChange={changeEventHandler}
                  className="w-full px-3 py-2 border rounded-md bg-white"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </motion.div>

              {/* Mobile Number */}
              <motion.div className="mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                <label className="block text-gray-700 font-medium">Mobile Number</label>
                <div className="flex items-center">
                  <span className="px-3 py-2 border rounded-l-md bg-gray-200">+91</span>
                  <input
                    type="text"
                    name="mobile"
                    value={input.mobile}
                    disabled
                    className="w-full px-3 py-2 border rounded-r-md bg-gray-200"
                  />
                  <motion.button
                    type="button"
                    onClick={handleVerify}
                    className={`ml-2 px-4 py-2 rounded-md text-white ${isVerified ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {isVerified ? "Verified" : "Verify"}
                  </motion.button>
                </div>
              </motion.div>

              {/* Next Button */}
              <motion.div className="flex justify-end mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
                <DialogFooter className="mt-3">
                  {loading ? (
                    <button className="w-full bg-gray-500 text-white py-2 rounded-md flex items-center justify-center text-sm">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => submitHandler(e)}
                      className={`px-4 py-2 rounded-md transition-all ${isVerified ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
                      disabled={!isVerified}
                    >
                      Next
                    </button>
                  )}
                </DialogFooter>
              </motion.div>
            </form>
          </div>
        </motion.div>
      ) : (
        // Show the CompanySetup component after submission
        <CompanyCreate />
      )}
    </div>
  );
};

export default AdminProfile1;
