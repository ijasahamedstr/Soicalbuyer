import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
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
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';


function OffcanvasExample() {

  const [userdata, setUserdata] = useState({});
  console.log("response", userdata)

  const getUser = async () => {
      try {
          const response = await axios.get("http://localhost:8000/login/sucess", { withCredentials: true });

          setUserdata(response.data.user)
      } catch (error) {
          console.log("error", error)
      }
  }

  // logoout
  const logout = ()=>{
      window.open("http://localhost:8000/logout","_self")
  }

  useEffect(() => {
      getUser()
  }, [])

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
                <Nav.Link><Link  style={{color:'#FFFFFF',textDecoration:'none'}} to="/التواصل الإجتماعي">التواصل الإجتماعي</Link></Nav.Link>
                <Nav.Link><Link  style={{color:'#FFFFFF',textDecoration:'none'}} to="/الألعاب">الألعاب</Link></Nav.Link>
                <Nav.Link><Link  style={{color:'#FFFFFF',textDecoration:'none'}} to="/الخدمات">الخدمات</Link></Nav.Link>
                <Nav.Link><Link  style={{color:'#FFFFFF',textDecoration:'none'}} to="/الأعضاء">الأعضاء</Link></Nav.Link>
                <Nav.Link><Link  style={{color:'#FFFFFF',textDecoration:'none'}} to="/طلبات المستخدمين"><span  className='navb'>جديد</span>طلبات المستخدمين</Link></Nav.Link>
                <Nav.Link><Link  style={{color:'#FFFFFF',textDecoration:'none'}} to="/متجر المنصة">متجر المنصة</Link></Nav.Link>
                </Nav>
                {
                  Object?.keys(userdata)?.length > 0 ? (
                    <>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                    <div className="dropdown " onClick={toggleDropdown} style={{color:'#ffffff'}}>
                    <div class="card__author  card__author">
                    <img src={userdata?.image} alt="" />{userdata?.displayName}</div>
                    <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`} aria-labelledby="userDropdown" style={{fontSize:'12px',marginBottom:'-10px'}}>
                    <li className='drop'><Link to='/User'><button className="dropdown-item" type="button"><span><FaRegUserCircle /></span>حسابي</button></Link></li>
                    <li className='drop'><Link to='/Requests'><button className="dropdown-item" type="button"><span><MdWorkHistory /></span>الطلبات</button></Link></li>
                    <li className='drop'><Link to='/sales'><button className="dropdown-item" type="button"><span><ImCoinDollar /></span>المبيعات</button></Link></li>
                    <li className='drop'><Link to='/wallet'><button className="dropdown-item" type="button"><span><IoWallet /></span>المحفظة</button></Link></li>
                    <li className='drop'><Link to='/Points'><button className="dropdown-item" type="button"><span><BsArchiveFill /></span>الصندوق</button></Link></li>
                    <li className='drop'><Link to='/boost'><button className="dropdown-item" type="button"><span><PiBroadcastBold /></span>ترويج منتج</button></Link></li>
                    <li className='drop'><Link to='/Chat'><button className="dropdown-item" type="button"><span><BsChatDots /></span>المحادثات</button></Link></li>
                    <li className='drop'><Link to='/notifications'><button className="dropdown-item" type="button"><span><BiSolidBellRing /></span>التنبيهات</button></Link></li>
                    <li className='drop'><Link to='/blocks'><button className="dropdown-item" type="button"><span><BsFillPersonXFill /></span>قائمة الحظر</button></Link></li>
                    <li className='drop'><Link to='/verify-account'><button className="dropdown-item" type="button"><span><IoFingerPrintSharp /></span>تفعيل الحساب</button></Link></li>
                    <li className='drop'><Link to='/تسجيل الدخول'><button style={{color:'red'}} className="dropdown-item" type="button"><span><IoFingerPrintSharp /></span>تفعيل رقم الهاتف</button></Link></li>
                    <li className='drop'><Link to='/challenges'><button className="dropdown-item" type="button"><span><BsBullseye /></span>التحديات</button></Link></li>
                    <li className='drop'><button className="dropdown-item" type="button" onClick={logout}><span><ImExit /></span>التحديات</button></li>               
                    </ul>  
                  </div>
                  </Nav>            
                    </>
                    ) : 
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                    <div className="dropdown " onClick={toggleDropdown} style={{color:'#ffffff'}}>
                    <div class="card__author  card__author">
                    <img src="https://usr.dokan-cdn.com/img/avatars/default.jpg" alt="" />زائر </div>
                    <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`} aria-labelledby="userDropdown" style={{fontSize:'12px',marginBottom:'-10px'}}>         
                    <li><Nav.Link href='/تسجيل الدخول'><button className="dropdown-item" type="button">تسجيل الدخول</button></Nav.Link></li>
                    <li><Nav.Link href="/تسجيل حساب جديد"><button className="dropdown-item" type="button">تسجيل حساب جديد</button></Nav.Link></li>
                    </ul>  
                  </div>
                  </Nav>            
                 }
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;