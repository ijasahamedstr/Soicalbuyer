import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Userboost.css';

// Reusable DayCounter component
const DayCounter = ({ days, totalPrice, onIncrease, onDecrease }) => (
  <div className="p-4 pb-0">
    <div className="d-flex align-items-center justify-content-center" style={{ width: '300px' }}>
      <Button
        className="d-flex align-items-center justify-content-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 shrink-0 rounded-full"
        type="button"
        onClick={onDecrease}
        disabled={days <= 1}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus h-4 w-4">
          <path d="M5 12h14"></path>
        </svg>
        <span className="sr-only">Decrease</span>
      </Button>
      <div className="flex-1 text-center">
        <div className="text-7xl font-bold tracking-tighter">
          {days} <span className="text-sm tracking-normal font-extrabold text-purple-300">/{totalPrice}$</span>
        </div>
        <div className="text-[0.70rem] uppercase text-muted-foreground">عدد الأيام</div>
      </div>
      <Button
        className="d-flex align-items-center justify-content-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 shrink-0 rounded-full"
        type="button"
        onClick={onIncrease}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus h-4 w-4">
          <path d="M5 12h14"></path>
          <path d="M12 5v14"></path>
        </svg>
        <span className="sr-only">Increase</span>
      </Button>
    </div>
  </div>
);

