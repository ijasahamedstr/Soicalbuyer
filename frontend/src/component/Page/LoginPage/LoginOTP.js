import { Container } from 'react-bootstrap';
import './LoginRegistration.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { MdOutgoingMail } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { userVerify } from "../LoginPage/LoginAPI/Apis.js"


const LoginOTP = () => {
  const [otp, setOtp] = useState("");

  const location = useLocation();

  const navigate = useNavigate();

  const LoginUser = async (e) => {
    e.preventDefault();

    if (otp === "") {
      toast.error("Enter Your Otp")
    } else if (!/[^a-zA-Z]/.test(otp)) {
      toast.error("Enter Valid Otp")
    } else if (otp.length < 6) {
      toast.error("Otp Length minimum 6 digit")
    } else {
      const data = {
        otp, email: location.state
      }

      const response = await userVerify(data);
      if (response.status === 200) {
        localStorage.setItem("userdbtoken", response.data.userToken);
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/Dashboard")
        }, 5000)
      } else {
        toast.error(response.response.data.error)
      }
    }
  }
  const user = {
    avatar: 'https://digilaser.sa/wp-content/uploads/2024/04/78-removebg-preview.png', // Replace with actual avatar URL
  };

  return (
    <>
     <Container className="d-flex justify-content-center align-items-center" >
     <div className='wrapper'>
     <div className='from-box login'>
     <h2 style={{textAlign:'center'}}><img src={user.avatar} style={{width:'200px',fontSize:'15px',marginBottom:'30px'}} alt="User Avatar" /></h2>
     <form>
   <div>
          <div className='input-box'>
           <input type="text" name="otp" id=""  onChange={(e) => setOtp(e.target.value)} placeholder='Enter Your OTP'  required></input><MdOutgoingMail className='icon' />
          </div>
           <br />
         </div>  
    
         <div className='remember-forgot'>
         </div>
        <button onClick={LoginUser} type="submit">Login</button>
     </form>
     </div>
     </div>
     <ToastContainer />
     </Container>
    </>
   
  );
};

export default LoginOTP;