import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import store from '@/redux/store';
import { setUser } from '@/redux/authSlice';
import Navbar from '../shared/Navbar';

const UpdateJobDialog = () => {
    const [loading, setLoading] = useState(false);
    const { job } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        title: job?.title || '',
        description: job?.description || '',
        skills: job?.skills || '',
        duration: job?.duration || '',
        jobMode: job?.jobMode || '',
        noOfOpening: job?.noOfOpening || '',
        jobType: job?.jobType || '',
        startDate: job?.startDate?.substring(0, 10) || '',
        location: job?.location || '',
        responsibilities: job?.responsibilities || '',
        requirements: job?.requirements || '',
        salary: job?.salary || '',
        ppOffer: job?.ppOffer || '',
        stipendType: job?.stipendType || '',
        perks: job?.perks || '',
        availability: job?.availability || '',
        questions: job?.questions || '',
        alternateMobileNo: job?.alternateMobileNo || '',
    });

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", input.title);
        formData.append("description", input.description);
        formData.append("skills", input.skills);
        formData.append("duration", input.duration);
        formData.append("jobMode", input.jobMode);
        formData.append("noOfOpening", input.noOfOpening);
        formData.append("jobType", input.jobType);
        formData.append("startDate", input.startDate);
        formData.append("location", input.location);
        formData.append("responsibilities", input.responsibilities);
        formData.append("requirements", input.requirements);
        formData.append("salary", input.salary);
        formData.append("ppOffer", input.ppOffer);
        formData.append("stipendType", input.stipendType);
        formData.append("perks", input.perks);
        formData.append("availability", input.availability);
        formData.append("questions", input.questions);
        formData.append("alternateMobileNo", input.alternateMobileNo);

        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/update`, formData, {
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setUser(res.data.message));
                toast.success(res.data.message);
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
        console.log(input);
    };

    return (
        
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
                <h1 className="text-center text-2xl font-semibold mb-5">Update Internship</h1>
                <p className="text-center text-sm text-gray-500 mb-5">Edit the internship information and click update.</p>

                <form onSubmit={submitHandler} className="space-y-5">
                    {[ 
                        { id: "title", label: "Job Title" },
                        { id: "description", label: "Description", type: "textarea" },
                        { id: "skills", label: "Skills Required" },
                        { id: "duration", label: "Duration" },
                        { id: "jobMode", label: "Job Mode (Remote/Onsite/Hybrid)" },
                        { id: "noOfOpening", label: "Number of Openings" },
                        { id: "jobType", label: "Job Type" },
                        { id: "startDate", label: "Start Date", type: "date" },
                        { id: "location", label: "Location" },
                        { id: "responsibilities", label: "Responsibilities", type: "textarea" },
                        { id: "requirements", label: "Requirements", type: "textarea" },
                        { id: "salary", label: "Salary" },
                        { id: "ppOffer", label: "Pre-Placement Offer (Yes/No)" },
                        { id: "stipendType", label: "Stipend Type" },
                        { id: "perks", label: "Perks" },
                        { id: "availability", label: "Availability" },
                        { id: "questions", label: "Questions" },
                        { id: "alternateMobileNo", label: "Alternate Mobile No" },
                    ].map(({ id, label, type = "text" }) => (
                        <div key={id} className="grid grid-cols-[auto,1fr] items-start gap-3">
                            <Label htmlFor={id} className="text-sm">{label}</Label>
                            {type === "textarea" ? (
                                <textarea
                                    id={id}
                                    name={id}
                                    value={input[id]}
                                    onChange={changeEventHandler}  // Corrected here
                                    className="border border-gray-300 rounded px-2 py-1 w-full text-sm resize-none h-24"
                                />
                            ) : (
                                <Input
                                    id={id}
                                    name={id}
                                    type={type}
                                    value={input[id]}
                                    onChange={changeEventHandler}  // Corrected here
                                    className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
                                />
                            )}
                        </div>
                    ))}

                    <div className="flex justify-center mt-5">
                        {loading ? (
                            <Button className="w-full bg-gray-500 text-white py-2 rounded-md flex items-center justify-center text-sm">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                            </Button>
                        ) : (
                            <motion.button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-md text-sm"
                            >
                                Update Job
                            </motion.button>
                        )}
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default UpdateJobDialog;