const Userboost = () => {
  const [userdata, setUserdata] = useState(null);
  const [selectedPromotion, setSelectedPromotion] = useState('');
  const [days, setDays] = useState(1);
  const [days1, setDays1] = useState(1);
  const [days2, setDays2] = useState(1);
  const [days3, setDays3] = useState(1);
  const [selectedTab, setSelectedTab] = useState('تواصل');
  const navigate = useNavigate();
  const [paccount, setPaccount] = useState();
  const [gaccount, setGaccount] = useState();
  const [uaccount, setUaccount] = useState();
  const [saccount, setSaccount] = useState();
  useEffect(() => {
    const fetchUserData = () => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      setUserdata(userDetails || {});
    };

    fetchUserData();
    const intervalId = setInterval(fetchUserData, 300000); // Refresh user data every 5 minutes
    return () => clearInterval(intervalId);
  }, []);

  const handleDecrease = () => setDays(prevDays => Math.max(prevDays - 1, 1));
  const handleIncrease = () => setDays(prevDays => prevDays + 1);

  const handleDecrease1 = () => setDays1(prevDays => Math.max(prevDays - 1, 1));
  const handleIncrease1 = () => setDays1(prevDays => prevDays + 1);

  const handleDecrease2 = () => setDays2(prevDays => Math.max(prevDays - 1, 1));
  const handleIncrease2 = () => setDays2(prevDays => prevDays + 1);

  const handleDecrease3 = () => setDays3(prevDays => Math.max(prevDays - 1, 1));
  const handleIncrease3 = () => setDays3(prevDays => prevDays + 1);

  const handleRadioChange = (event) => {
    setSelectedPromotion(event.target.value);
  };

  const promotionPrices = {
    'تميز+': 5,
    'تميز': 3,
    'عادي': 2,
  };

  const totalPrice = selectedPromotion ? (promotionPrices[selectedPromotion] * days) : 0;
  const totalPrice1 = days1;
  const totalPrice2 = days2;
  const totalPrice3 = days3;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/boost`, {
        userid: userdata?._id,
        paccount:paccount,
        pdays: days,
        pselectedPromotion: selectedPromotion,
        ptotalPrice: totalPrice
      });

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Account boost created successfully.',
        });
        navigate('/');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message || 'An error occurred.',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'An internal server error occurred.',
      });
    }
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/boost/game`, {
        userid: userdata._id,
        gaccount:gaccount,
        gdays: days1,
        gtotalPrice: totalPrice1
      });

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Account boost created successfully.',
        });
        navigate('/');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message || 'An error occurred.',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'An internal server error occurred.',
      });
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/boost/Users`, {
        userid: userdata._id,
        uaccount:uaccount,
        udays: days2,
        utotalPrice: totalPrice2
      });

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Account boost created successfully.',
        });
        navigate('/');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message || 'An error occurred.',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'An internal server error occurred.',
      });
    }
  };

  const handleSubmit3 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/boost/Services`, {
        sserid: userdata._id,
        saccount:saccount,
        sdays: days3,
        stotalPrice: totalPrice3
      });

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Account boost created successfully.',
        });
        navigate('/');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message || 'An error occurred.',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'An internal server error occurred.',
      });
    }
  };

  return (
    <Container>
      <Row>
        <Col style={{ backgroundColor: '#FFFFFF' }}></Col>
      </Row>
      <Row>
        <Col>
          <div className="col d-flex align-items-center justify-content-center">
            <div className="col-12 col-md-6 col-lg-9">
              <h2 style={{ textAlign: 'center', fontFamily: 'Changa, sans-serif', marginTop: '1.5rem' }}>المحفظة</h2>
              <div className="sign">
                <div className="sign__content" style={{ display: 'grid' }}>
                  <Tabs
                    defaultActiveKey="تواصل"
                    transition={false}
                    id="fill-tab-example"
                    className="mb-3"
                    onSelect={(key) => setSelectedTab(key)}
                  >
                    <Tab eventKey="تواصل" title="تواصل">
                      <div className="col d-flex align-items-center justify-content-center">
                        <div className="">
                          <div className="col-12"  style={{width:'400px'}}>
                            <h2 style={{ textAlign: 'center', fontFamily: 'Noto Kufi Arabic', marginTop: '1.5rem' }}>🚀يوزر بوست</h2>
                            <Form className='sign__form' onSubmit={handleSubmit}>
                              <h3 style={{ marginBottom: '30px', color: 'rgb(97, 100, 255)' }}>التواصل الإجتماعي & الرئيسية</h3>
                              <p style={{ textAlign: 'center', fontSize: '14px' }}>
                                يمكنك جعل حساب التواصل الإجتماعي الخاص بك يظهر في الصفحة الرئيسية وأيضاً في صفحة سوق التواصل الإجتماعي في البداية بمبلغ رمزي وبسيط ويساعدك على بيع الحساب بسرعة😍🥰
                              </p>
                              <Form.Label>الحساب</Form.Label>
                                <Form.Select aria-label="Default select example" className='sign__input' onChange={(e)=>setPaccount(e.target.value)} >
                                  <option value="ijas">الرجاء الأختيار</option>
                                  <option value="test">الرجاء الأختيار</option>
                                      {/* Add options here */}
                              </Form.Select><br/>
                              <Form.Group className="mb-3" controlId="formGridPromotionType">
                                <Form.Label>نوع الترويج</Form.Label>
                                {['تميز+', 'تميز', 'عادي'].map((label, index) => (
                                  <Form.Check
                                    key={index}
                                    label={`${label} (${promotionPrices[label]}$)`}
                                    name="promotion"
                                    type="radio"
                                    id={`promotion-${index}`}
                                    value={label}
                                    checked={selectedPromotion === label}
                                    onChange={handleRadioChange}
                                  />
                                ))}
                              </Form.Group>
                              <DayCounter
                                days={days}
                                totalPrice={totalPrice}
                                onIncrease={handleIncrease}
                                onDecrease={handleDecrease}
                              />
                              <p style={{ color: 'red', fontSize: '13px' }}>السعر شامل ضريبة القيمة المضافة*</p>
                              <Button variant="primary" type="submit" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                                😎تنفيذ البوست  
                              </Button>
                              <p style={{ marginTop: '15px', textAlign: 'center', fontSize: '14px' }}>
                                يمكنك عمل بوست برصيد حسابك في المنصة فقط إذا كنت تود تعبئة الرصيد إضغط علي
                              </p>
                              <p className="text-center mt-3">
                                تم اختيار: <strong>{selectedPromotion || 'لم يتم اختيار أي نوع'}</strong>
                              </p>
                            </Form>
                          </div>
                        </div>
                      </div>
                    </Tab>
                    <Tab eventKey="العاب" title="العاب">
                      <div className="col d-flex align-items-center justify-content-center">
                        <div className="">
                          <div className="col-12"  style={{width:'400px'}}>
                            <div className="sign">
                              <div className="sign__content">
                                <Form className='sign__form' onSubmit={handleSubmit1}>
                                  <h3 style={{ marginBottom: '30px', color: 'rgb(97, 100, 255)' }}>
                                    <span className='spanclass'>جديد</span> حسابات الألعاب
                                  </h3>
                                  <p style={{ textAlign: 'center', fontSize: '14px' }}>
                                    يمكنك جعل حسابك يظهر في بداية صفحة سوق الألعاب وأيضاً إظهار شعار 🚀 أسفل الحساب🥰
                                  </p>
                                  <Form.Group className="mb-3" controlId="formGridPromotionType">
                                    <Form.Label>الحساب</Form.Label>
                                    <Form.Select aria-label="Default select example" className='sign__input' onChange={(e)=>setGaccount(e.target.value)}>
                                    <option value="ijas">الرجاء الأختيار</option>
                                    <option value="test">الرجاء الأختيار</option>
                                      {/* Add options here */}
                                    </Form.Select>
                                  </Form.Group>
                                  <DayCounter
                                    days={days1}
                                    totalPrice={totalPrice1}
                                    onIncrease={handleIncrease1}
                                    onDecrease={handleDecrease1}
                                  />
                                  <p style={{ color: 'red', fontSize: '13px' }}>السعر شامل ضريبة القيمة المضافة*</p>
                                  <Button variant="primary" type="submit" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                                    😎تنفيذ البوست
                                  </Button>
                                  <p style={{ marginTop: '15px', textAlign: 'center', fontSize: '14px' }}>
                                    يمكنك عمل بوست برصيد حسابك في المنصة فقط إذا كنت تود تعبئة الرصيد إضغط علي
                                  </p>
                                </Form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab>
                    <Tab eventKey="خدمة" title="خدمة">
                      <div className="col d-flex align-items-center justify-content-center">
                        <div className="">
                          <div className="col-12"  style={{width:'400px'}}>
                            <h2 className="text-center my-3">🚀 مستخدمين</h2>
                            <Form className='sign__form' onSubmit={handleSubmit2}>
                              <h3 className="mb-3 text-primary">المستخدمين</h3>
                              <p style={{textAlign:'center',fontSize:'14px'}}>جعل ملفك الشخصي يظهر في قائمة المستخدمين في البداية🔥🔥</p>

                              <Form.Group className="mb-3" controlId="formGridAddress2">
                              <Form.Label>الحساب</Form.Label>
                              <Form.Select aria-label="Default select example" className='sign__input'  onChange={(e)=>setUaccount(e.target.value)}>
                              <option value="ijas">الرجاء الأختيار</option>
                              <option value="test">الرجاء الأختيار</option>
                              </Form.Select>
                              </Form.Group>
                              <DayCounter
                                days={days2}
                                totalPrice={totalPrice2}
                                onDecrease={handleDecrease2}
                                onIncrease={handleIncrease2}
                              />
                                <p style={{color:'red',fontSize:'13px'}}>السعر شامل ضريبة القيمة المضافة*</p>
                              <Button variant="primary" type="submit" className="w-100">
                                قم بتفعيل الباقة الآن
                              </Button>
                            </Form>
                          </div>
                        </div>
                      </div>
                    </Tab>
                    <Tab eventKey="حسابي" title="حسابي">
                      <div className="col d-flex align-items-center justify-content-center">
                        <div className="">
                          <div className="col-12"  style={{width:'400px'}}>
                            <Form className='sign__form' onSubmit={handleSubmit3}>
                              <h3 className="mb-3 text-primary">المستخدمين</h3>
                              <p style={{textAlign:'center',fontSize:'14px'}}>يمكنك جعل خدمتك تظهر في بداية الخدمات وأيضاً إظهار كلمة (خدمة مميزة) أسفل الخدمة🥰</p>
                              <Form.Group className="mb-3" controlId="formGridAddress2">
                                <Form.Label>الحساب</Form.Label>
                                <Form.Select aria-label="Default select example" className='sign__input' onChange={(e)=>setSaccount(e.target.value)}>
                                <option value="ijas">الرجاء الأختيار</option>
                                <option value="test">الرجاء الأختيار</option>
                                </Form.Select>
                                </Form.Group>
                              <DayCounter
                                days={days3}
                                totalPrice={totalPrice3}
                                onDecrease={handleDecrease3}
                                onIncrease={handleIncrease3}
                              />
                              <p style={{color:'red',fontSize:'13px'}}>السعر شامل ضريبة القيمة المضافة*</p>
                              <Button variant="primary" type="submit" className="w-100">
                                قم بتفعيل الباقة الآن
                              </Button>
                              <p style={{marginTop:'15px',textAlign:'center',fontSize:'14px'}}>يمكنك عمل بوست برصيد حسابك في المنصة فقط إذا كنت تود تعبئة الرصيد إضغط علي</p>
                            </Form>
                          </div>
                        </div>
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Userboost;
