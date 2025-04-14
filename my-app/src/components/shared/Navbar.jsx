import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { LogOut, User2 } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'
import { motion } from 'framer-motion';

import logo from './image.png'; // Assuming you have a logo image

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <motion.div
            className='bg-white shadow-md w-full'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className='flex items-center justify-between w-full h-16 px-4'>
                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    className='flex items-center cursor-pointer'
                >
                    {/* Logo Image */}
                    <img src={logo} alt="SkillBriddge Logo" className='w-50 h-15' />
                    <div>
                        {/* <h4 className='font-medium text-gray-800'>{user?.firstname}</h4> */}
                    </div>
                </motion.div>

                {/* Navigation Links */}
                <div className='flex items-center gap-8 ml-auto'>
                    <ul className='flex font-medium items-center gap-6 text-gray-700'>
                        {user?.role === 'recruiter' ? (
                            <>
                                {/* <motion.li whileHover={{ scale: 1.1 }}>
                                    <Link to='/admin/companies' className='hover:text-[#5ce1e6] transition duration-300'>Dashboard</Link>
                                </motion.li> */}
                                <motion.li whileHover={{ scale: 1.1 }}>
                                    <Link to='/admin/jobs' className='hover:text-[#5ce1e6] transition duration-300'>Dashboard</Link>
                                </motion.li>
                            </>
                        ) : (
                            <>
                                <motion.li whileHover={{ scale: 1.1 }}>
                                    <Link to='/' className='hover:text-[#5ce1e6] transition duration-300'>Home</Link>
                                </motion.li>
                                <motion.li whileHover={{ scale: 1.1 }}>
                                    <Link to='/jobs' className='hover:text-[#5ce1e6] transition duration-300'>Jobs</Link>
                                </motion.li>
                                <motion.li whileHover={{ scale: 1.1 }}>
                                    <Link to='/browse' className='hover:text-[#5ce1e6] transition duration-300'>Browse</Link>
                                </motion.li>
                            </>
                        )}
                    </ul>

                    {/* Auth Buttons / Profile */}
                    {!user ? (
                        <div className='flex items-center gap-3'>
                            <Link to='/login'>
                                <motion.button whileHover={{ scale: 1.1 }} className='border px-4 py-2 rounded-md hover:border-[#5ce1e6] hover:text-[#5ce1e6] transition'>
                                    Login
                                </motion.button>
                            </Link>
                            <Link to='/signup'>
                                <motion.button whileHover={{ scale: 1.1 }} className='bg-[#5ce1e6] text-black px-4 py-2 rounded-md hover:bg-[#49b8bf] transition'>
                                    Signup
                                </motion.button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <motion.div whileHover={{ scale: 1.1 }}>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto}
                                            alt='@shadcn'
                                            className='w-10 h-10 rounded-full border border-gray-300'
                                        />
                                    </Avatar>
                                </motion.div>
                            </PopoverTrigger>
                            <PopoverContent
                                className='w-72 bg-white shadow-md rounded-lg p-4'
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Profile Details */}
                                <div className='flex items-center gap-3 border-b pb-3'>
                                    <Avatar>
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto}
                                            alt='@shadcn'
                                            className='w-10 h-10 rounded-full border border-gray-300'
                                        />
                                    </Avatar>
                                    <div>
                                        <h4 className='font-medium text-gray-800'>{user?.firstname} {user?.lastname}</h4>
                                        <p className='text-sm text-gray-500'>{user?.profile?.bio}</p>
                                    </div>
                                </div>

                                {/* User Actions */}
                                <div className='flex flex-col my-3 text-gray-600'>
                                    {user?.role === 'student' && (
                                        <div className='flex w-fit items-center gap-2 cursor-pointer hover:text-[#5ce1e6] transition duration-300'>
                                            <User2 />
                                            <Button variant='link'>
                                                <Link to='/profile'>View Profile</Link>
                                            </Button>
                                        </div>
                                    )}
                                    <div className='flex w-fit items-center gap-2 cursor-pointer hover:text-red-500 transition duration-300'>
                                        <LogOut />
                                        <Button onClick={logoutHandler} variant='link'>
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Navbar;
