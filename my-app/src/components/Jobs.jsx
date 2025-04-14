import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import { motion } from 'framer-motion'


const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return (job?.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job?.description?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job?.location?.toLowerCase().includes(searchedQuery.toLowerCase()));
            });

            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Container */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto mt-8 p-5"
            >
                <div className="flex gap-6">

                    {/* Filter Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-1/4 bg-white p-4 shadow-lg rounded-lg border border-gray-200"
                    >
                        <FilterCard />
                    </motion.div>

                    {/* Job Listings */}
                    {filterJobs.length <= 0 ? (
                        <span className="text-gray-600 text-xl font-semibold mx-auto mt-10">
                            🚀 No Internship Found
                        </span>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="flex-1 h-[88vh] overflow-y-auto pb-5"
                        >
                            <div className="grid grid-cols-3 gap-6">
                                {filterJobs.map((job) => (
                                    <motion.div
                                        key={job?._id}
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }}
                                        className="p-5 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Jobs