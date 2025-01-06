import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import Data from './Data';
function Detail(){
    const navigate=useNavigate();
    const{id}=useParams();
    const [DataDetail,setDataDetail]=useState({});
    const [complete,setComplete]=useState(false)
    const eachDetail=async()=>{
        try{
            const response=await axios.get(`http://127.0.0.1:8000/data/task-detail/${id}/`,{
                withCredentials:true
            });
            console.log("response",response.data);
            setDataDetail(response.data);
            setComplete(response.data.completed)
        }
        catch(error){
            console.log(error);
        }
    }
   
    useEffect(()=>{
        eachDetail();
    },[]);
    const handleChange=(e)=>{
        const{name,value}=e.target;
        setDataDetail((prevData)=>({...prevData,[name]:value}))
    }
    const handleClick=(e)=>{
        const updatedComplete=!complete
        setComplete(updatedComplete)
        const name="completed"
        setDataDetail((prevData)=>({...prevData,[name]:updatedComplete}))

    }
    const handleSubmit=async()=>{
        try{
        const response=await axios.put(`http://127.0.0.1:8000/data/task-update/${id}/`,DataDetail,{
            withCredentials:true
        });
        navigate("/data");
        }
        catch(error){
            console.log(error)
        }
    }
    return(
        <>
        <div className='detailMainDiv'>
        <TextField
          id="outlined-multiline-flexible"
          label="Edit"
          multiline
          maxRows={4}
          value={DataDetail.title}
          onChange={handleChange}
          name='title'
        />
        <Button variant="outlined" onClick={handleSubmit} >Submit</Button>
        <br />
        Completed:<Checkbox checked={complete} onClick={handleClick}/>
        </div>
        </>
    )
}
export default Detail;