import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Job = ({ job }) => {
  const navigate = useNavigate();
  // const jobId="gujh"
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  }
  return (
    // <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
    //   <div className='flex items-center justify-between'>
    //     <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt)===0?"Today":`${daysAgoFunction(job?.createdAt)} days ago`}</p>
    //     <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
    //   </div>
    //   <div className='flex items-center gap-2 my-2'>
    //     <Button>
    //       <Avatar>
    //         <AvatarImage src={job?.company?.logo} />
    //       </Avatar>
    //     </Button>
    //     <div>
    //       <h3 className='font-medium text-lg'>{job?.company?.name}</h3>
    //       <p className='text-sm text-gray-500'>India</p>
    //     </div>
    //   </div>
    //   <div>
    //     <h3 className='font-bold text-lg my-2'>{job?.title}</h3>
    //     <p className='text-sm text-gray-600'>{job?.description}</p>
    //   </div>
    //   <div className='flex items-center gap-2 mt-4'>
    //     <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position}</Badge>
    //     <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
    //     <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{ job?.salary}</Badge>
    //   </div>
    //   <div className='flex items-center gap-4 mt-4'>
    //     <Button onClick={()=> navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
    //     <Button className='bg-blue-400'>Save For Later</Button> 
    //   </div> 

    // </div>

    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="p-5 rounded-xl shadow-lg bg-white border border-gray-200 hover:border-blue-400"
    >
      {/* Job Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      {/* Company Info */}
      <div className='flex items-center gap-2 my-2'>
      <div className="cursor-pointer p-2 rounded hover:bg-muted transition">
  <Avatar>
    <AvatarImage src={job?.company?.logoUrl} />
  </Avatar>
</div>

        <div>
          <h3 className="font-semibold text-lg">{job?.company?.name}</h3>
          <p className="text-sm text-gray-500">{job?.company?.city}</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div>
        <h3 className="font-bold text-xl text-gray-800">{job?.title}</h3>
        <p className="text-sm text-gray-600 mt-2">{job?.description}</p>
      </div>

      {/* Job Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="text-blue-700 font-semibold bg-blue-100 px-3 py-1 rounded-md">
          {job?.stipendType}
        </Badge>
        <Badge className="text-red-700 font-semibold bg-red-100 px-3 py-1 rounded-md">
          {job?.jobMode}
        </Badge>
        {/* <Badge className="text-[#7209b7] font-bold bg-purple-100" variant="ghost">
          {job?.salary}
        </Badge> */}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-4 mt-5">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="flex transition-transform duration-300"
        >
          Details
        </Button>
        <Button className="flex flex-wrap justify-center items-center break-normal bg-[#5ce1e6] text-blue transition-transform duration-300 ">
          Save For Later
        </Button>
      </div>
    </motion.div>
  );
};

export default Job