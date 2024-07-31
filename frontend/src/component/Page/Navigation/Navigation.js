import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import React, { useState } from 'react';
import './Navbar.css';
import { FaRegUserCircle } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import { ImCoinDollar } from "react-icons/im";
import { IoWallet } from "react-icons/io5";
import { BsArchiveFill } from "react-icons/bs";
import { PiBroadcastBold } from "react-icons/pi";
import { BsChatDots } from "react-icons/bs";
import { BiSolidBellRing } from "react-icons/bi";
import { BsFillPersonXFill } from "react-icons/bs";
import { IoFingerPrintSharp } from "react-icons/io5";
import { BsBullseye } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { Link } from "react-router-dom";

function OffcanvasExample({isLoggedIn = true}) {
  const user = {
    avatar: 'https://digilaser.sa/wp-content/uploads/2024/04/78-removebg-preview.png', // Replace with actual avatar URL
  };
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // const handleLogout = () => {
  //   // Handle logout logic here
  //   console.log('Logging out...');
  // };
  return (
    <>
      {['sm'].map((expand)  => (
        <Navbar key={expand} expand={expand} className="p-3 mb-2 bg-dark  text-white bg-body-tertiary" data-bs-theme="dark" style={{width:'100%',marginTop:'-16px',fontFamily:'Noto Kufi Arabic'}}>
          <Container>
            <Navbar.Brand href="#"><img  src={user.avatar} style={{width:'150px',fontSize:'15px'}} alt="User Avatar" /></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton style={{background:'#16151a'}}>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                <img  src={user.avatar} style={{width:'150px',fontSize:'15px'}} alt="User Avatar" />
                </Offcanvas.Title>
              </Offcanvas.Header>
              
              <Offcanvas.Body style={{color:'black',fontFamily:'Noto Kufi Arabic'}}>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link><Link style={{color:'#FFFFFF',textDecoration:'none'}} to="/">الرئيسية</Link></Nav.Link>
                <Nav.Link> <Link  style={{color:'#FFFFFF',textDecoration:'none'}} to="/التواصل الإجتماعي">التواصل الإجتماعي</Link></Nav.Link>
                <Nav.Link> <Link  style={{color:'#FFFFFF',textDecoration:'none'}} to="/الألعاب">الألعاب</Link></Nav.Link>
                <Nav.Link> <Link  style={{color:'#FFFFFF',textDecoration:'none'}} to="/الخدمات">الخدمات</Link></Nav.Link>
                <Nav.Link> <Link  style={{color:'#FFFFFF',textDecoration:'none'}} to="/الأعضاء">الأعضاء</Link></Nav.Link>
                <Nav.Link> <Link  style={{color:'#FFFFFF',textDecoration:'none'}} to="/طلبات المستخدمين"><span  className='navb'>جديد</span>طلبات المستخدمين</Link></Nav.Link>
                <Nav.Link><Link  style={{color:'#FFFFFF',textDecoration:'none'}} to="/متجر المنصة">متجر المنصة</Link></Nav.Link>
                </Nav>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                <div className="dropdown " onClick={toggleDropdown} style={{color:'#ffffff'}}>
                  <div class="card__author  card__author">
                  <img src="https://usr.dokan-cdn.com/public/avatars/e334bb8a73397609e060efed2fb27f96.gif" alt="" />
                  زائر </div>
                {isLoggedIn ? 
                <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`} aria-labelledby="userDropdown" style={{fontSize:'12px',marginBottom:'-10px'}}>
                <li className='drop'><Nav.Link href='/User'><button className="dropdown-item" type="button"><span><FaRegUserCircle /></span>حسابي</button></Nav.Link></li>
                <li className='drop'><Nav.Link href='/Requests'><button className="dropdown-item" type="button"><span><MdWorkHistory /></span>الطلبات</button></Nav.Link></li>
                <li className='drop'><Nav.Link href='/sales'><button className="dropdown-item" type="button"><span><ImCoinDollar /></span>المبيعات</button></Nav.Link></li>
                <li className='drop'><Nav.Link href='/wallet'><button className="dropdown-item" type="button"><span><IoWallet /></span>المحفظة</button></Nav.Link></li>
                <li className='drop'><Nav.Link href='/Points'><button className="dropdown-item" type="button"><span><BsArchiveFill /></span>الصندوق</button></Nav.Link></li>
                <li className='drop'><Nav.Link href='/boost'><button className="dropdown-item" type="button"><span><PiBroadcastBold /></span>ترويج منتج</button></Nav.Link></li>
                <li className='drop'><Nav.Link href='/Chat'><button className="dropdown-item" type="button"><span><BsChatDots /></span>المحادثات</button></Nav.Link></li>
                <li className='drop'><Nav.Link href='/notifications'><button className="dropdown-item" type="button"><span><BiSolidBellRing /></span>التنبيهات</button></Nav.Link></li>
                <li className='drop'><Nav.Link href='/blocks'><button className="dropdown-item" type="button"><span><BsFillPersonXFill /></span>قائمة الحظر</button></Nav.Link></li>
                <li className='drop'><Nav.Link href='/verify-account'><button className="dropdown-item" type="button"><span><IoFingerPrintSharp /></span>تفعيل الحساب</button></Nav.Link></li>
                <li className='drop'><Nav.Link href='/تسجيل الدخول'><button style={{color:'red'}} className="dropdown-item" type="button"><span><IoFingerPrintSharp /></span>تفعيل رقم الهاتف</button></Nav.Link></li>
                <li className='drop'><Nav.Link href='/challenges'><button className="dropdown-item" type="button"><span><BsBullseye /></span>التحديات</button></Nav.Link></li>
                <li className='drop'><Nav.Link href='/Test'><button className="dropdown-item" type="button"><span><ImExit /></span>التحديات</button></Nav.Link></li>               
                </ul>  
                  : 
                  <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`} aria-labelledby="userDropdown" style={{fontSize:'12px',marginBottom:'-10px'}}>         
                    <li><Nav.Link href='/تسجيل الدخول'><button className="dropdown-item" type="button">تسجيل الدخول</button></Nav.Link></li>
                    <li><Nav.Link href="/تسجيل حساب جديد"><button className="dropdown-item" type="button">تسجيل حساب جديد</button></Nav.Link></li>
                    {/* <li><Nav.Link href="/user dashboard"><button className="dropdown-item" type="button" onClick={handleLogout}>Logout</button></Nav.Link></li> */}
                  </ul>  
                  }

              </div>
              </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;