import React, { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import './Register.css';
import 'react-phone-number-input/style.css'; 
import '@fortawesome/fontawesome-free/css/all.css';
import { Link } from 'react-router-dom';
import { MdOutlinePhoneIphone, MdOutgoingMail } from "react-icons/md";
import { TbUserEdit, TbUserShield } from "react-icons/tb";
import axios from 'axios';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import es from 'react-phone-input-2/lang/es.json';

const generateReferenceNumber = () => {
  const randomNumber = Math.floor(Math.random() * 90000) + 10000; // Generates a random number between 10000 and 99999
  return `REF${randomNumber}`;
};

const RegisterForm = () => {
  const [displayName, setdisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [supportcode, SetSupportcode] = useState('');
  
  const [Referrallink] = useState('https://usr.gg/register?ref=');
  const [Referral] = useState('0');
  const [Referralamount] = useState('$0');
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
      const response = await axios.post('http://localhost:8000/register', {
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
      } else {
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
    avatar: 'https://digilaser.sa/wp-content/uploads/2024/04/78-removebg-preview.png',
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <div className='wrapper' style={{height:'760px'}}>
        <div className='from-box login'>
          <h2 style={{textAlign:'center'}}>
            <img src={user.avatar} style={{width:'200px', fontSize:'15px', marginBottom:'30px'}} alt="User Avatar" />
          </h2>
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
                  />
                  <TbUserShield className='icon'/>
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
                  />
                  <TbUserEdit className='icon'/>
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
                  />
                  <MdOutgoingMail className='icon'/>
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
                  />
                  <MdOutlinePhoneIphone className="icon" />
                </div>
              </Form.Group>

              <button name='sign' type="submit">Register</button>
            </Form>
          </div>
          <Link to='/تسجيل الدخول'>
            <div className='account1' style={{color:'rgb(97, 100, 255)'}}>لديك حساب بالفعل؟</div>
          </Link>
        </div>
        <ToastContainer />
      </div>
    </Container>
  );
};

export default RegisterForm;
