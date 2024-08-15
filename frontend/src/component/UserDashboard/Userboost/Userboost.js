import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Userboost.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';


function Userboost() {

// setup 01

  const [days, setDays] = useState(1);
  const [selectedPromotion, setSelectedPromotion] = useState(''); // State for selected promotion type

  const handleDecrease = () => {
    if (days > 1) {
      setDays(days - 1);
    }
  };

  const handleIncrease = () => {
    setDays(days + 1);
  };

  const handleRadioChange = (event) => {
    setSelectedPromotion(event.target.value);
  };

  // Define prices for each promotion type
  const promotionPrices = {
    'تميز+': 5,
    'تميز': 3,
    'عادي': 2,
  };

  // Calculate total price based on selected promotion and number of days
  const totalPrice = selectedPromotion ? (promotionPrices[selectedPromotion] * days) : 0;



// setup 02

const [days1, setDays1] = useState(1); // Default to 1 day
const [totalPrice1, setTotalPrice1] = useState(0); // Default price for 1 day, update based on your pricing logic

const handleDecrease1 = () => {
  if (days1 > 1) {
    setDays1(days1 - 1);
    setTotalPrice1((days1 - 1) * 1); // Update the total price based on the number of days
  }
};

const handleIncrease1 = () => {
  setDays1(days1 + 1);
  setTotalPrice1((days1 + 1) * 1); // Update the total price based on the number of days
};



// setup 03

const [days2, setDays2] = useState(1); // Default to 1 day
const [totalPrice2, setTotalPrice2] = useState(0); // Default price for 1 day, update based on your pricing logic

const handleDecrease2 = () => {
  if (days2 > 1) {
    setDays2(days2 - 1);
    setTotalPrice2((days2 - 1) * 1); // Update the total price based on the number of days
  }
};

const handleIncrease2 = () => {
  setDays2(days2 + 1);
  setTotalPrice2((days2 + 1) * 1); // Update the total price based on the number of days
};


// setup 04

const [days3, setDays3] = useState(1); // Default to 1 day
const [totalPrice3, setTotalPrice3] = useState(0); // Default price for 1 day, update based on your pricing logic


const handleDecrease3 = () => {
  if (days3 > 1) {
    setDays3(days3 - 1);
    setTotalPrice3((days3 - 1) * 1); // Update the total price based on the number of days
  }
};
const handleIncrease3 = () => {
  setDays3(days3 + 1);
  setTotalPrice3((days3 + 1) * 1); // Update the total price based on the number of days
};




  return (
    <Container>
    <Row>
      <Col style={{ backgroundColor: '#FFFFFF' }}>
      </Col>
    </Row>
    <Row>
      <Col>
        <div className="col d-flex align-items-center justify-content-center">
          <div className="col-12 col-md-6 col-lg-9">
            <h2 style={{ textAlign: 'center', fontFamily: 'Changa, sans-serif', marginTop: '1.5rem' }}>المحفظة</h2>
            <div className="sign">
              <div className="sign__content" style={{display:'grid'}}>
              <Tabs
                defaultActiveKey="تواصل"
                transition={false}
                id="fill-tab-example"
                className="mb-3" style={{justifyContent:'center'}}
              >
                <Tab eventKey="تواصل" title="تواصل">
                <div class="col d-flex align-items-center justify-content-center">
                <div className="">
                <div class="col-12">
                <h2 style={{textAlign:'center',fontFamily:'Noto Kufi Arabic',marginTop:'1.5rem'}}>🚀يوزر بوست</h2>
                <div class="col-12">
                <div class="sign">
                <div class="sign__content">
                <Form className='sign__form'>
                <h3 style={{marginBottom:'30px',color:'rgb(97, 100, 255)'}}>التواصل الإجتماعي & الرئيسية</h3>
                <p style={{textAlign:'center',fontSize:'14px'}}>يمكنك جعل حساب التواصل الإجتماعي الخاص بك يظهر في الصفحة الرئيسية وأيضاً في صفحة سوق التواصل الإجتماعي في البداية بمبلغ رمزي وبسيط ويساعدك على بيع الحساب بسرعة😍🥰</p>
                
                <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>الحساب</Form.Label>
                <Form.Select aria-label="Default select example" className='sign__input'>
                <option value="">الرجاء الأختيار</option>
                </Form.Select>
                </Form.Group>

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

                        <div className="p-4 pb-0">
                          <div className="d-flex align-items-center justify-content-center" style={{ width: '300px' }}>
                            <Button
                              className="d-flex align-items-center justify-content-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 shrink-0 rounded-full"
                              type="button"
                              onClick={handleDecrease}
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
                              onClick={handleIncrease}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus h-4 w-4">
                                <path d="M5 12h14"></path>
                                <path d="M12 5v14"></path>
                              </svg>
                              <span className="sr-only">Increase</span>
                            </Button>
                          </div>
                        </div>
                      <p style={{color:'red',fontSize:'13px'}}>السعر شامل ضريبة القيمة المضافة*</p>

                      <Button variant="primary" type="submit" style={{fontFamily:'Noto Kufi Arabic'}}>
                      😎تنفيذ البوست  
                      </Button>
                      <p style={{marginTop:'15px',textAlign:'center',fontSize:'14px'}}>يمكنك عمل بوست برصيد حسابك في المنصة فقط إذا كنت تود تعبئة الرصيد إضغط علي</p>
                        {/* Display selected value */}
                        <p className="text-center mt-3">
                                تم اختيار: <strong>{selectedPromotion || 'لم يتم اختيار أي نوع'}</strong>
                          </p>
                      </Form>
                      </div>
                      </div>
                      </div>
                      </div>
                      </div>
                      </div>
                      </Tab>
                      <Tab eventKey="العاب" title="العاب">
                      <div class="col d-flex align-items-center justify-content-center">
                      <div className="">
                      <div class="col-12">
                      <div class="col-12">
                      <div class="sign">
                      <div class="sign__content">
                      <Form className='sign__form'>
                      <h3 style={{marginBottom:'30px',color:'rgb(97, 100, 255)'}}><span className='spanclass'>جديد</span>حسابات الألعاب</h3>
                      <p style={{textAlign:'center',fontSize:'14px'}}>يمكنك جعل حسابك يظهر في بداية صفحة سوق الألعاب وأيضاً إظهار شعار 🚀 أسفل الحساب🥰</p>
                      
                      <Form.Group className="mb-3" controlId="formGridAddress2">
                      <Form.Label>الحساب</Form.Label>
                      <Form.Select aria-label="Default select example" className='sign__input'>
                      <option value="">الرجاء الأختيار</option>
                      </Form.Select>
                      </Form.Group>
                    <div className="p-4 pb-0">
                      <div className="d-flex align-items-center justify-content-center" style={{ width: '300px' }}>
                        <Button
                          className="d-flex align-items-center justify-content-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 shrink-0 rounded-full"
                          type="button"
                          onClick={handleDecrease1}
                          disabled={days1 <= 1}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus h-4 w-4">
                            <path d="M5 12h14"></path>
                          </svg>
                          <span className="sr-only">Decrease</span>
                        </Button>
                        
                        <div className="flex-1 text-center">
                          <div className="text-7xl font-bold tracking-tighter">
                            {days1} <span className="text-sm tracking-normal font-extrabold text-purple-300">/{totalPrice1}$</span>
                          </div>
                          <div className="text-[0.70rem] uppercase text-muted-foreground">عدد الأيام</div>
                        </div>
                        
                        <Button
                          className="d-flex align-items-center justify-content-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 shrink-0 rounded-full"
                          type="button"
                          onClick={handleIncrease1}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus h-4 w-4">
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                          </svg>
                          <span className="sr-only">Increase</span>
                        </Button>
                      </div>
                    </div>
                    <p style={{color:'red',fontSize:'13px'}}>السعر شامل ضريبة القيمة المضافة*</p>

                <Button variant="primary" type="submit" style={{fontFamily:'Noto Kufi Arabic'}}>
                😎تنفيذ البوست  
                </Button>
                <p style={{marginTop:'15px',textAlign:'center',fontSize:'14px'}}>يمكنك عمل بوست برصيد حسابك في المنصة فقط إذا كنت تود تعبئة الرصيد إضغط علي</p>
                
                </Form>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </Tab>
                <Tab eventKey="خدمة" title="خدمة" >
                <div class="col d-flex align-items-center justify-content-center">
                <div className="">
                <div class="col-12">
                <div class="col-12">
                <div class="sign">
                <div class="sign__content">
                <Form className='sign__form'>
                <h3 style={{marginBottom:'30px',color:'rgb(97, 100, 255)'}}> المستخدمين</h3>
                <p style={{textAlign:'center',fontSize:'14px'}}>جعل ملفك الشخصي يظهر في قائمة المستخدمين في البداية🔥🔥</p>
                
                <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>الحساب</Form.Label>
                <Form.Select aria-label="Default select example" className='sign__input'>
                <option value="">الرجاء الأختيار</option>
                </Form.Select>
                </Form.Group>

                <div className="p-4 pb-0">
                      <div className="d-flex align-items-center justify-content-center" style={{ width: '300px' }}>
                        <Button
                          className="d-flex align-items-center justify-content-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 shrink-0 rounded-full"
                          type="button"
                          onClick={handleDecrease2}
                          disabled={days2 <= 1}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus h-4 w-4">
                            <path d="M5 12h14"></path>
                          </svg>
                          <span className="sr-only">Decrease</span>
                        </Button>
                        
                        <div className="flex-1 text-center">
                          <div className="text-7xl font-bold tracking-tighter">
                            {days2} <span className="text-sm tracking-normal font-extrabold text-purple-300">/{totalPrice2}$</span>
                          </div>
                          <div className="text-[0.70rem] uppercase text-muted-foreground">عدد الأيام</div>
                        </div>
                        
                        <Button
                          className="d-flex align-items-center justify-content-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 shrink-0 rounded-full"
                          type="button"
                          onClick={handleIncrease2}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus h-4 w-4">
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                          </svg>
                          <span className="sr-only">Increase</span>
                        </Button>
                      </div>
                    </div>
                <p style={{color:'red',fontSize:'13px'}}>السعر شامل ضريبة القيمة المضافة*</p>

                <Button variant="primary" type="submit" style={{fontFamily:'Noto Kufi Arabic'}}>
                😎تنفيذ البوست  
                </Button>
                <p style={{marginTop:'15px',textAlign:'center',fontSize:'14px'}}>يمكنك عمل بوست برصيد حسابك في المنصة فقط إذا كنت تود تعبئة الرصيد إضغط علي</p>
                
                </Form>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </Tab>
                <Tab eventKey="حسابي" title="حسابي" >
                <div class="col d-flex align-items-center justify-content-center">
                <div className="">
                <div class="col-12">
                <div class="col-12">
                <div class="sign">
                <div class="sign__content">
                <Form className='sign__form'>
                <h3 style={{marginBottom:'30px',color:'rgb(97, 100, 255)'}}> الخدمات</h3>
                <p style={{textAlign:'center',fontSize:'14px'}}>يمكنك جعل خدمتك تظهر في بداية الخدمات وأيضاً إظهار كلمة (خدمة مميزة) أسفل الخدمة🥰</p>
                
                <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>الحساب</Form.Label>
                <Form.Select aria-label="Default select example" className='sign__input'>
                <option value="">الرجاء الأختيار</option>
                </Form.Select>
                </Form.Group>

                <div className="p-4 pb-0">
                      <div className="d-flex align-items-center justify-content-center" style={{ width: '300px' }}>
                        <Button
                          className="d-flex align-items-center justify-content-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 shrink-0 rounded-full"
                          type="button"
                          onClick={handleDecrease3}
                          disabled={days3 <= 1}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus h-4 w-4">
                            <path d="M5 12h14"></path>
                          </svg>
                          <span className="sr-only">Decrease</span>
                        </Button>
                        
                        <div className="flex-1 text-center">
                          <div className="text-7xl font-bold tracking-tighter">
                            {days3} <span className="text-sm tracking-normal font-extrabold text-purple-300">/{totalPrice3}$</span>
                          </div>
                          <div className="text-[0.70rem] uppercase text-muted-foreground">عدد الأيام</div>
                        </div>
                        
                        <Button
                          className="d-flex align-items-center justify-content-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 shrink-0 rounded-full"
                          type="button"
                          onClick={handleIncrease3}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus h-4 w-4">
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                          </svg>
                          <span className="sr-only">Increase</span>
                        </Button>
                      </div>
                    </div>
                <p style={{color:'red',fontSize:'13px'}}>السعر شامل ضريبة القيمة المضافة*</p>

                <Button variant="primary" type="submit" style={{fontFamily:'Noto Kufi Arabic'}}>
                😎تنفيذ البوست  
                </Button>
                <p style={{marginTop:'15px',textAlign:'center',fontSize:'14px'}}>يمكنك عمل بوست برصيد حسابك في المنصة فقط إذا كنت تود تعبئة الرصيد إضغط علي</p>
                
                </Form>
                </div>
                </div>
                </div>
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