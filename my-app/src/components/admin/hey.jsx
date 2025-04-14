import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";

const PostInternshipJob = () => {
    const [position, setPosition] = useState("");
    const [skills, setSkills] = useState("");
    const [internshipType, setInternshipType] = useState("");
    const [internshipMode, setInternshipMode] = useState("");
    const [openings, setOpenings] = useState("");
    const [startDate, setStartDate] = useState("");
    const [duration, setDuration] = useState("");
    const [responsibilities, setResponsibilities] = useState("");
    const [candidatePreferences, setCandidatePreferences] = useState("");
    const [stipendType, setStipendType] = useState("");
    const [stipendMin, setStipendMin] = useState("");
    const [stipendMax, setStipendMax] = useState("");
    const [perks, setPerks] = useState([]);
    const [ppOffer, setPpOffer] = useState(false);
    const [availability, setAvailability] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [questions, setQuestions] = useState([""]);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!position || !skills || !internshipType || !internshipMode || !openings || !startDate || !duration) {
            alert("Please fill in all required fields.");
            return;
        }
        alert("Internship/Job posted successfully!");
    };

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index] = value;
        setQuestions(newQuestions);
    };

    const addQuestionField = () => {
        setQuestions([...questions, ""]);
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <Navbar />
            <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl border border-gray-200">
                <h2 className="text-3xl font-semibold mb-6 text-gray-800">Post Internship</h2>

                {/* Form fields */}
                <form onSubmit={handleSubmit}>
                    {/* Position Title */}
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700">Position Title</label>
                        <input
                            type="text"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Required Skills */}
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700">Skills Required</label>
                        <input
                            type="text"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Internship Type */}
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700">Internship Type</label>
                        <select
                            value={internshipType}
                            onChange={(e) => setInternshipType(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Internship Type</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                        </select>
                    </div>

                    {/* Internship Mode */}
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700">Internship Mode</label>
                        <select
                            value={internshipMode}
                            onChange={(e) => setInternshipMode(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Internship Mode</option>
                            <option value="Remote">Remote</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="In-office">In-office</option>
                        </select>
                    </div>

                    {/* Number of Openings */}
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700">Number of Openings</label>
                        <input
                            type="number"
                            value={openings}
                            onChange={(e) => setOpenings(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Internship Start Date */}
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700">Internship Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Internship Duration */}
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700">Internship Duration</label>
                        <input
                            type="text"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Responsibilities */}
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700">Intern's Responsibilities</label>
                        <textarea
                            value={responsibilities}
                            onChange={(e) => setResponsibilities(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Candidate Preferences */}
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700">Candidate Preferences</label>
                        <textarea
                            value={candidatePreferences}
                            onChange={(e) => setCandidatePreferences(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Screening Questions */}
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700">Screening Questions</label>
                        {questions.map((question, index) => (
                            <div key={index} className="mb-4">
                                <input
                                    type="text"
                                    value={question}
                                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                    placeholder={`Question ${index + 1}`}
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addQuestionField}
                            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                        >
                            Add Question
                        </button>
                    </div>

                    {/* Alternate Contact Number */}
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700">Alternate Mobile Number</label>
                        <input
                            type="text"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="mb-6 flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostInternshipJob;
