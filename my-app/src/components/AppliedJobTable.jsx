import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import { motion } from 'framer-motion'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);
    return (
        <div className="max-w-5xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg p-4"
      >
        <Table className="w-full border border-gray-200">
          <TableCaption className="text-lg font-semibold text-gray-600">
            A list of your Applied Internships
          </TableCaption>
          <TableHeader className="bg-[#38c5e9] text-white">
            <TableRow>
              <TableHead className="p-3">Date</TableHead>
              <TableHead className="p-3">Job Role</TableHead>
              <TableHead className="p-3">Company</TableHead>
              <TableHead className="p-3 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(!allAppliedJobs || allAppliedJobs.length === 0) ? (
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                  You haven't applied for any internship yet.
                </TableCell>
              </motion.tr>
            ) : (
              allAppliedJobs.map((appliedJob, index) => (
                <motion.tr
                  key={appliedJob._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="hover:bg-gray-100 transition duration-300"
                >
                  <TableCell className="p-3">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                  <TableCell className="p-3 font-medium text-gray-800">{appliedJob?.job?.title}</TableCell>
                  <TableCell className="p-3 text-gray-700">{appliedJob?.job?.company?.name}</TableCell>
                  <TableCell className="p-3 text-right">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`inline-block px-3 py-1 rounded-lg text-white font-semibold ${
                        appliedJob?.status === "rejected"
                          ? "bg-red-500"
                          : appliedJob?.status === "pending"
                          ? "bg-gray-500"
                          : "bg-green-500"
                      }`}
                    >
                      {appliedJob?.status?.toUpperCase()}
                    </motion.div>
                  </TableCell>
                </motion.tr>
              ))
            )}
          </TableBody>
        </Table>
      </motion.div>
    </div>
    );
};

export default AppliedJobTable