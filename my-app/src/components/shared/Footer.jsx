import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      className="bg-gray-800 text-white py-6 w-full"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 max-w-7xl">
        {/* Left Side */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left mb-4 md:mb-0"
        >
          <h2 className="font-bold text-xl">
            Next<span className="text-[#5ce1e6]">INTERN</span>
          </h2>
          <p className="text-sm text-gray-400">
            © 2024 Next Intern. All rights reserved.
          </p>
        </motion.div>

        {/* Right Side - Social Media Icons */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex space-x-6"
        >
          {[FaFacebook, FaTwitter, FaLinkedin].map((Icon, index) => (
            <motion.a
              key={index}
              href="#"
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-gray-400 hover:text-[#5ce1e6] transition duration-300"
            >
              <Icon size={22} />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
