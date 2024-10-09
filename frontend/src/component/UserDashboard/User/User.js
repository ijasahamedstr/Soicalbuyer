import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './User.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';

const truncateText = (text = '', maxLength) => {
  if (typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};


function User({ userdata}) {
  const [userDetails, setUserDetails] = useState({
    displayName: '',
    username: '',
    email: '',
    Phone: '',
    bio: '',
    Referrallink: '',
  });
  const [validated, setValidated] = useState(false);
  const [updatedFile, setUpdatedFile] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/register/${userdata._id}`);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userdata) {
      fetchUserDetails();
      const intervalId = setInterval(fetchUserDetails, 5000); // Fetch user details every 5 seconds
      return () => clearInterval(intervalId); // Cleanup on unmount
    }
  }, [userdata]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_HOST}/register/${userdata._id}`, userDetails, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Account updated successfully!'
        });
        setUserDetails(response.data);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Update failed. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error updating user:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update account. Please try again later.'
      });
    }
  };

  const updateUserData = async () => {
    if (!userdata) return;

    try {
      const formData = new FormData();
      if (updatedFile) {
        formData.append('photo', updatedFile);
      }
   

      const res = await axios.put(`${process.env.REACT_APP_API_HOST}/register/${userdata._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.status === 401 || !res.data) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error occurred while updating data!',
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'User data updated successfully.',
        });
        setUserDetails(res.data);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to update user data. Please try again later.'
      });
    }
  };


  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/gameaccount`); // Replace with actual API endpoint
        // Filter the data based on the current user's ID
        const userPosts = response.data.filter(item => item.userid === userdata._id);
        setData(userPosts);
      } catch (error) {
        setError(error.message); // Handle error
      } finally {
        setLoading(false); // Set loading to false once data is fetched or error occurs
      }
    };

    fetchData();
  }, [userdata._id]); // Depend on userId to re-fetch data if userId changes


  const [data1, setData1] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [error1, setError1] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/soical`); // Replace with actual API endpoint
        // Filter the data based on the current user's ID
        const userPosts = response.data.filter(item => item.userid === userdata._id);
        setData1(userPosts);
      } catch (error) {
        setError1(error.message); // Handle error
      } finally {
        setLoading1(false); // Set loading to false once data is fetched or error occurs
      }
    };

    fetchData();
  }, [userdata._id]); // Depend on userId to re-fetch data if userId changes


  const [data2, setData2] = useState([]);
  const [loading2, setLoading2] = useState(true);
  const [error2, setError2] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/service`); // Replace with actual API endpoint
        // Filter the data based on the current user's ID
        const userPosts = response.data.filter(item => item.userid === userdata._id);
        setData2(userPosts);
      } catch (error) {
        setError2(error.message); // Handle error
      } finally {
        setLoading2(false); // Set loading to false once data is fetched or error occurs
      }
    };

    fetchData();
  }, [userdata._id]); // Depend on userId to re-fetch data if userId changes


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

  
  return (
    <>
      <div className="main__author">
        <img src='https://cdn.usr.gg/img/bg/bg.png' alt="Logo of the company" style={{ marginTop: '-9px' }} />
      </div>
      <Container style={{ marginTop: '60px' }}>
        <Row>
          <Col sm={4} style={{ marginTop: '60px' }}>
            <div className="user-card">
              <div className='uper-container'>
                <div className='image-card'>
                  <img className="avatar"  src={`${process.env.REACT_APP_API_HOST}/uploads/${userDetails.imgpath || "https://usr.dokan-cdn.com/img/avatars/default.jpg"}`}  alt="User Avatar" />
                </div>
              </div>
              <div className="user-info">
                <h2>{userDetails.displayName}<span className="pro-badge">برو</span></h2>
                <p>{userDetails.email}</p>
                <p>{userDetails.bio}</p>
              </div>
              <div className="author__wrap" style={{ display: 'inline', marginTop: '15px' }}>
                <div className="author__followers mr-2">
                  <p>{userDetails.posts}</p>
                  <span>عدد المبيعات</span>
                </div>
                <div className="author__followers ">
                  <p>${userDetails.currentbalance}</p>
                  <span>مجمل المبيعات</span>
                </div>
              </div>
            </div>
          </Col>
          <Col sm={8}>
            <Container>
              <Row style={{ marginTop: '30px', fontWeight: '700' }}>
                <Col>
                  {/* Social Media Card Section */}
                  <Tabs defaultActiveKey="التواصل الإجتماعي" id="fill-tab-example" fill>
                  <Tab eventKey="التواصل الإجتماعي" title="التواصل الإجتماعي">
                    <Container>
                      {data1.length > 0 ? (
                        <Row style={{ marginTop: '30px', fontWeight: '700' }}>
                          {data1.map(item => (
                            <Col md={4} key={item._id}>
                              <Card style={{ backgroundColor: '#F2F3F4' }}>
                              <Nav.Link href={`/social-media-accounts-view/${item._id}`}>
                                <Card.Img  variant="top" src={getImageForPlatform(item.social_type)} />
                                </Nav.Link>
                                <Card.Body>
                                  <Card.Title>{item.social_username}</Card.Title>
                                  <Card.Text>
                                    <div className="card__author card__author--verified" style={{ borderRadius: '20px' }}>
                                      <img src={`${process.env.REACT_APP_API_HOST}/uploads/${userDetails.imgpath || "https://usr.dokan-cdn.com/img/avatars/default.jpg"}`} alt="" />
                                      <a href={`https://usr.gg/${userDetails?.username}`}>{userDetails?.displayName}</a>
                                    </div>
                                  </Card.Text>
                                </Card.Body>
                                <Card.Body>
                                  <Card.Link href="#">
                                    <div className='card__likes'><span className='card__likes1'>🚀بوست</span></div>
                                  </Card.Link>
                                  <Card.Link href="#">
                                    <div className="card__price">
                                      <span>السعر</span>
                                      <span dir="rtl">
                                        <span className="account_price_previe">${item.social_amount}</span>
                                      </span>
                                    </div>
                                  </Card.Link>
                                </Card.Body>
                              </Card>
                            </Col>
                          ))}
                        </Row>
                      ) : (
                        <p style={{ textAlign: 'center', marginTop: '30px', fontSize: '18px', color: 'rgb(97, 100, 255)' ,fontWeight:'normal' }}>
                          لايوجد منتجات
                        </p>
                      )}
                    </Container>
                  </Tab>
                    {/* End Social Media Card Section */}

                    <Tab eventKey="ijas" title="التواصل الإجتماعي">
                    <Container>
                      {data && data.length > 0 ? (
                        <Row className="mb-4">
                          {data.map(item => (
                            <Col md={4} key={item._id}>
                              <Card style={{ backgroundColor: '#F2F3F4' }}>
                                <Card.Header>
                                  <div className='card__likes'>
                                    <span className='card__likes1'>🚀بوست</span>
                                  </div>
                                </Card.Header>
                                <Nav.Link href={`/game-view/${item._id}`}>
                                  <Card.Title>{item.gametitle}</Card.Title>
                                </Nav.Link>
                                <Card.Body>
                                  <Card.Text style={{ fontSize: '13px' }}>
                                    {truncateText(item.gamedec, 100)}
                                  </Card.Text>
                                  <Card.Text>
                                    <span>
                                      <div className="card__author card__author--verified">
                                        <img src={`${process.env.REACT_APP_API_HOST}/uploads/${userDetails.imgpath || "https://usr.dokan-cdn.com/img/avatars/default.jpg"}`} alt="Author Avatar" />
                                        <a href="https://usr.gg/meshari">@Ijas Ahamed</a>
                                      </div>
                                    </span>
                                  </Card.Text>
                                </Card.Body>
                                <ListGroup.Item>
                                  <h3 style={{ color: '#6164ff', fontSize: '24px' }}>${item.gameAmount}</h3>
                                  <div className='post__meta'>
                                    <span className="post__comments">
                                      {/* Game-related icon */}
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-controller" viewBox="0 0 16 16">
                                        {/* SVG paths */}
                                      </svg>
                                      <span>{item.gamename}</span>
                                    </span>
                                    <span className="post__comments">
                                      {/* Game-type icon */}
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe" viewBox="0 0 16 16">
                                        {/* SVG paths */}
                                      </svg>
                                      <span>{item.gametype}</span>
                                    </span>
                                  </div>
                                </ListGroup.Item>
                              </Card>
                            </Col>
                          ))}
                        </Row>
                      ) : (
                        <p style={{ textAlign: 'center', marginTop: '30px', fontSize: '25px', color: 'rgb(97, 100, 255)',fontWeight:'normal' }}>
                          لايوجد منتجات
                        </p>
                      )}
                    </Container>
                  </Tab>

                  
                  <Tab eventKey="Ahamed" title="الخدمات">
                    <Container>
                      {data2 && data2.length > 0 ? (
                        <Row className="mb-4">
                          {data2.map(item => (
                            <Col md={4} key={item._id}>
                               <Card style={{backgroundColor:'#F2F3F4'}}>
                              <Card.Title><div className='card__likes'><span className='card__likes1'>🚀بوست</span></div></Card.Title>
                              <Card.Title>
                              {item.service_heading} 
                              </Card.Title>
                              <Card.Body>
                                <Card.Text> {item.service_dec} </Card.Text>
                                <Card.Text>
                                </Card.Text>
                              </Card.Body>
                                  <ListGroup.Item>
                                  <h3 style={{ color: '#6164ff', fontSize: '24px'}}>$ {item.service_Amount} </h3>
                                  <div class="post__meta">
                                  <a class="post__date" href="https://usr.gg/450">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 17">
                                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
                                  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"></path>
                                  </svg>
                                  @{userDetails.displayName}
                                  </a>
                                  <span class="post__comments"  dir="rtl" title="الوقت التقريبي لتنفيذ الخدمة">
                                  ⏰ {item.service_time_houre}
                                  </span>
                                  <span class="post__comments">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-cart-check" viewBox="0 0 16 20">
                                  <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"></path>
                                  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                                  </svg>
                                  1906
                                  </span>
                                  </div>
                                </ListGroup.Item>
                            </Card>
                            </Col>
                          ))}
                        </Row>
                      ) : (
                        <p style={{ textAlign: 'center', marginTop: '30px', fontSize: '25px', color: 'rgb(97, 100, 255)',fontWeight:'normal' }}>
                          لايوجد منتجات
                        </p>
                      )}
                    </Container>
                  </Tab>


                    {/* Profile Setting Card Section */}
                    <Tab eventKey="الأعدادات" title="الأعدادات">
                      <Container style={{ marginTop: '30px' }}>
                        <Row>
                          {/* Profile Personal Data Setting Card Section */}
                          <Col md={6}>
                            <Card style={{ background: '#fff', padding: '0px' }}>
                              <Card.Body>
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                  <h4 className="sign__title" style={{ marginBottom: '20px', color: 'rgb(97, 100, 255)' }}>البيانات الشخصية</h4>
                                  <Row>
                                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                                      <Form.Label>Username</Form.Label>
                                      <Form.Control
                                        required
                                        type="text"
                                        name="username"
                                        placeholder="Enter username"
                                        value={userDetails.username}
                                        onChange={handleChange}
                                      />
                                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                                      <Form.Label>Email</Form.Label>
                                      <Form.Control
                                        required
                                        type="email"
                                        name="email"
                                        placeholder="Enter email"
                                        value={userDetails.email}
                                        onChange={handleChange}
                                      />
                                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                  </Row>
                                  <Row>
                                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                                      <Form.Label>Display Name</Form.Label>
                                      <Form.Control
                                        required
                                        type="text"
                                        name="displayName"
                                        placeholder="Enter display name"
                                        value={userDetails.displayName}
                                        onChange={handleChange}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        Please provide a valid display name.
                                      </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="validationCustom04">
                                      <Form.Label>Phone</Form.Label>
                                      <Form.Control
                                        required
                                        type="text"
                                        name="Phone"
                                        placeholder="Enter phone number"
                                        value={userDetails.Phone}
                                        onChange={handleChange}
                                      />
                                      <p className="mt-2" style={{ fontSize: '14px' }}>إذا كنت ترغب بتحديث رقم هاتفك , يرجى منك <a href="/ChangePhoneNumber">الضغط علي</a></p>
                                      <Form.Control.Feedback type="invalid">
                                        Please provide a valid phone number.
                                      </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="12" controlId="validationCustom05">
                                      <Form.Label>Bio</Form.Label>
                                      <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="bio"
                                        placeholder="Enter bio"
                                        value={userDetails.bio}
                                        onChange={handleChange}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        Please provide a bio.
                                      </Form.Control.Feedback>
                                    </Form.Group>
                                  </Row>
                                  <Button style={{ marginTop: '10px' }} type="submit">حفظ</Button>
                                </Form>
                              </Card.Body>
                            </Card>
                          </Col>

                          {/* Change the Appearance of the Account Setting Card Section */}
                          <Col md={6}>
                            <Card style={{ background: '#fff', padding: '0px' }}>
                              <Card.Body>
                                <Form onSubmit={(e) => { e.preventDefault(); updateUserData(); }}>
                                  <h4 className="sign__title" style={{ marginBottom: '20px', color: 'rgb(97, 100, 255)' }}>تغيير مظهر الحساب</h4>
                                  <Row>
                                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                                      <Form.Label>افتار الحساب</Form.Label>
                                      <Form.Control
                                        placeholder="افتار الحساب"
                                        className='sign__title'
                                        type="file"
                                        onChange={(e) => setUpdatedFile(e.target.files[0])}
                                      />
                                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                  </Row>
                                  <Button style={{ background: '#6164ff', marginTop: '20px' }} type="submit">حفظ</Button>
                                </Form>
                              </Card.Body>
                            </Card>
                          </Col>

                          {/* Referral Link Setting Card Section */}
                          <Col md={6}>
                            <Card style={{ background: '#fff', padding: '0px' }}>
                              <Card.Body>
                                <Form noValidate validated={validated} className='formuser' onSubmit={handleSubmit}>
                                  <h4 className="sign__title" style={{ marginBottom: '20px', color: 'rgb(97, 100, 255)' }}>رابط الإحاله</h4>
                                  <h5 className="sign__title" style={{ marginBottom: '20px', color: 'rgb(97, 100, 255)', fontSize: '15px' }}>يمكنك كسب أموال من خلال هذا الرابط!</h5>
                                  <Row>
                                    <Form.Group as={Col} controlId="validationCustom01">
                                      <Form.Label>رابط الإحاله</Form.Label>
                                      <Form.Control
                                        required
                                        type="text"
                                        placeholder="أدخل اسم المستخدم"
                                        className='sign__title'
                                        value={userDetails?.Referrallink + userDetails?.username}
                                        name="Referrallink"
                                        onChange={handleChange}
                                        
                                      />
                                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    </Form.Group>
                                  </Row>
                                  <Row>
                                    <Form.Group as={Col} controlId="validationCustom03">
                                      <Form.Label>خلفية الحساب</Form.Label>
                                      <Form.Control type="text" placeholder="خلفية الحساب"  value={userDetails?.Referral}  required style={{border:'none'}} />
                                      <Form.Control.Feedback type="invalid">
                                        Please provide a valid city.
                                      </Form.Control.Feedback>
                                    </Form.Group>
                                  </Row>
                                  <Row>
                                    <Form.Group as={Col} controlId="validationCustom03">
                                      <Form.Label>كم كسبت؟</Form.Label>
                                      <Form.Control type="text" placeholder="خلفية الحساب" value={userDetails?.Referralamount} required style={{border:'none'}} />
                                      <Form.Control.Feedback type="invalid">
                                        Please provide a valid city.
                                      </Form.Control.Feedback>
                                    </Form.Group>
                                  </Row>
                                  <Button style={{ marginTop: '10px' }} type="submit">حفظ</Button>
                                </Form>
                              </Card.Body>
                            </Card>
                          </Col>

                          {/* Account Details Setting Card Section */}
                          <Col md={6}>
                            <Card style={{ background: '#fff', padding: '0px', width: '100%' }}>
                              <Card.Body>
                                <h4 className="sign__title" style={{ marginBottom: '20px', color: 'rgb(97, 100, 255)' }}>تفاصيل الحساب</h4>
                                <Row>
                                  <ul className="knowledge__list">
                                    <li>رمز الدعم الفني<span>{userDetails.supportcode}</span></li>
                                    <li>عدد بوستاتي<span>{userDetails.posts}</span></li>
                                    <li>حالة التوثيق<span>{userDetails.documentationstatus}</span></li>
                                    <li>مستوى الحساب<span>{userDetails.Accountlevel}</span></li>
                                    <li>الرصيد الحالي<span>${userDetails.currentbalance}</span></li>
                                    <li>نوع الباقة<span>{userDetails.packagetype}</span></li>
                                    <li>تاريخ إنتهاء الباقة<span>{userDetails.packageexpirationdate}</span></li>
                                    <li>تاريخ إنشاء الحساب<span>{userDetails.createdAt}</span></li>
                                  </ul>
                                </Row>
                              </Card.Body>
                            </Card>
                          </Col>

                          {/* Other Options Setting Card Section */}
                          <Col md={6}>
                            <Card style={{ background: '#fff', padding: '0px', width: '100%' }}>
                              <Card.Body>
                                <h4 className="sign__title" style={{ marginBottom: '20px', color: 'rgb(97, 100, 255)' }}>خيارات اخرى</h4>
                                <Row>
                                  <div className="col-12" style={{ display: 'flex', gap: '10px' }}>
                                    <button className="sign__btn mr-3" type="button" style={{ background: 'red', textAlign: 'center', borderRadius: '15px', padding: '5px', fontFamily: 'Noto Kufi Arabic', color: 'white' }}>حذف جميع الحسابات المعروضة</button>
                                    <button className="sign__btn" type="button" style={{ background: 'red', textAlign: 'center', borderRadius: '15px', padding: '5px', fontFamily: 'Noto Kufi Arabic', color: 'white' }}>حذف جميع الخدمات المعروضة</button>
                                  </div>
                                  <div>
                                    <button className="sign__btn" type="button" style={{ background: 'red', textAlign: 'center', borderRadius: '15px', padding: '5px', fontFamily: 'Noto Kufi Arabic', color: 'white', marginTop: '15px', width: '100%' }}>تسجيل خروج جميع الأجهزة الأخرى</button>
                                  </div>
                                </Row>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      </Container>
                    </Tab>
                  </Tabs>
                </Col>
              </Row>
              {/* End Profile Setting Card Section */}
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;
