import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { motion } from 'framer-motion'

// const skills = ["HTML", "CSS", "JavaScript", "ReactJs"]
const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 min-h-screen"
        >
            <Navbar />

            {/* Profile Card */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-xl shadow-md my-6 p-6"
            >
                {/* Profile Header */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-24 w-24 border-2 border-gray-300 rounded-full shadow-sm">
                            <AvatarImage
                                src={user?.profile?.profilePhoto || null}
                                alt="profile"
                                className="rounded-full"
                            />
                        </Avatar>
                        <div>
                            <h1 className="text-xl font-semibold text-gray-800"> {user?.firstname} {user?.lastname}</h1>
                            <p className="text-gray-600 text-sm">{user?.profile?.bio || "No bio available"}</p>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setOpen(true)}
                        className="border border-gray-300 hover:bg-gray-100 p-2 rounded-lg shadow-sm"
                    >
                        <Pen className="h-4 w-4 text-gray-600" />
                    </motion.button>
                </div>

                {/* Contact Information */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-5 space-y-3 text-gray-700"
                >
                    <div className="flex items-center gap-3">
                        <Mail className="text-gray-500 h-5 w-5" />
                        <span className="text-sm">{user?.email || "Not provided"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Contact className="text-gray-500 h-5 w-5" />
                        <span className="text-sm">{user?.phoneNumber || "Not provided"}</span>
                    </div>
                </motion.div>

                {/* Skills Section */}
                <div className="mt-5">
                    <h3 className="font-semibold text-lg text-gray-800">Skills</h3>
                    <motion.div
                        className="flex flex-wrap gap-2 mt-2"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.15 },
                            },
                        }}
                    >
                        {Array.isArray(user?.profile?.skills) && user.profile.skills.length > 0 ? (
                            user.profile.skills.map((skill, index) => (
                                <motion.div
                                    key={index}
                                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <Badge className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md">
                                        {skill}
                                    </Badge>
                                </motion.div>
                            ))
                        ) : (
                            <span className="text-gray-500 text-sm">No skills added</span>
                        )}
                    </motion.div>
                </div>

                {/* Resume Section
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-5"
                >
                    <h3 className="font-semibold text-lg text-gray-800">Resume</h3>
                    {isResume ? (
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={user?.profile?.resume}
                            className="text-blue-500 text-sm hover:underline"
                        >
                            {user?.profile?.resumeOriginalName || "Download Resume"}
                        </a>
                    ) : (
                        <span className="text-gray-500 text-sm">Not uploaded</span>
                    )}
                </motion.div> */}
                {/* Resume Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-5 space-y-4"
                >
                    {/* Resume */}
                    <div>
                        <h3 className="font-semibold text-lg text-gray-800">Resume</h3>
                        {user?.profile?.pdfOriginalName ? (
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={user.profile.pdfUrl}
                                className="text-blue-500 text-sm hover:underline"
                            >
                                {user.profile.pdfOriginalName || "Download Resume"}
                            </a>
                        ) : (
                            <span className="text-gray-500 text-sm">Not uploaded</span>
                        )}
                    </div>

                    {/* Introductory Video */}
                    <div>
                        <h3 className="font-semibold text-lg text-gray-800">Introductory Video</h3>
                        {user?.profile?.videoOriginalName ? (
                            // <video
                            //     controls
                            //     className="w-full max-w-md mt-2 rounded shadow"
                            // >
                            //     <source src={user.profile.video} type="video/mp4" />
                            //     Your browser does not support the video tag.
                            // </video>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={user.profile.videoUrl}
                                className="text-blue-500 text-sm hover:underline"
                            >
                                {user.profile.videoOriginalName || "Download Resume"}
                            </a>
                        ) : (
                            <span className="text-gray-500 text-sm">Not uploaded</span>
                        )}
                    </div>
                </motion.div>

            </motion.div>

            {/* Applied Jobs Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6"
            >
                <h3 className="font-bold text-lg text-gray-800 mb-4">Applied Jobs</h3>
                <AppliedJobTable />
            </motion.div>

            {/* Update Profile Dialog */}
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </motion.div>


    );
};

export default Profile