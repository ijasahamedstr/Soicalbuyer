import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';

function PointTransfer() {
  // State for promotion and days
  const [days, setDays] = useState(1);
  const [selectedPromotion, setSelectedPromotion] = useState(''); 

  // Prices for promotions
  const promotionPrices = {
    'تميز+': 5,
    'تميز': 3,
    'عادي': 2,
  };

  // Calculate total price
  const totalPrice = selectedPromotion ? (promotionPrices[selectedPromotion] * days) : 0;

  // Handlers for increase/decrease buttons
  const handleDecrease = () => {
    if (days > 1) {
      setDays(days - 1);
    }
  };

  const handleIncrease = () => {
    setDays(days + 1);
  };

  // Handler for promotion type change
  const handleRadioChange = (event) => {
    setSelectedPromotion(event.target.value);
  };

  return (
    <Container>
      <Row>
        <Col style={{ backgroundColor: '#FFFFFF' }}>
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
                    style={{ justifyContent: 'center' }}
                  >
                    <Tab eventKey="تواصل" title="تواصل">
                      <div className="col d-flex align-items-center justify-content-center">
                        <div className="col-12">
                          <h2 style={{ textAlign: 'center', fontFamily: 'Noto Kufi Arabic', marginTop: '1.5rem' }}>🚀يوزر بوست</h2>
                          <Form className='sign__form'>
                            <h3 style={{ marginBottom: '30px', color: 'rgb(97, 100, 255)' }}>التواصل الإجتماعي & الرئيسية</h3>
                            <p style={{ textAlign: 'center', fontSize: '14px' }}>
                              يمكنك جعل حساب التواصل الإجتماعي الخاص بك يظهر في الصفحة الرئيسية وأيضاً في صفحة سوق التواصل الإجتماعي في البداية بمبلغ رمزي وبسيط ويساعدك على بيع الحساب بسرعة😍🥰
                            </p>

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

                            <p style={{ color: 'red', fontSize: '13px' }}>السعر شامل ضريبة القيمة المضافة*</p>

                            <Button variant="primary" type="submit" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                              😎 تنفيذ البوست
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
                    </Tab>
                    <Tab eventKey="العاب" title="العاب">
                      <div className="col d-flex align-items-center justify-content-center">
                        <div className="col-12">
                          <h2 style={{ textAlign: 'center', fontFamily: 'Noto Kufi Arabic', marginTop: '1.5rem' }}>🚀يوزر بوست</h2>
                          <Form className='sign__form'>
                            <h3 style={{ marginBottom: '30px', color: 'rgb(97, 100, 255)' }}>
                              <span className='spanclass'>جديد</span> حسابات الألعاب
                            </h3>
                            <p style={{ textAlign: 'center', fontSize: '14px' }}>
                              يمكنك جعل حسابك يظهر في بداية صفحة سوق الألعاب وأيضاً إظهار شعار 🚀 أسفل الحساب🥰
                            </p>

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

                            <p style={{ color: 'red', fontSize: '13px' }}>السعر شامل ضريبة القيمة المضافة*</p>

                            <Button variant="primary" type="submit" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                              😎 تنفيذ البوست
                            </Button>
                            <p style={{ marginTop: '15px', textAlign: 'center', fontSize: '14px' }}>
                              يمكنك عمل بوست برصيد حسابك في المنصة فقط إذا كنت تود تعبئة الرصيد إضغط علي
                            </p>
                          </Form>
                        </div>
                      </div>
                    </Tab>
                    <Tab eventKey="خدمة" title="خدمة">
                      <div className="col d-flex align-items-center justify-content-center">
                        <div className="col-12">
                          <h2 style={{ textAlign: 'center', fontFamily: 'Noto Kufi Arabic', marginTop: '1.5rem' }}>🚀يوزر بوست</h2>
                          <Form className='sign__form'>
                            <h3 style={{ marginBottom: '30px', color: 'rgb(97, 100, 255)' }}>المستخدمين</h3>
                            <p style={{ textAlign: 'center', fontSize: '14px' }}>
                              جعل ملفك الشخصي يظهر في قائمة المستخدمين في البداية🔥🔥
                            </p>

                            <Form.Group className="mb-3" controlId="formGridAddress2">
                              <Form.Label>الحساب</Form.Label>
                              <Form.Select aria-label="Default select example" className='sign__input'>
                                <option value="">الرجاء الأختيار</option>
                              </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridAddress2">
                              <Form.Label>عدد أيام البوست</Form.Label>
                              <Form.Control placeholder="عدد النقاط" className='sign__input' />
                            </Form.Group>

                            <p style={{ color: '#D0D3D4' }}>
                              التكلفة <span id="boost_price" style={{ color: 'rgb(97, 100, 255)' }}>$0</span> لـ <span id="boost_days_count" style={{ color: 'rgb(97, 100, 255)' }}> أيام </span>
                            </p>
                            <p style={{ color: '#D0D3D4', fontSize: '13px' }}>
                              سعر التكلفة أثناء الساعة السعيدة <span style={{ color: 'rgb(97, 100, 255)' }} id="boost_happy_gaming_price">$0</span> لـ <span style={{ color: 'rgb(97, 100, 255)' }} id="boost_happy_gaming_days_count">0 أيام</span>
                            </p>

                            <p style={{ color: 'red', fontSize: '13px' }}>السعر شامل ضريبة القيمة المضافة*</p>

                            <Button variant="primary" type="submit" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                              😎 تنفيذ البوست
                            </Button>
                            <p style={{ marginTop: '15px', textAlign: 'center', fontSize: '14px' }}>
                              يمكنك عمل بوست برصيد حسابك في المنصة فقط إذا كنت تود تعبئة الرصيد إضغط علي
                            </p>
                          </Form>
                        </div>
                      </div>
                    </Tab>
                    <Tab eventKey="حسابي" title="حسابي">
                      <div className="col d-flex align-items-center justify-content-center">
                        <div className="col-12">
                          <h2 style={{ textAlign: 'center', fontFamily: 'Noto Kufi Arabic', marginTop: '1.5rem' }}>🚀يوزر بوست</h2>
                          <Form className='sign__form'>
                            <h3 style={{ marginBottom: '30px', color: 'rgb(97, 100, 255)' }}>الخدمات</h3>
                            <p style={{ textAlign: 'center', fontSize: '14px' }}>
                              يمكنك جعل خدمتك تظهر في بداية الخدمات وأيضاً إظهار كلمة (خدمة مميزة) أسفل الخدمة🥰
                            </p>

                            <Form.Group className="mb-3" controlId="formGridAddress2">
                              <Form.Label>الحساب</Form.Label>
                              <Form.Select aria-label="Default select example" className='sign__input'>
                                <option value="">الرجاء الأختيار</option>
                              </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridAddress2">
                              <Form.Label>عدد أيام البوست</Form.Label>
                              <Form.Control placeholder="عدد النقاط" className='sign__input' />
                            </Form.Group>

                            <p style={{ color: '#D0D3D4' }}>
                              التكلفة <span id="boost_price" style={{ color: 'rgb(97, 100, 255)' }}>$0</span> لـ <span id="boost_days_count" style={{ color: 'rgb(97, 100, 255)' }}> أيام </span>
                            </p>
                            <p style={{ color: '#D0D3D4', fontSize: '13px' }}>
                              سعر التكلفة أثناء الساعة السعيدة <span style={{ color: 'rgb(97, 100, 255)' }} id="boost_happy_gaming_price">$0</span> لـ <span style={{ color: 'rgb(97, 100, 255)' }} id="boost_happy_gaming_days_count">0 أيام</span>
                            </p>

                            <p style={{ color: 'red', fontSize: '13px' }}>السعر شامل ضريبة القيمة المضافة*</p>

                            <Button variant="primary" type="submit" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                              😎 تنفيذ البوست
                            </Button>
                            <p style={{ marginTop: '15px', textAlign: 'center', fontSize: '14px' }}>
                              يمكنك عمل بوست برصيد حسابك في المنصة فقط إذا كنت تود تعبئة الرصيد إضغط علي
                            </p>
                          </Form>
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

export default PointTransfer;
