import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import store from '@/redux/store';
import useGetJobById from '@/hooks/useGetJobById';
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

// Reusable input field
const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-lg font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
    />
  </div>
);

// Reusable textarea
const TextAreaField = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label className="block text-lg font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
      className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
    />
  </div>
);

// Reusable dropdown
const DropdownField = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block text-lg font-medium text-gray-700 mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const JobSetup = () => {
  const params = useParams();
  useGetJobById(params.id);

  const { singleJob } = useSelector(store => store.job);

  const [input, setInput] = useState({
    title: '',
    description: '',
    skills: '',
    location:'',
    duration: '',
    jobMode: '',
    noOfOpening: '',
    jobType: '',
    startDate: '',
    responsibilities: '',
    requirements: '',
    salary: '',
    ppOffer: false,
    stipendType: '',
    perks: [],
    availability: '',
    questions: [],
    alternateMobileNo: '',
    companyId: '',
  });

  const [perks, setPerks] = useState([]);
  const [questions, setQuestions] = useState([""]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'ppOffer') {
      setInput({ ...input, [name]: checked });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const addQuestionField = () => {
    setQuestions([...questions, ""]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      if (key === 'perks') {
        perks.forEach((perk, index) => {
          formData.append(`perks[${index}]`, perk);
        });
      } else if (key === 'questions') {
        questions.forEach((q, index) => {
          formData.append(`questions[${index}]`, q);
        });
      } else {
        formData.append(key, value);
      }
    });

    try {
      const res = await axios.put(
        `${JOB_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      title: singleJob.title || '',
      description: singleJob.description || '',
      skills: singleJob.skills || '',
      duration: singleJob.duration || '',
      jobMode: singleJob.jobMode || '',
      noOfOpening: singleJob.noOfOpening || '',
      jobType: singleJob.jobType || '',
      startDate: singleJob.startDate || '',
      location: singleJob.location || '',
      responsibilities: singleJob.responsibilities || '',
      requirements: singleJob.requirements || '',
      salary: singleJob.salary || '',
      ppOffer: singleJob.ppOffer || false,
      stipendType: singleJob.stipendType || '',
      perks: singleJob.perks || [],
      availability: singleJob.availability || '',
      questions: singleJob.questions || [],
      alternateMobileNo: singleJob.alternateMobileNo || '',
      companyId: singleJob.companyId || '',
    });

    setPerks(singleJob.perks || []);
    setQuestions(singleJob.questions?.length ? singleJob.questions : [""]);
  }, [singleJob]);

  return (
    <div className="flex flex-col justify-center items-center">
      <Navbar />
      <div className="max-w-3xl my-2 mx-auto p-8 bg-white shadow-lg rounded-xl border border-gray-200">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800"> Edit Internship</h2>
        <form onSubmit={submitHandler} className="space-y-6">
          <InputField label="Position Title" name="title" value={input.title} onChange={changeEventHandler} />
          <TextAreaField label="Position Description" name="description" value={input.description} onChange={changeEventHandler} placeholder="Describe the internship role" />
          <InputField label="Skills Required" name="skills" value={input.skills} onChange={changeEventHandler} />
          <InputField label="Location" name="location" value={input.location} onChange={changeEventHandler} />
          <DropdownField label="Internship Type" name="jobType" value={input.jobType} onChange={changeEventHandler} options={["Full-time", "Part-time"]} />
          <DropdownField label="Internship Mode" name="jobMode" value={input.jobMode} onChange={changeEventHandler} options={["Remote", "Hybrid", "In-office"]} />
          <DropdownField label="Stipend Type" name="stipendType" value={input.stipendType} onChange={changeEventHandler} options={["Paid", "Unpaid"]} />
          <InputField label="Salary" name="salary" value={input.salary} onChange={changeEventHandler} />
          <InputField label="Number of Openings" name="noOfOpening" value={input.noOfOpening} onChange={changeEventHandler} />
          <InputField label="Internship Start Date" name="startDate" type="date" value={input.startDate} onChange={changeEventHandler} />
          <InputField label="Internship Duration" name="duration" value={input.duration} onChange={changeEventHandler} />
          <TextAreaField label="Responsibilities" name="responsibilities" value={input.responsibilities} onChange={changeEventHandler} />
          <TextAreaField label="Requirements" name="requirements" value={input.requirements} onChange={changeEventHandler} />
          <InputField label="Availability" name="availability" value={input.availability} onChange={changeEventHandler} />
          <InputField label="Alternate Mobile Number" name="alternateMobileNo" value={input.alternateMobileNo} onChange={changeEventHandler} />

          {/* Perks */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Perks</label>
            <div className="flex flex-wrap gap-3">
              {["Certificate", "Letter of Recommendation", "Flexible Work Hours", "5 Days a Week", "Informal Dress Code", "Free Snacks & Beverages"].map((perk) => (
                <label key={perk} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={perks.includes(perk)}
                    onChange={() => {
                      const newPerks = perks.includes(perk)
                        ? perks.filter(p => p !== perk)
                        : [...perks, perk];
                      setPerks(newPerks);
                    }}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="text-gray-700">{perk}</span>
                </label>
              ))}
            </div>
          </div>

          {/* PPO */}
          <div className="mb-6">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="ppOffer"
                checked={input.ppOffer}
                onChange={changeEventHandler}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-700">This internship comes with a pre-placement offer (PPO)</span>
            </label>
          </div>

          {/* Screening Questions */}
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">Screening Questions</label>
            {questions.map((q, i) => (
              <input
                key={i}
                type="text"
                placeholder={`Question ${i + 1}`}
                value={q}
                onChange={(e) => handleQuestionChange(i, e.target.value)}
                className="w-full mb-2 p-3 border border-gray-300 rounded-md shadow-sm"
              />
            ))}
            <button type="button" onClick={addQuestionField} className="text-blue-600 mt-2 hover:underline">
              + Add another question
            </button>
          </div>

          <div className="mt-8">
            {loading ? (
              <motion.button className="w-full flex items-center justify-center bg-gray-400 text-white py-3 rounded-lg cursor-not-allowed">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-[#5ce1e6] text-white py-3 rounded-lg hover:bg-[#49b8bf] transition-all"
              >
                Update
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobSetup;
