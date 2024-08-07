import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import './LoginRegistration.css';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import '@fortawesome/fontawesome-free/css/all.css';
import Verifyaccount from '../../UserDashboard/verifyAccount/verifyAccount';
import { FaRegUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sentOtpFunction } from "../LoginPage/LoginAPI/Apis.js";

const LoginRegisterForm = ({ isLoggedIn = false }) => {


  const [email, setEmail] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [changeText, setChangeText] = useState(true);
  const navigate = useNavigate();

  // Send OTP
  const sendOtp = async (e) => {
    e.preventDefault();

    if (email === "") {
      toast.error("Enter Your Email !");
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email !");
    } else {
      setSpinner(true);
      const data = { email };

      try {
        const response = await sentOtpFunction(data);
        if (response.status === 200) {
          navigate("/OTP", { state: email });
        } else {
          toast.error(response.response?.data?.error || "An error occurred");
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
      } finally {
        setSpinner(false);
      }
    }
  };

  const handlePhoneChange = (value) => setPhoneNumber(value);

  return (
    <>
      {isLoggedIn ? (
        <Verifyaccount />
      ) : (
        <Container className="d-flex justify-content-center align-items-center">
          <div className='wrapper'>
            <div className='from-box login'>
              <h2 style={{ textAlign: 'center' }}>
                <img
                  src='https://digilaser.sa/wp-content/uploads/2024/04/78-removebg-preview.png'
                  style={{ width: '200px', fontSize: '15px', marginBottom: '30px' }}
                  alt="User Avatar"
                />
              </h2>
              <form>
                {changeText ? (
                  <div>
                    <div className='input-box'>
                      <input
                        type='email'
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='البريد الألكتروني'
                        required
                      />
                      <FaRegUserCircle className='icon' />
                    </div>
                    <br />
                  </div>
                ) : (
                  <div>
                    <div className='input-box'>
                      <PhoneInput
                        style={{ marginLeft: '15px', marginTop: '10px' }}
                        placeholder="رقم الهاتف"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        defaultCountry="SA" // Optional: Specify default country
                      />
                    </div>
                    <br />
                  </div>
                )}
                <div className='remember-forgot'>
                  <label
                    className='changeaccount'
                    onClick={() => setChangeText(!changeText)}
                  >
                    {changeText ? 'تسجيل الدخول عبر رقم الهاتف' : 'تسجيل الدخول عبر البريد'}
                  </label>
                </div>
                <button type="button" onClick={sendOtp} disabled={spinner}>
                  {spinner ? 'Sending...' : 'Send OTP'}
                </button>
              </form>
              <Link to="/تسجيل حساب جديد">
                <div className='account1' style={{ color: 'rgb(97, 100, 255)' }}>
                  ليس لديك حساب؟
                </div>
              </Link>
              <div className='account'>أو قم بتسجيل الدخول عبر</div>
              <div className='google'>
    
            </div>
            </div>
          </div>
          <ToastContainer />
        </Container>
      )}
    </>
  );
};

export default LoginRegisterForm;
