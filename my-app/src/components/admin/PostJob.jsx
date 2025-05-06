import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios';
import { toast } from "sonner";
import { JOB_API_END_POINT } from "@/utils/constant";

const PostJob = () => {
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

  const [perks,setPerks] = useState([]);
  const [questions,setQuestions] = useState([""]);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'ppOffer') {
      setInput({ ...input, [name]: checked });
    } else {
      setInput({ ...input, [name]: value });
    }
  };
  // const changeEventHandler = (e) => {
  //   setInput({ ...input, [e.target.name]: e.target.value });
  //   if (type === 'checkbox' && name === 'ppOffer') {
  //     setInput({ ...input, [name]: checked });
  //   } else {
  //     setInput({ ...input, [name]: value });
  //   }
  // };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company.name.toLowerCase() === value.toLowerCase());
    if (selectedCompany) {
      setInput({ ...input, companyId: selectedCompany._id });
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
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, {...input, perks: perks, questions: questions}, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Navbar />

      <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl border border-gray-200">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Post Internship</h2>
        <form onSubmit={submitHandler} className="space-y-6">
          <InputField label="Position Title" name="title" value={input.title} onChange={changeEventHandler} />
          <TextAreaField
            label="Position Description"
            name="description"
            value={input.description}
            onChange={changeEventHandler}
            placeholder="Describe the internship role, expectations, required skills, learning opportunities, etc."
          />
          <InputField label="Skills Required" name="skills" value={input.skills} onChange={changeEventHandler} />
          <InputField label="Location" name="location" value={input.location} onChange={changeEventHandler} />
          <DropdownField label="Internship Type" name="jobType" value={input.jobType} onChange={changeEventHandler} options={["Full-time", "Part-time"]} />
          <DropdownField label="Internship Mode" name="jobMode" value={input.jobMode} onChange={changeEventHandler} options={["Remote", "Hybrid", "In-office"]} />
          <DropdownField label="Stipend Type" name="stipendType" value={input.stipendType} onChange={changeEventHandler} options={["Paid", "Unpaid"]} />
          <InputField label="Salary" name="salary" value={input.salary} onChange={changeEventHandler} />
          <InputField label="Number of Openings" name="noOfOpening" value={input.noOfOpening} onChange={changeEventHandler} />
          <InputField label="Internship Start Date" name="startDate" type="date" value={input.startDate} onChange={changeEventHandler} />
          <InputField label="Internship Duration" name="duration" value={input.duration} onChange={changeEventHandler} />
          <TextAreaField label="Responsibilities" name="responsibilities" value={input.responsibilities} onChange={changeEventHandler} placeholder="Describe the role" />
          <TextAreaField label="Requirements" name="requirements" value={input.requirements} onChange={changeEventHandler} placeholder="Candidate expectations, etc." />
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
                      setPerks(perks.includes(perk) ? perks.filter(p => p !== perk) : [...perks, perk]);
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

          {/* Questions */}
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-300"
          >
            {loading ? "Posting..." : "Post Internship"}
          </button>
        </form>
      </div>
    </div>
  );
};

// Input Component
const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div className="mb-6">
    <label className="block text-lg font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>
);

// TextArea Component
const TextAreaField = ({ label, name, value, onChange, placeholder }) => (
  <div className="mb-6">
    <label className="block text-lg font-medium text-gray-700">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={6}
      className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>
);

// Dropdown Component
const DropdownField = ({ label, name, value, onChange, options }) => (
  <div className="mb-6">
    <label className="block text-lg font-medium text-gray-700">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
      required
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);


export default PostJob;
