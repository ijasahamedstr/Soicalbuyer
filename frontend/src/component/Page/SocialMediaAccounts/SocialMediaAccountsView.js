import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './Social Media Accounts.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { LuMessagesSquare } from "react-icons/lu";
import Swal from 'sweetalert2';  // Import SweetAlert2
import axios from 'axios';



function MyPaymentModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" style={{fontSize:'18px'}}>
        تعليمات البائع
        </Modal.Title>
      </Modal.Header>
      <p style={{color:'red',padding:'10px'}}>الحساب مربوط ب ايدي سوني موجود بنفس إيميل الايبك<br/><span style={{color:'black'}}>إختيار طريقة الدفع</span></p>

        <Modal.Body>
          <div className='btn'>
             <Button variant="primary" style={{background:'#73a73e',width:'100%',border:'none',marginBottom:'10px'}}>
              العملات الرقمية
              </Button>
              <Button variant="primary" style={{background:'#a73e3e',width:'100%',border:'none'}}>
              فيزا - ماستر كارد - مدى - ابل باي - استي سي باي 
              </Button>
          </div>
       
      </Modal.Body>
    </Modal>
  );
}


function SoiaclAcoountView({ isOTPLoggedIn, OTPLoggedUserData }) {
  const [userdata, setUserdata] = useState(null);
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const  marginTopValue = '50px',marginBottomValue = '10px';
  const [modalShow, setModalShow] = React.useState(false);
  const [userid, setUserid] = useState('');
  const [feedback, setFeedback] = useState('');
  const [userinfo, setUserInfo] = useState(null);

  // Fetch and set user data
  useEffect(() => {
    if (isOTPLoggedIn) {
      setUserdata(OTPLoggedUserData?.preuser || {});
    }
  }, [isOTPLoggedIn, OTPLoggedUserData]);

  // Fetch user data from localStorage and set interval
  useEffect(() => {
    const fetchUserData = () => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      setUserdata(userDetails || {}); // Fallback to empty object
    };

    fetchUserData();
    const intervalId = setInterval(fetchUserData, 300000); // 5 minutes interval

    return () => clearInterval(intervalId);
  }, []);

  // Fetch item data
  useEffect(() => {
    const getUserId=localStorage.getItem("socialMediaAccountViewId")
    const fetchItem = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_HOST}/register/${getUserId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserInfo(data);        
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, []);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_HOST}/soical/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setItem(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!item) {
    return <div>Item not found</div>;
  }

  // Check if the current user is the owner of the item
  const isOwner = userdata?._id === item?.userid;

  const getImageForPlatform = (social_type) => {
    switch (social_type) {
      case 'instagram':
        return 'https://usr.dokan-cdn.com/instagram.png';
      case 'tiktok':
        return 'https://usr.dokan-cdn.com/tiktok.png';
      case 'twitter':
        return 'https://usr.dokan-cdn.com/twitter.png';
      case 'steam':
        return 'https://usr.dokan-cdn.com/steam.png';
      default:
        return 'https://usr.dokan-cdn.com/default.png';
    }
  };


  
  const getImageForPlatform1 = (social_type) => {
    switch (social_type) {
      case 'instagram':
        return 'https://usr.gg/img/social/instagram.png';
      case 'tiktok':
        return 'https://usr.gg/img/social/tiktok.png';
      case 'twitter':
        return 'https://usr.gg/img/social/twitter.png';
      case 'steam':
        return 'https://usr.gg/img/social/steam.png';
      default:
        return 'https://usr.dokan-cdn.com/default.png';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/feedback`, {
        userid,
        feedback,
      });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Feedback submitted successfully!',
        });
        setUserid('');
        setFeedback('');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Submission failed. Please try again.',
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'An unexpected error occurred. Please try again later.';
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: errorMessage,
      });
    }
  };


  return (
    <>
     <Container>
    {/* Stack the columns on mobile by making one full-width and the other half-width */}
    <Row>
    <div style={{marginTop:marginTopValue,marginBottom:marginBottomValue}}></div>
      <Col style={{backgroundColor:'#FFFFFF'}}>
      </Col>
    </Row>
    <Row>
        <Col sm={7} style={{marginBottom:'15px'}}>
        <div class="col d-flex align-items-center justify-content-center">
        <div className="col-12 col-md-6 col-lg-9">
        <div class="col-12">
        <div class="col-12">
        <div class="sign">
        <div class="sign__content" style={{background:'#222227',borderRadius:'30px',justifyContent:'center',height:'950px'}}>
        <Card.Img variant="top" src={getImageForPlatform(item.social_type)}  style={{borderRadius:'30px',width:'50%',marginTop:'0px'}}  />
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </Col>
        <Col sm={5}>
        <Card style={{background:'#F8F9F9',marginBottom:'30px',border:'none',marginTop:'0px',lineHeight:'20px'}}>
        <Card.Body>
        <Card.Title style={{fontSize:'25px'}}>وصف الحساب</Card.Title>
        <Card.Subtitle className="mb-2 text-muted" style={{marginTop:'15px',fontSize:'15px'}}>{item.social_dec}</Card.Subtitle>
        <Card.Text style={{marginTop:'30px',color:'red'}}>
        إبلاغ
        </Card.Text>
        <ul className="asset__authors">
        <li>
        <span>البائع</span>
        <div className="asset__author  ">
        <img src={`/uploads/${userinfo?.imgpath || "https://usr.dokan-cdn.com/img/avatars/default.jpg"}`} alt=""/>
        <div style={{display:'grid'}}>
            <div>@{userinfo?.displayName}</div>
            <div class="star-rating">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <span>/0</span>     
            </div>
        </div>
        </div>
        </li>
        <li>
        <span>المنصة</span>
        <div class="asset__author ">
        <img src={getImageForPlatform1(item.social_type)} alt=""/>
        <div>{item.social_type}</div>
        </div>
        </li>
        </ul>
        <Tabs
        defaultActiveKey="تفاصيل التسليم"
        id="justify-tab-example"
        justify
        >
        <Tab eventKey="تفاصيل التسليم" title="تفاصيل التسليم" style={{marginBottom:'20px',marginTop:'20px'}}>
        <span style={{ fontFamily: 'Changa, sans-serif' }}>تسليم تلقائي؟</span>
        <p style={{color:'#0081e3',fontFamily: 'Changa, sans-serif' }}>نعم</p>
        <span style={{ fontFamily: 'Changa, sans-serif' }}>مع الأيميل الأساسي؟</span>
        <p style={{color:'#00e300',fontFamily: 'Changa, sans-serif' }}>نعم</p>
        <span style={{ fontFamily: 'Changa, sans-serif' }}>مع الأيميل الحالي؟</span>
        <p style={{color:'#e3cc00' , fontFamily: 'Changa, sans-serif' }}>لا</p>
        <span style={{color:'red', fontFamily: 'Changa, sans-serif' }}>مربوط برقم؟</span>
        <p style={{color:'#00ff04',fontFamily: 'Changa, sans-serif' }}>لا</p>
        <span style={{color:'red', fontFamily: 'Changa, sans-serif' }}>صاحب المنتج موثق بهوية؟</span>
        <p style={{color:'#00ff04',fontFamily: 'Changa, sans-serif' }}>نعم</p>
        </Tab>
        <Tab eventKey="أخرى" title="أخرى" style={{marginBottom:'20px',marginTop:'20px'}}>
        <span style={{ fontFamily: 'Changa, sans-serif' }}>عدد المُتابعين (Followers)</span>
        <p style={{color:'#9152ff',fontFamily: 'Changa, sans-serif'}}>0</p>
        <span style={{ fontFamily: 'Changa, sans-serif' }}>عدد المتابعات (Following)</span>
        <p style={{color:'#6722dd',fontFamily: 'Changa, sans-serif'}}>0</p>
        </Tab>
        </Tabs>
      
        {isOwner ? (
        // Render edit button for the owner
        <Link to={`/soicaledit/${item._id}`} style={{ textDecoration: 'none', width:'100%' }}>
        <button className="asset__btn asset__btn--clr open-modal">
            تعديل
        </button>
        </Link>
          ) : (
        // Render buy button for others
        <Button variant="primary" style={{ textDecoration: 'none', width:'100%' }}  onClick={() => setModalShow(true)} >
        <span>(${item.social_amount})</span>شراء
        </Button>                      
        )}
       
        <div class="a2a_kit a2a_kit_size_32 a2a_default_style mt-3" style={{lineHeight:'32px'}}>
        <div className="iconfont">
        <a class="a2a_button_whatsapp" target="_blank" rel="nofollow noopener" href="/#whatsapp"><span style={{background:'rgb(97, 100, 255)'}} class="a2a_svg a2a_s__default a2a_s_whatsapp" ><svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#FFF" fill-rule="evenodd" d="M16.21 4.41C9.973 4.41 4.917 9.465 4.917 15.7c0 2.134.592 4.13 1.62 5.832L4.5 27.59l6.25-2.002a11.24 11.24 0 0 0 5.46 1.404c6.234 0 11.29-5.055 11.29-11.29 0-6.237-5.056-11.292-11.29-11.292m0 20.69c-1.91 0-3.69-.57-5.173-1.553l-3.61 1.156 1.173-3.49a9.35 9.35 0 0 1-1.79-5.512c0-5.18 4.217-9.4 9.4-9.4s9.397 4.22 9.397 9.4c0 5.188-4.214 9.4-9.398 9.4zm5.293-6.832c-.284-.155-1.673-.906-1.934-1.012-.265-.106-.455-.16-.658.12s-.78.91-.954 1.096c-.176.186-.345.203-.628.048-.282-.154-1.2-.494-2.264-1.517-.83-.795-1.373-1.76-1.53-2.055s0-.445.15-.584c.134-.124.3-.326.45-.488.15-.163.203-.28.306-.47.104-.19.06-.36-.005-.506-.066-.147-.59-1.587-.81-2.173-.218-.586-.46-.498-.63-.505-.168-.007-.358-.038-.55-.045-.19-.007-.51.054-.78.332-.277.274-1.05.943-1.1 2.362-.055 1.418.926 2.826 1.064 3.023.137.2 1.874 3.272 4.76 4.537 2.888 1.264 2.9.878 3.43.85.53-.027 1.734-.633 2-1.297s.287-1.24.22-1.363c-.07-.123-.26-.203-.54-.357z" clip-rule="evenodd"></path></svg></span><span class="a2a_label"></span></a>
        <a class="a2a_button_twitter" target="_blank" rel="nofollow noopener" href="/#twitter"><span style={{background:'rgb(97, 100, 255)'}} class="a2a_svg a2a_s__default a2a_s_twitter" ><svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#FFF" d="M28 8.557a10 10 0 0 1-2.828.775 4.93 4.93 0 0 0 2.166-2.725 9.7 9.7 0 0 1-3.13 1.194 4.92 4.92 0 0 0-3.593-1.55 4.924 4.924 0 0 0-4.794 6.049c-4.09-.21-7.72-2.17-10.15-5.15a4.94 4.94 0 0 0-.665 2.477c0 1.71.87 3.214 2.19 4.1a5 5 0 0 1-2.23-.616v.06c0 2.39 1.7 4.38 3.952 4.83-.414.115-.85.174-1.297.174q-.476-.001-.928-.086a4.935 4.935 0 0 0 4.6 3.42 9.9 9.9 0 0 1-6.114 2.107q-.597 0-1.175-.068a13.95 13.95 0 0 0 7.55 2.213c9.056 0 14.01-7.507 14.01-14.013q0-.32-.015-.637c.96-.695 1.795-1.56 2.455-2.55z"></path></svg></span><span class="a2a_label"></span></a>
        <a class="a2a_button_telegram" target="_blank" rel="nofollow noopener" href="/#telegram"><span style={{background:'rgb(97, 100, 255)'}} class="a2a_svg a2a_s__default a2a_s_telegram" ><svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#FFF" d="M25.515 6.896 6.027 14.41c-1.33.534-1.322 1.276-.243 1.606l5 1.56 1.72 5.66c.226.625.115.873.77.873.506 0 .73-.235 1.012-.51l2.43-2.363 5.056 3.734c.93.514 1.602.25 1.834-.863l3.32-15.638c.338-1.363-.52-1.98-1.41-1.577z"></path></svg></span><span class="a2a_label"></span></a>
        <a class="a2a_button_copy_link" target="_blank" rel="nofollow noopener" href="/#copy_link"><span style={{background:'rgb(97, 100, 255)'}} class="a2a_svg a2a_s__default a2a_s_link" ><svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#fff" d="M7.591 21.177q0-.54.377-.917l2.804-2.804a1.24 1.24 0 0 1 .913-.378q.565 0 .97.43-.038.041-.255.25-.215.21-.29.29a3 3 0 0 0-.2.256 1.1 1.1 0 0 0-.177.344 1.4 1.4 0 0 0-.046.37q0 .54.377.918a1.25 1.25 0 0 0 .918.377q.19.001.373-.047.189-.056.345-.175.135-.09.256-.2.15-.14.29-.29c.14-.142.223-.23.25-.254q.445.42.445.984 0 .539-.377.916l-2.778 2.79a1.24 1.24 0 0 1-.917.364q-.54-.001-.917-.35l-1.982-1.97a1.22 1.22 0 0 1-.378-.9zm9.477-9.504q0-.54.377-.917l2.777-2.79a1.24 1.24 0 0 1 .913-.378q.525-.001.917.364l1.984 1.968q.38.378.38.903 0 .54-.38.917l-2.802 2.804a1.24 1.24 0 0 1-.916.364q-.565 0-.97-.418.038-.04.255-.25a8 8 0 0 0 .29-.29q.108-.12.2-.255.121-.156.176-.344.048-.181.047-.37 0-.538-.377-.914a1.25 1.25 0 0 0-.917-.377q-.205 0-.37.046-.172.046-.346.175a4 4 0 0 0-.256.2q-.08.076-.29.29l-.25.258q-.441-.417-.442-.983zM5.003 21.177q0 1.617 1.146 2.736l1.982 1.968c.745.75 1.658 1.12 2.736 1.12q1.63 0 2.75-1.143l2.777-2.79c.75-.747 1.12-1.66 1.12-2.737q.002-1.66-1.183-2.818l1.186-1.185q1.16 1.185 2.805 1.186 1.617 0 2.75-1.13l2.803-2.81q1.127-1.132 1.128-2.748 0-1.62-1.146-2.738L23.875 6.12Q22.758 4.999 21.139 5q-1.63 0-2.75 1.146l-2.777 2.79c-.75.747-1.12 1.66-1.12 2.737q-.002 1.658 1.183 2.817l-1.186 1.186q-1.16-1.186-2.805-1.186-1.617 0-2.75 1.132L6.13 18.426Q5 19.559 5 21.176z"></path></svg></span><span class="a2a_label"> </span></a>
        <a class="a2a_dd" href="https://www.addtoany.com/share#url=https%3A%2F%2Fusr.gg%2Fgaming%2F7960&amp;title=%D9%85%D9%86%D8%B5%D8%A9%20%D9%8A%D9%88%D8%B2%D8%B1%20%E2%80%93%20%D8%AD%D8%B3%D8%A7%D8%A8%20%D9%81%D9%88%D8%B1%D8%AA%20%D8%A7%D9%8A%D9%83%D9%88%D9%86%D9%8A%D9%83%20%2B%20%D8%B3%D9%8A%D8%B2%D9%88%D9%86%203%20%D9%83%D8%A7%D9%85%D9%84%F0%9F%94%A5"><span style={{background:'rgb(97, 100, 255)'}} class="a2a_svg a2a_s__default a2a_s_a2a" ><svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g fill="#FFF"><path d="M14 7h4v18h-4z"></path><path d="M7 14h18v4H7z"></path></g></svg></span><span class="a2a_label a2a_localize" data-a2a-localize="inner,Share"></span></a>
        </div>
        <div></div></div>
        </Card.Body>
    </Card>
        </Col>
      </Row>
  </Container>
      <MyPaymentModal
      show={modalShow}
      onHide={() => setModalShow(false)}
      /> 
    <Container fluid="md">
      <Row>
        <Col>
        <Form className='sign__form' onSubmit={handleSubmit}>
        <h1 class="page-404__title"  id="xLoader"><LuMessagesSquare /></h1>
        <p>لايوجد تعليقات</p>
        <p>الوضع ركود لايوجد اي تعليق</p>

        <Form.Group className="mb-3" controlId="formGridAddress2" style={{ width: '100%' }}>
        <Form.Control  
          name="userid" 
          value={userdata?._id} 
          onChange={(e) => setUserid(e.target.value)}
          className="hidden"
        />
      </Form.Group>


        <Form.Group className="mb-3" controlId="formGridReason" style={{width:'100%'}}>
        <Form.Control as="textarea" rows={4} className='sign__textarea' placeholder="سبب التحويل" style={{width:'100%'}} value={feedback}
          onChange={(e) => setFeedback(e.target.value)} />
        </Form.Group>

        <p>* لاتذكر أي طريقة للتواصل خارج المنصة سيعرض حسابك للحظر مباشرة</p>

        <Button variant="primary" type="submit" style={{fontFamily:'Noto Kufi Arabic'}}>
        إرسال
        </Button>
      
        </Form>
        </Col>
      </Row>
    </Container>

    </>
  );
}

export default SoiaclAcoountView;