import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
  }
  from 'mdb-react-ui-kit';
  import { useState } from 'react';
  import 'mdb-react-ui-kit/dist/css/mdb.min.css';
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import axios from 'axios'; 
  import { useSelector, useDispatch } from 'react-redux'
import {authent,authenf } from './authSlice'   
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { ToastContainer, toast,Bounce } from 'react-toastify';
function Login(){
    const [credential,setCredential]=useState(false);
    const auth1=useSelector((state)=>state.auth.value)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [email_data,setEmail_data]=useState("");
        const [email_password,setEmail_password]=useState("");
        const handleClick=async()=>{
            // toast("Wrong Credentials");
            toast.error('Wrong Credentials', {
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
            console.log("authLogin ",auth1);
            try{
                const response=await axios.post("http://127.0.0.1:8000/api/login/",{
                    username:email_data,
                    password:email_password
                },{
                    withCredentials:true
                },

                
            )
            if(response.status==200){
                dispatch(authent()),
                navigate("/data/")
            }
            console.log(response.data);
            }
            catch(error){
                console.log(error);
                setCredential(true);
            }
            console.log("authLoginf",auth1);
        }
    return(
        <>
            <div className="maincontainer">
                <MDBCardBody className='d-flex flex-column'>

                <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#784229' }}/>
                <span className="h1 fw-bold mb-0">Auth</span>
                </div>

                <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

                <MDBInput wrapperClass='mb-4' onChange={(e)=>setEmail_data(e.target.value)} label='Email address' id='formControlLg' type='email' size="lg"/>
                <MDBInput wrapperClass='mb-4' onChange={(e)=>setEmail_password(e.target.value)} label='Password' id='formControlLg' type='password' size="lg"/>

                <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={handleClick}>Login</MDBBtn>
                <a className="small text-muted" href="#!">Forgot password?</a>
                <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a href="#!" style={{color: '#393f81'}}>Register here</a></p>


                </MDBCardBody>
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
                {credential&&<Alert severity="warning">Wrong Credentials</Alert> }
            </div>
        </>
    );
}
export default Login;