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
import { useEffect, useState } from 'react';

const LoginRegisterForm = ({ isOTPLoggedIn, OTPLoggedUserData }) => {
  const [userdata, setUserdata] = useState(null);
  const [email, setEmail] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [changeText, setChangeText] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOTPLoggedIn) {
      setUserdata(OTPLoggedUserData?.preuser || {});
    }
  }, [isOTPLoggedIn, OTPLoggedUserData]);

  useEffect(() => {
    const fetchUserData = () => {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      setUserdata(userDetails);
    };

    fetchUserData();
    const intervalId = setInterval(fetchUserData, 300000);

    return () => clearInterval(intervalId);
  }, []);

  const sendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Enter Your Email!");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Enter Valid Email!");
      return;
    }

    setSpinner(true);
    try {
      const response = await sentOtpFunction({ email });
      if (response.status === 200) {
        navigate("/OTP", { state: email });
      } else {
        toast.error(response.response?.data?.error || "An error occurred");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setSpinner(false);
    }
  };

  const handlePhoneChange = (value) => setPhoneNumber(value);

  return (
    <>
      {userdata ? (
        <Verifyaccount userdata={userdata} />
      ) : (
        <Container className="d-flex justify-content-center align-items-center">
          <div className='wrapper'>
            <div className='from-box login'>
              <h2 className='text-center'>
                <img
                  src='https://digilaser.sa/wp-content/uploads/2024/04/78-removebg-preview.png'
                  style={{ width: '200px', fontSize: '15px', marginBottom: '30px' }}
                  alt="User Avatar"
                />
              </h2>
              <form>
                {changeText ? (
                  <div className='input-box'>
                    <input
                      type='email'
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='البريد الألكتروني'
                      required
                    />
                    <FaRegUserCircle className='icon' />
                  </div>
                ) : (
                  <div className='input-box'>
                    <PhoneInput
                      style={{ marginLeft: '15px', marginTop: '10px' }}
                      placeholder="رقم الهاتف"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      defaultCountry="SA"
                    />
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
                {/* Google login component or button can be added here */}
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
