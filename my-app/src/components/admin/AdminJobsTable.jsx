import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";

const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const popoverVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200 } }
};

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText])

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <Table className="w-full border-collapse">
                {/* Caption */}
                <TableCaption className="text-gray-600 text-sm py-3">
                    A list of your recent posted internships
                </TableCaption>

                {/* Table Header */}
                <TableHeader className="bg-gray-100">
                    <TableRow className="border-b">
                        <TableHead className="text-left px-6 py-3 font-semibold">Company Name</TableHead>
                        <TableHead className="text-left px-6 py-3 font-semibold">Role</TableHead>
                        <TableHead className="text-left px-6 py-3 font-semibold">Date</TableHead>
                        <TableHead className="text-right px-6 py-3 font-semibold">Action</TableHead>
                    </TableRow>
                </TableHeader>

                {/* Table Body */}
                <TableBody>
                    {filterJobs?.map((job, index) => (
                        <motion.tr 
                            key={index} 
                            className="border-b hover:bg-gray-50 transition duration-200"
                            variants={rowVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <TableCell className="px-6 py-4">{job?.company?.name}</TableCell>
                            <TableCell className="px-6 py-4">{job?.title}</TableCell>
                            <TableCell className="px-6 py-4">{job.createdAt.split("T")[0]}</TableCell>
                            
                            {/* Action Dropdown */}
                            <TableCell className="text-right px-6 py-4">
                                <Popover>
                                    <PopoverTrigger className="cursor-pointer p-2 hover:bg-gray-200 rounded-full">
                                        <MoreHorizontal className="w-5 h-5 text-gray-600" />
                                    </PopoverTrigger>
                                    
                                    <motion.div 
                                        initial="hidden"
                                        animate="visible"
                                        variants={popoverVariants}
                                    >
                                        <PopoverContent className="w-36 p-2 bg-white shadow-lg rounded-lg border">
                                            <div 
                                                onClick={() => navigate(`/admin/jobs/${job._id}/update`)}
                                                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-md"
                                            >
                                                <Edit2 className="w-4 text-gray-600" />
                                                <span className="text-gray-700 text-sm">Edit</span>
                                            </div>

                                            <div 
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} 
                                                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-md mt-1"
                                            >
                                                <Eye className="w-4 text-gray-600" />
                                                <span className="text-gray-700 text-sm">Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </motion.div>
                                </Popover>
                            </TableCell>
                        </motion.tr>
                    ))}
                </TableBody>
            </Table>
        </div>

    );
};

export default AdminJobsTable