import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import TextField from '@mui/material/TextField';
import axios from "axios";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import {  Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {authent,authenf, setToastShownt,setToastShownf } from './authSlice'
import { ToastContainer, toast,Bounce } from 'react-toastify';

function Data(){
    const auth1=useSelector((state)=>state.auth.value)
    const toast1=useSelector((state)=>state.auth.toastShown)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const[datalist,setDatalist]=useState([]);
    const[enterData,setEnterData]=useState({ title: "",completed:"false"});
    
    const handleChange=(e)=>{
        const{name,value}=e.target;
        setEnterData((prevData)=>({...prevData,[name]:value}));
    }

    const alldata=async()=>{
        try{
            const response=await axios.get("http://127.0.0.1:8000/data/task-list/",{
                withCredentials:true
            });
            if (response.status==200){
            console.log("response",response.data);
            console.log(auth1)
            setDatalist(response.data);}
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        alldata();
    },[])
    useEffect(()=>{
        if(toast1==false){
            dispatch(setToastShownt());
        toast.success('Login Successfull', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });}
        },[auth1]);
    const handleClick=async(e)=> {
        e.preventDefault();
        
        try{
            console.log(enterData);
            const response=await axios.post("http://127.0.0.1:8000/data/task-create/",enterData,{
                withCredentials:true
            });
            
            console.log(response.data);
            console.log(auth1);
            setEnterData({ title: "",completed:"false"});
            alldata();
            
        }
        catch(error){
            console.log(error);
        }
        
    }
    const handleDelete=async(id)=>{
        
        
        try{
            console.log(id);
            const response=await axios.delete(`http://127.0.0.1:8000/data/task-delete/${id}/`,{
                withCredentials:true
            });

            alldata();
            toast.error('Item deleted', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
            
        }
        
        catch(error){
            console.log(error);
        }
    }
    const handleEditClick=(id)=>{
        
        navigate(`/detail/${id}/`)
    }
    
    
    return(
        <>
            <div className="overalldatadiv">
            <TextField id="outlined-basic" onChange={handleChange} label="Add task" variant="outlined" name='title' value={enterData.title}/>
            <Button variant="outlined" onClick={handleClick}>Submit</Button>
            <ListGroup>
            {
                datalist.map((eachData)=>(
                    <ListGroup.Item className='eachDiv' style={{"textDecoration":eachData.completed?"line-through":"none"}}>{eachData.title}<button className='buttonDivEdit' onClick={()=>{handleEditClick(eachData.id)}}>Edit</button>   <DeleteIcon className='buttonDivDel' onClick={()=>handleDelete(eachData.id)}/></ListGroup.Item>
                ))
            }
            </ListGroup>
            </div>
            <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    transition={Bounce}
                />           
        </>
    );
}
export default Data;