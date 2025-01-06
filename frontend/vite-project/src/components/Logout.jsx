import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import {authent,authenf,setToastShownf } from './authSlice'
import { useNavigate } from 'react-router-dom';
const Logout = () => {
  const navigate=useNavigate();
  const auth1=useSelector((state)=>state.auth.value)
    const dispatch=useDispatch();
  const handleClick=async()=>{
    console.log("auth ",auth1)
    try{
      const response=await axios.post("http://127.0.0.1:8000/api/logout/",{},{
        withCredentials:true
      })
      
      console.log(response.data);
    }
    catch(error){
      console.log(error);
    }
    dispatch(authenf());
    dispatch(setToastShownf());
      navigate("/login/")
  }
  return (
    <div className='logout' >
      {/* <h2 >Logout</h2> */}
      <div style={{marginTop:"260px",marginLeft:"34vw",}}>
        <h1 style={{fontSize:"40px"}}>Want to Logout😵
            <br />
            See You Soon🫡
        </h1>
      <button onClick={handleClick} style={{backgroundColor:"#C4A7F6",padding:"4px",borderRadius:"6px"}}>Logout</button>
      </div>
    </div>
  );
};

export default Logout;
