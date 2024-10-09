import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './Register.css';
import 'react-phone-number-input/style.css'; // 
import '@fortawesome/fontawesome-free/css/all.css';
import { Form} from 'react-bootstrap';
import 'sweetalert2/dist/sweetalert2.css';
import { Link } from 'react-router-dom';
import { MdOutlinePhoneIphone } from "react-icons/md";
import { MdOutgoingMail } from "react-icons/md";
import { TbUserEdit,TbUserShield } from "react-icons/tb";
import axios from 'axios';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import es from 'react-phone-input-2/lang/es.json'

const generateReferenceNumber = () => {
  const randomNumber = Math.floor(Math.random() * 90000) + 10000; // Generates a random number between 10000 and 99999
  return `REF${randomNumber}`;
};

const RegisterForm = () => {
  const [displayName, setdisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [Referrallink] = useState('https://usr.gg/register?ref=');
  const [Referral] = useState('0');
  const [Referralamount] = useState('$0');
  const [supportcode, SetSupportcode] = useState('');
  const [posts] = useState('0');
  const [documentationstatus] = useState('Not verified');
  const [Accountlevel] = useState('1');
  const [currentbalance] = useState('0');
  const [packagetype] = useState('مستخدم');
  const [packageexpirationdate] = useState('لايوجد');
  const [Accountstatus] = useState('Not verified');

  useEffect(() => {
    const newReferenceNumber = generateReferenceNumber();
    SetSupportcode(newReferenceNumber);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (displayName === '') {
      toast.error('Please enter your full name.');
      return;
    }
    if (username === '') {
      toast.error('Please enter your username.');
      return;
    }
    if (email === '') {
      toast.error('Please enter your email address.');
      return;
    }
    if (!email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (Phone === '') {
      toast.error('Please enter your phone number.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/register`, {
        displayName,
        username,
        email,
        Phone,
        Referrallink,
        Referral,
        Referralamount,
        supportcode,
        posts,
        documentationstatus,
        Accountlevel,
        currentbalance,
        packagetype,
        packageexpirationdate,
        Accountstatus

      });
      
      if (response.status === 200) {
        console.log('Registration successful:', response.data);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Account registered successfully!',
        });

        // Clear form fields after successful registration
        setdisplayName('');
        setUsername('');
        setEmail('');
        setPhone('');
        Referrallink('https://usr.gg/register?ref=');
        Referral('0');
        Referralamount('$0');

        supportcode('$0');
        posts('0');
        documentationstatus('Not verified');
        Accountlevel('1');
        currentbalance('$0.00');
        packagetype('مستخدم');
        packageexpirationdate('لايوجد');
        Accountstatus('Not verified');

      } else {
        // Handle unexpected response status
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Registration failed. Please try again.',
        });
      }
    } catch (error) {
      console.error('Registration failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Already registered Account. Please try again later.',
      });
    }
  };


  const user = {
    avatar: 'https://digilaser.sa/wp-content/uploads/2024/04/78-removebg-preview.png', // Replace with actual avatar URL
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" >
      <div className='wrapper' style={{height:'760px'}}>
      <div className='from-box login'>
      <h2 style={{textAlign:'center'}}><img src={user.avatar} style={{width:'200px',fontSize:'15px',marginBottom:'30px'}} alt="User Avatar" /></h2>
      <div className="container mt-4">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="fullname">
        <div className='input-box'>
          <Form.Control
            type="text"
            placeholder="الأسم"
            name="fname"
            value={displayName}
            onChange={(e) => setdisplayName(e.target.value)}
          /><TbUserShield  className='icon'/>
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="username">
        <div className='input-box'>
          <Form.Control
            type="text"
            placeholder="أسم المستخدم"
            name="uname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /><TbUserEdit className='icon' />
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
        <div className='input-box'>
          <Form.Control
            type="email"
            placeholder="البريد الألكتروني"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><MdOutgoingMail className='icon' />
          </div>
        </Form.Group>

           <Form.Group className="mb-3" controlId="phone">
                <div className="input-box">
                  <PhoneInput
                    country={'SA'}
                    localization={es}
                    value={Phone}
                    onChange={setPhone}
                    placeholder="رقم الهاتف"
                    inputClass="form-control"
                    containerClass="phone-input-container"
                    dropdownClass="phone-input-dropdown"
                    containerStyle={{
                      height: '40px', // Height of the container
                      width: '100%', // Full width
                      position: 'relative',
                    }}
                    inputStyle={{
                      height: '100%', // Matches the container height
                      borderRadius: '0.25rem',
                      border: '1px solid #ced4da',
                      padding: '0.375rem 0.75rem',
                      fontSize: '1rem',
                      boxSizing: 'border-box',
                      width: '100%', // Full width of container
                    }}
                    dropdownStyle={{
                      borderRadius: '0 0 0.25rem 0.25rem',
                      border: '1px solid #ced4da',
                      boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
                      zIndex: 1000,
                    }}
                  />
                  <MdOutlinePhoneIphone className="icon" />
                </div>
              </Form.Group>

        <button name='sign' type="submit">Register</button>
      </Form>
    </div>
    <Link to='/تسجيل الدخول'><div className='account1' style={{color:'rgb(97, 100, 255)'}}>لديك حساب بالفعل؟</div></Link>
      <div className='account'>أو قم بتسجيل الدخول عبر</div>
      <div className='google'><button style={{ borderRadius: '40px'}} className='button'  type="submit"><i className="fab fa-google" style={{color:'rgb(97, 100, 255)'}}></i> تسجيل الدخول عبر جوجل</button></div>     
      </div>
      </div>
      <ToastContainer />
      </Container>
  );
};

export default RegisterForm;