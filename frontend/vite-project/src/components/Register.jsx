import {
    MDBBtn,
    MDBCardBody,
    MDBIcon,
    MDBInput
  }
  from 'mdb-react-ui-kit';
  import 'mdb-react-ui-kit/dist/css/mdb.min.css';
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import axios from 'axios';    
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Register(){
    const navigate=useNavigate();
    const [email_data,setEmail_data]=useState("");
    const [email_password,setEmail_password]=useState("");

    const handleClick=async()=>{
        try{
            const response=await axios.post("http://127.0.0.1:8000/api/register/",{
                "username":email_data,
                "password":email_password
            })
            navigate("/login/");
            console.log(response.data);
        }
        catch(error){
            console.log(error);
        }
    }


    return(
        <>
            <div className="maincontainer">
                <MDBCardBody className='d-flex flex-column'>

                <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#784229' }}/>
                <span className="h1 fw-bold mb-0">Auth</span>
                </div>

                <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Register your account</h5>
        
                <MDBInput wrapperClass='mb-4' onChange={(e)=>setEmail_data(e.target.value)} value={email_data} label='Email address' id='formControlLg' type='email' size="lg"/>
                <MDBInput wrapperClass='mb-4' onChange={(e)=>setEmail_password(e.target.value)} value={email_password} label='Password' id='formControlLg' type='password' size="lg"/>

                <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={handleClick}>Register</MDBBtn>


                </MDBCardBody>
            </div>
        </>
    );
}
export default Register;