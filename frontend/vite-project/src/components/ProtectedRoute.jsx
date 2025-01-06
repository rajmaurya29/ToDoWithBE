import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {authent,authenf } from './authSlice'

const ProtectedRoute=({children})=>{
    const auth1=useSelector((state)=>state.auth.value);
    return auth1?children:<Navigate to="/login/"/>;
}
export default ProtectedRoute;