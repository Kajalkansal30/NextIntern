import { setSearchedQuery } from '@/redux/jobSlice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
const searchVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.3 } },
  };
  
  const inputVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.4 } },
  };

const HeroSection = () => {
    const [query,setQuery]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const searchJobHandler=()=>{
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <motion.div
      className="text-center my-14"
      initial="hidden"
      animate="visible"
      variants={searchVariants}
    >
      {/* Tagline */}
      <motion.span
        className="mx-auto px-5 py-2 rounded-full bg-gray-100 text-[#5ce1e6] font-medium text-sm shadow-md"
        whileHover={{ scale: 1.1 }}
      >
        No. 1 Internship Hunt Website 🚀
      </motion.span>

      {/* Description */}
      <motion.p
        className="text-gray-700 mt-5 text-lg font-medium"
        whileHover={{ scale: 1.05 }}
      >
        Discover amazing internships and kickstart your career journey!
      </motion.p>

      {/* Search Bar */}
      <motion.div
        className="flex w-[40%] justify-between px-4 rounded-full shadow-lg border border-gray-200 items-center gap-4 mx-auto mt-6"
        variants={inputVariants}
      >
        <input
          type="text"
          placeholder="Find your internship here"
          onChange={(e) => setQuery(e.target.value)}
          className="outline-none border-none p-4 w-full rounded-full text-gray-700 focus:ring-2 focus:ring-[#5ce1e6] transition duration-300"
        />
        
        {/* Search Button */}
                <motion.button
                    onClick={searchJobHandler}
                    className="p-2 bg-[#5ce1e6] text-blue font-semibold rounded-full border-amber-50 shadow-md transition duration-300 hover:bg-[#49b8bf] focus:ring-3 focus:ring-[#5ce1e6] active:scale-95"
                    
                >
                    Search
                </motion.button>
      </motion.div>
    </motion.div>
    );
};

export default HeroSection