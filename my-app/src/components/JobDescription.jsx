import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }]
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const renderListFromText = (text) => {
    if (!text || typeof text !== "string") return "Not specified";

    return (
      <ul className="list-disc list-inside text-gray-700 space-y-1 mt-1">
        {text
          .split(/[\n•,-]+/)
          .map((item) => item.trim())
          .filter(Boolean)
          .map((item, index) => (
            <li key={index}>{item}</li>
          ))}
      </ul>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-5xl mx-auto my-10 bg-white p-8 shadow-xl rounded-2xl border border-gray-200"
    >
      {/* Header Section */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="font-bold text-3xl text-gray-800">{singleJob?.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{singleJob?.company?.name || "Company name not specified"}</p>

          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <Badge className="text-blue-700 font-bold bg-blue-100" variant="ghost">
              {singleJob?.stipendType}
            </Badge>
            <Badge className="text-[#F83002] font-bold bg-red-100" variant="ghost">
              {singleJob?.jobMode}
            </Badge>
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg px-6 py-3 font-semibold transition-all duration-300 ${isApplied
              ? "bg-gray-500 cursor-not-allowed text-blue"
              : "bg-[#5ce1e6] hover:bg-[#49b8bf] text-blue"
              }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </motion.div>
      </div>

      {/* Job Description */}
      <div className="mt-8 text-gray-800 space-y-4">
        <h3 className="text-lg font-medium border-b pb-2">{singleJob?.description || "Not Provided"}</h3>

        <div>
          <h2 className="font-bold text-lg">Skills:</h2>
          <p className="pl-4 text-gray-700">{singleJob?.skills}</p>
        </div>
        <div>
          <h2 className="font-bold text-lg">Location:</h2>
          <p className="pl-4 text-gray-700">{singleJob?.location || "Not Provided"}</p>
        </div>

        <div>
          <h2 className="font-bold text-lg">Duration(in Months):</h2>
          <p className="pl-4 text-gray-700">{singleJob?.duration || "Not Provided"}</p>
        </div>

        <div>
          <h2 className="font-bold text-lg">No. of Openings:</h2>
          <p className="pl-4 text-gray-700">{singleJob?.noOfOpening || "Not Provided"}</p>
        </div>

        <div>
          <h2 className="font-bold text-lg">Requirements:</h2>
          <div className="pl-4">{renderListFromText(singleJob?.requirements) || "Not Provided"}</div>
        </div>

        <div>
          <h2 className="font-bold text-lg">Responsibilities:</h2>
          <div className="pl-4">{renderListFromText(singleJob?.responsibilities) || "Not Provided"}</div>
        </div>

        <div>
          <h2 className="font-bold text-lg">Job Type:</h2>
          <p className="pl-4 text-gray-700">{singleJob?.jobType || "Not specified"}</p>
        </div>

        <div>
          <h2 className="font-bold text-lg">Salary:</h2>
          <p className="pl-4 text-gray-700">{singleJob?.salar || "Not Provided"}</p>
        </div>

        <div>
          <h2 className="font-bold text-lg">Perks:</h2>
          <p className="pl-4 text-gray-700">{singleJob?.perks || "Not Provided"}</p>
        </div>

        <div>
          <h2 className="font-bold text-lg">Total Applicants:</h2>
          <p className="pl-4 text-gray-700">{singleJob?.applications?.length}</p>
        </div>

        {typeof singleJob?.questions === "string" && singleJob.questions.trim() !== "" && (
  <div>
    <h2 className="font-bold text-lg">Questions:</h2>
    <p className="pl-4 text-gray-700">{singleJob.questions}</p>
  </div>
)}



        <div>
          <h2 className="font-bold text-lg">Contact Details:</h2>
          <p className="pl-4 text-gray-700">{singleJob?.alternateMobileNo || "NA"}</p>
        </div>

        <div>
          <h2 className="font-bold text-lg">Posted Date:</h2>
          <p className="pl-4 text-gray-700">{singleJob?.createdAt?.split("T")[0]}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default JobDescription;
