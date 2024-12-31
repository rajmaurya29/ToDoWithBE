import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import TextField from '@mui/material/TextField';
import axios from "axios";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import {  Link } from "react-router-dom";

function Data(){
    const navigate=useNavigate();
    const[datalist,setDatalist]=useState([]);
    const[enterData,setEnterData]=useState({ title: "",completed:"false"});
    
    const handleChange=(e)=>{
        const{name,value}=e.target;
        setEnterData((prevData)=>({...prevData,[name]:value}));
    }
    const alldata=async()=>{
        try{
            const response=await axios.get("http://127.0.0.1:8000/data/task-list/");
            console.log("response",response.data);
            setDatalist(response.data);
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        alldata();
    },[])
    const handleClick=async(e)=> {
        e.preventDefault();
        try{
            console.log(enterData);
            const response=await axios.post("http://127.0.0.1:8000/data/task-create/",enterData);
            console.log(response.data);
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
            const response=await axios.delete(`http://127.0.0.1:8000/data/task-delete/${id}/`);

            alldata();
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
        </>
    );
}
export default Data;