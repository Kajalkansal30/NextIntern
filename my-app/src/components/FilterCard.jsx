import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { data } from 'autoprefixer'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { motion } from 'framer-motion'

const filterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Banglore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Fullstack Developer", "UI-UX Designer", "Data Analyst"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh-5lakh", "5lakh-8lakh"]
  }
]

const FilterCard = () => {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState('');

  const changeHandler = (value) => {
    setSelectedValue(value);
  }
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);
  return (
    <div className="space-y-6 w-full bg-white p-5 rounded-lg shadow-md">
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-bold text-lg text-gray-800"
      >
        Filter Jobs
      </motion.h3>
      <hr className="mt-3 border-gray-300" />

      <motion.div variants={filterVariants} initial="hidden" animate="visible">
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
          {filterData.map((data, index) => (
            <motion.div key={index} variants={itemVariants} className="space-y-2">
              <h3 className="font-semibold text-md text-gray-700">{data.filterType}</h3>
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <motion.div
                    key={itemId}
                    variants={itemVariants}
                    className="flex items-center space-x-3 p-2 rounded-full transition duration-300 hover:bg-gray-100 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    <RadioGroupItem value={item} id={itemId} />
                    <Label
                      htmlFor={itemId}
                      className="text-gray-600 hover:text-[#5ce1e6] transition-colors duration-300 "
                    >
                      {item}
                    </Label>
                  </motion.div>
                );
              })}
            </motion.div>
          ))}
        </RadioGroup>
      </motion.div>
    </div>
  );
};

export default FilterCard