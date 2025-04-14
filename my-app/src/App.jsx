import { useState } from 'react'
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import JobSetup from './components/admin/JobSetUp.jsx'
import AdminProfile1 from './components/admin/AdminProfile1'
// import AdminProfile2 from './components/admin/AdminProfile2'
import AdminProfile3 from './components/admin/AdminProfile3'
import UpdateJobDialog from './components/admin/UpdateJobDialog'
//import ProtectedRoute from './components/admin/ProtectedRoute'


const appRouter= createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/description/:id',
    element:<JobDescription/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  
  //admin ke liye
  {
    path:"/admin/profile",
    element:<AdminProfile1/>
    //element:<ProtectedRoute><Companies/></ProtectedRoute>
  },
  // {
  //   path:"/admin/profile/organisation",
  //   element:<AdminProfile2/>
  //   //element:<ProtectedRoute><Companies/></ProtectedRoute>
  // },
  {
    path:"/admin/profile/post",
    element:<AdminProfile3/>
    //element:<ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/companies",
    element:<Companies/>
    //element:<ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element:<CompanyCreate/>
  },
  {
    path:"/admin/companies/:id",
    element:<CompanySetup/>
  },
  {
    path:"/admin/jobs",
    element:<AdminJobs/>
  },
  {
    path:"/admin/jobs/create",
    element:<PostJob/>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<Applicants/>
  },
  {
    path:"/admin/jobs/:id",
    element:<JobSetup/>
  },
  {
    path: "/admin/jobs/:id/update",
    element: <UpdateJobDialog/>
  },
])

function App() {
  const [count, setCount] = useState(0)
  const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className='w-screen'>
      <RouterProvider router={appRouter}/>
    </div>

  )
};

export default App

