import React, { useState } from 'react';
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

const RegisterForm = () => {
  const [fname, setFname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (fname === '') {
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
        fname,
        username,
        email,
        Phone
      });
      
      if (response.status === 200) {
        console.log('Registration successful:', response.data);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Account registered successfully!',
        });

        // Clear form fields after successful registration
        setFname('');
        setUsername('');
        setEmail('');
        setPhone('');
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
        text: 'An error occurred while registering. Please try again later.',
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
            value={fname}
            onChange={(e) => setFname(e.target.value)}
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
        <div className='input-box'>
          <Form.Control
            type="phone"
            placeholder="رقم الهاتف"
            name="phone"
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
          /><MdOutlinePhoneIphone className='icon' />
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