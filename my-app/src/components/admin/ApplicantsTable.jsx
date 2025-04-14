import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import store from '@/redux/store';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { motion } from "framer-motion";

const tableContainerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.3 }
    })
};

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);
    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.message) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <motion.div
            className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 p-4"
            variants={tableContainerVariants}
            initial="hidden"
            animate="visible"
        >
            <Table>
                <TableCaption className="text-gray-600 font-medium">
                    A list of your recent applied users
                </TableCaption>
                <TableHeader className="bg-gray-100">
                    <TableRow className="text-gray-700 font-semibold">
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants && applicants?.applications?.map((item, i) => (
                        <motion.tr
                            key={item._id}
                            className="hover:bg-gray-50 transition-all"
                            variants={rowVariants}
                            initial="hidden"
                            animate="visible"
                            custom={i}
                        >
                            <TableCell className="py-3 px-4">{item?.applicant?.fullname}</TableCell>
                            <TableCell className="py-3 px-4">{item?.applicant?.email}</TableCell>
                            <TableCell className="py-3 px-4">{item?.applicant?.phoneNumber}</TableCell>
                            <TableCell className="py-3 px-4">
                                {item.applicant?.profile?.resume ?
                                    <a
                                        className="text-blue-600 hover:underline cursor-pointer"
                                        href={item?.applicant?.profile?.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item?.applicant?.profile?.resumeOriginalName}
                                    </a>
                                    : <span className="text-gray-500">NA</span>
                                }
                            </TableCell>
                            <TableCell className="py-3 px-4">{item?.applicant.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="py-3 px-4 text-right">
                                <Popover>
                                    <PopoverTrigger className="hover:bg-gray-200 p-2 rounded-full transition-all">
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32 bg-white shadow-md rounded-md p-2">
                                        {shortlistingStatus.map((status, index) => (
                                            <div
                                                key={index}
                                                onClick={() => statusHandler(status, item?._id)}
                                                className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-all"
                                            >
                                                <span>{status}</span>
                                            </div>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </motion.tr>
                    ))}
                </TableBody>
            </Table>
        </motion.div>
    );
};

export default ApplicantsTable