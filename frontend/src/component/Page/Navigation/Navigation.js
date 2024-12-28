import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Navbar.css';
import { FaRegUserCircle } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import { ImCoinDollar } from "react-icons/im";
import { IoWallet } from "react-icons/io5";
import { BsArchiveFill, BsChatDots, BsFillPersonXFill, BsBullseye } from "react-icons/bs";
import { PiBroadcastBold } from "react-icons/pi";
import { BiSolidBellRing } from "react-icons/bi";
import { IoFingerPrintSharp } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function OffcanvasExample({ isOTPLoggedIn, OTPLoggedUserData }) {
  const [userdata, setUserdata] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOTPLoggedIn) {
      setUserdata(OTPLoggedUserData?.preuser || {});
    } else {
      const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
      setUserdata(storedUserDetails);
    }
  }, [isOTPLoggedIn, OTPLoggedUserData]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("userdbtoken");
        const res = await fetch("/validuser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          }
        });
        const data = await res.json();

        if (data.status === 401 || !data) {
          console.log("User not valid");
        } else {
          console.log("User verified");
        }
      } catch (error) {
        console.error("Error validating user:", error);
      }
    };

    fetchDashboardData();
    const intervalId = setInterval(fetchDashboardData, 300000); // Fetch user details every 5 minutes
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [navigate]);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const logoutFunction = () => {
    localStorage.clear();
    window.location.reload();
    navigate('/');
  };

  const handleMenuClick = () => setShowOffcanvas(false); // Closes offcanvas on click

  const user = {
    avatar: 'https://digilaser.sa/wp-content/uploads/2024/04/78-removebg-preview.png',
  };

  return (
    <Navbar expand="sm" className="p-3 mb-2 bg-dark text-white bg-body-tertiary" data-bs-theme="dark" style={{ width: '100%', marginTop: '-16px', fontFamily: 'Noto Kufi Arabic' }}>
      <Container>
        <Navbar.Brand href="#">
          <img src={user.avatar} className="img-fluid" style={{ width: '100px', height: 'auto' }} alt="User Avatar" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={() => setShowOffcanvas(!showOffcanvas)} />
        <Navbar.Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} placement="end">
          <Offcanvas.Header closeButton style={{ background: '#16151a' }}>
            <Offcanvas.Title>
              <img src={user.avatar} className="img-fluid" style={{ width: '100px', height: 'auto' }} alt="User Avatar" />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body style={{ color: 'black', fontFamily: 'Noto Kufi Arabic', background: '#303434' }}>
            <Nav className="justify-content-start flex-grow-1 pe-3">
              <Nav.Link><Link className="text-white text-decoration-none" to="/" onClick={handleMenuClick}>الرئيسية</Link></Nav.Link>
              <Nav.Link><Link className="text-white text-decoration-none" to="/التواصل الإجتماعي" onClick={handleMenuClick}>التواصل الإجتماعي</Link></Nav.Link>
              <Nav.Link><Link className="text-white text-decoration-none" to="/الألعاب" onClick={handleMenuClick}>الألعاب</Link></Nav.Link>
              <Nav.Link><Link className="text-white text-decoration-none" to="/الخدمات" onClick={handleMenuClick}>الخدمات</Link></Nav.Link>
              <Nav.Link><Link className="text-white text-decoration-none" to="/الأعضاء" onClick={handleMenuClick}>الأعضاء</Link></Nav.Link>
              <Nav.Link><Link className="text-white text-decoration-none" to="/طلبات المستخدمين" onClick={handleMenuClick}><span className='navb'>جديد</span>طلبات المستخدمين</Link></Nav.Link>
              <Nav.Link><Link className="text-white text-decoration-none" to="/متجر المنصة" onClick={handleMenuClick}>متجر المنصة</Link></Nav.Link>
            </Nav>

            {userdata && userdata.Accountstatus === 'verified' && (
              <Nav.Link href='/Sell'>
                <button type="button" className="btn btn-light" style={{ width: '100px', height: '40px', marginBottom: '10px', marginRight: '10px' }}>🚀بيع</button>
              </Nav.Link>
            )}

            {userdata ? (
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <div className="dropdown" onClick={toggleDropdown} style={{ color: '#ffffff' }}>
                  <div className="card__author">
                    <img src={userdata?.image || "https://usr.dokan-cdn.com/img/avatars/default.jpg"} alt="" className="img-fluid" />
                    {userdata?.displayName}
                  </div>
                  <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`} aria-labelledby="userDropdown" style={{ fontSize: '12px', marginBottom: '-10px' }}>
                    <li><Link to={`/${userdata?.username}`} onClick={handleMenuClick}><button className="dropdown-item"><FaRegUserCircle /> حسابي</button></Link></li>
                    <li><Link to='/Requests' onClick={handleMenuClick}><button className="dropdown-item"><MdWorkHistory /> المبيعات</button></Link></li>
                    <li><Link to='/sales' onClick={handleMenuClick}><button className="dropdown-item"><ImCoinDollar /> المحفظة</button></Link></li>
                    <li><Link to='/wallet' onClick={handleMenuClick}><button className="dropdown-item"><IoWallet /> الصندوق</button></Link></li>
                    <li><Link to='/Points' onClick={handleMenuClick}><button className="dropdown-item"><BsArchiveFill /> ترويج منتج</button></Link></li>
                    <li><Link to='/boost' onClick={handleMenuClick}><button className="dropdown-item"><PiBroadcastBold /> المحادثات</button></Link></li>
                    <li><Link to='/Chat' onClick={handleMenuClick}><button className="dropdown-item"><BsChatDots /> التنبيهات</button></Link></li>
                    <li><Link to='/notifications' onClick={handleMenuClick}><button className="dropdown-item"><BiSolidBellRing /> قائمة الحظر</button></Link></li>
                    <li><Link to='/blocks' onClick={handleMenuClick}><button className="dropdown-item"><BsFillPersonXFill /> تفعيل الحساب</button></Link></li>
                    <li><Link to='/verify-account' onClick={handleMenuClick}><button className="dropdown-item"><IoFingerPrintSharp /> تفعيل رقم الهاتف</button></Link></li>
                    <li><Link to='/تسجيل الدخول' onClick={handleMenuClick}><button className="dropdown-item" style={{ color: 'red' }}><IoFingerPrintSharp /> حاسبة الرسوم</button></Link></li>
                    <li><Link to='/challenges' onClick={handleMenuClick}><button className="dropdown-item"><BsBullseye /> التحديات</button></Link></li>
                    <li><button className="dropdown-item" onClick={logoutFunction}><ImExit /> تسجيل الخروج</button></li>
                  </ul>
                </div>
              </Nav>
            ) : (
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <div className="dropdown" onClick={toggleDropdown} style={{ color: '#ffffff' }}>
                  <div className="card__author">
                    <img src="https://usr.dokan-cdn.com/img/avatars/default.jpg" alt="" />
                    زائر
                  </div>
                  <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`} aria-labelledby="userDropdown" style={{ fontSize: '12px', marginBottom: '-10px' }}>
                    <li><Nav.Link href='/تسجيل الدخول'><button className="dropdown-item">تسجيل الدخول</button></Nav.Link></li>
                    <li><Nav.Link href="/تسجيل حساب جديد"><button className="dropdown-item"> حساب جديد</button></Nav.Link></li>
                  </ul>
                </div>
              </Nav>
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default OffcanvasExample;
