import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [])
    return (
        <div className='min-h-screen'>
            <Navbar />
            <div className="max-w-7xl mx-auto my-10 px-6">
                <h3 className="font-bold text-2xl my-6 text-gray-800">
                    Search Results ({allJobs.length})
                </h3>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {allJobs.map((job, index) => (
                        <motion.div
                            key={job._id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-2xl transition duration-300"
                        >
                            <Job job={job} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Browse