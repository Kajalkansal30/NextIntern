import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      onClick={() => navigate(`/description/${job._id}`)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="p-6 rounded-lg shadow-md bg-white border border-gray-200 cursor-pointer 
               transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      {/* Company Details */}
      <div>
        <h3 className="font-semibold text-lg text-gray-800">{job?.company?.name}</h3>
        <p className="text-sm text-gray-500">{job?.company?.city}</p>
      </div>

      {/* Job Title & Description */}
      <div className="mt-3">
        <h2 className="font-bold text-xl text-gray-900 truncate">{job?.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
      </div>

      {/* Job Details (Badges) */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-semibold bg-blue-100 px-3 py-1 rounded-md">
           {job?.stipendType}
        </Badge>
        <Badge className="text-red-700 font-semibold bg-red-100 px-3 py-1 rounded-md">
           {job?.jobMode}
        </Badge>
        {/* <Badge className="text-purple-700 font-semibold bg-purple-100 px-3 py-1 rounded-md">
          {job?.salary}
        </Badge> */}
      </div>
    </motion.div>


  );
};

export default LatestJobCards