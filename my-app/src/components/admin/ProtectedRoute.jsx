// const { default: store } = require("@/redux/store");
// // const { useEffect } = require("react");
// const { useSelector } = require("react-redux");
// const { useNavigate } = require("react-router-dom");
// import { useEffect } from "react";

// const ProtectedRoute=({children})=>{
//     const {user}=useSelector(store=>store.auth);
//     const navigate=useNavigate();
//     useEffect(()=>{
//         if(user==null|| user.role !='recruiter'){
//             navigate("/");
//         }
//     },[]);
//     return(
//         <>
//         {children}
//         </>
//     )
// };
// export default ProtectedRoute;