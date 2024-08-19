import 'bootstrap/dist/css/bootstrap.min.css';
import './wallet.css';
import 'reactjs-popup/dist/index.css';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { sentOtpFunction, Verify } from "../../Page/LoginPage/LoginAPI/Apis.js";
import { useNavigate } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import { MdOutlineAccessTime } from "react-icons/md";
import { PiWarningCircle } from "react-icons/pi";
import { IoIosRocket } from "react-icons/io";
import { IoCardOutline } from "react-icons/io5";
import { FaBitcoin } from "react-icons/fa";
import { BsBank } from "react-icons/bs";

// Reusable DayCounter component
const DayCounter = ({ totalPrice, onIncrease, onDecrease }) => (
  <div className="p-4 pb-0">
    <div className="d-flex align-items-center justify-content-center" style={{ width: '300px' }}>
      <Button
        className="d-flex align-items-center justify-content-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 shrink-0 rounded-full"
        type="button"
        onClick={onDecrease}
        disabled={totalPrice <= 0}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus h-4 w-4">
          <path d="M5 12h14"></path>
        </svg>
        <span className="sr-only">Decrease</span>
      </Button>
      <div className="flex-1 text-center">
        <div className="text-7xl font-bold tracking-tighter">
          ${totalPrice} 
        </div>
        <div className="text-[0.70rem] uppercase text-muted-foreground">المبلغ</div>
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

function Wallet({ setIsOTPLoggedIn, setOTPLoggedUserData }) {
  const [userdata, setUserdata] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // Fetch user data from localStorage and set interval
  useEffect(() => {
    const fetchUserData = () => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      setUserdata(userDetails || {});
    };

    fetchUserData();
    const intervalId = setInterval(fetchUserData, 300000); // 5 minutes interval

    return () => clearInterval(intervalId);
  }, []);

  const sendOtp = async (e) => {
    e.preventDefault();
    setSpinner(true);
    try {
      const response = await sentOtpFunction({ email: userdata.email });
      if (response.status === 200) {
        toast.success("OTP sent successfully");
      } else {
        toast.error(response.response?.data?.error || "An error occurred");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "An unexpected error occurred");
    } finally {
      setSpinner(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp === "") {
      toast.error("Enter Your OTP");
    } else if (!/^\d+$/.test(otp)) {
      toast.error("Enter a Valid OTP");
    } else if (otp.length < 6) {
      toast.error("OTP must be at least 6 digits");
    } else {
      const data = { otp, email: userdata.email, Accountstatus:'verified'};
      
      try {
        const response = await Verify(data);
        if (response.status === 200) {
          localStorage.setItem("userdbtoken", response.data.userToken);
          localStorage.setItem("userDetails", JSON.stringify(response.data.preuser));
          toast.success(response.data.message);
          setIsOTPLoggedIn(true);
          setOTPLoggedUserData(response.data);
          setTimeout(() => {
            navigate("/Dashboard");
          }, 5000);
        } else {
          toast.error(response.response?.data?.error || "An error occurred");
        }
      } catch (error) {
        toast.error(error.response?.data?.error || "An unexpected error occurred");
      }
    }
  };

// Initialize states
const [totalPrice3, setTotalPrice3] = useState(10); // Initial total price

// Price increment per click
const priceIncrement = 5; // Fixed increment amount

// Handler to decrease total price
const handleDecrease3 = () => {
  if (totalPrice3 > 0) {
    const newPrice = totalPrice3 - priceIncrement;
    setTotalPrice3(newPrice >= 0 ? newPrice : 0); // Ensure price doesn't go below 0
  }
};

// Handler to increase total price
const handleIncrease3 = () => {
  setTotalPrice3(totalPrice3 + priceIncrement);
};


  return (
    <>
      {userdata && userdata.Accountstatus === 'Not verified' ? (
        <Container>
          <Row>
            <Col style={{ backgroundColor: '#FFFFFF' }}>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="col d-flex align-items-center justify-content-center">
                <div className="">
                  <h2 style={{ textAlign: 'center', fontFamily: 'Changa, sans-serif', marginTop: '1.5rem' }}>المحفظة</h2>
                  <div className="sign">
                    <div className="sign__content">
                      <Form className='sign__form' onSubmit={handleSubmit}>
                        <p>سحب الرصيد</p>
                        <p>المتوفر : $0.00</p>
                        <p style={{ color: 'red', fontSize: '12px', textAlign: 'center' }}>للمواصلة إلى السحب الرجاء تأكيد ملكية الحساب</p>
                        <p style={{ color: 'red', fontSize: '12px', textAlign: 'center' }}>أدخل رمز التحقق الذي سيتم إرساله لرقم الهاتف و البريد الإلكتروني المربوط</p>

                        <Form.Group className="mb-3" controlId="formOtp">
                          <Form.Label>عدد أيام البوست</Form.Label>
                          <Form.Control
                            type="number"
                            name="otp"
                            onChange={(e) => setOtp(e.target.value)}
                            id="auth-code-withdraw"
                            className="sign__input"
                            placeholder="######"
                            style={{ textAlign: 'center' }}
                          />
                        </Form.Group>

                        <Button
                          variant="primary"
                          className='sign__btn'
                          type="submit"
                          style={{ fontFamily: 'Noto Kufi Arabic', marginBottom: '20px' }}
                        >
                          تأكيد
                        </Button>

                        <Button
                          variant="primary"
                          onClick={sendOtp}
                          disabled={spinner}
                          style={{ background: '#D5D8DC' }}
                        >
                          {spinner ? 'إرسال رمز التحقق...' : 'إرسال رمز التحقق'}
                        </Button>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container>
        <Row>
          <Col style={{ backgroundColor: '#FFFFFF' }}>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="col d-flex align-items-center justify-content-center">
              <div className="">
                <h2 style={{ textAlign: 'center', fontFamily: 'Changa, sans-serif', marginTop: '1.5rem' }}>المحفظة</h2>
                <div className="sign">
                  <div className="sign__content" style={{display:'grid'}}>
                  <Tabs
                    defaultActiveKey="سحب"
                    transition={false}
                    id="fill-tab-example"
                    className="mb-3"
                  >
                    <Tab eventKey="سحب" title="سحب">
                    <Card style={{ width: '32rem',background:'#F7F9F9'}}>
                      <Card.Body>
                      <Row>
                        <Col><Card.Subtitle className="mb-2 text-muted">سحب رصيد</Card.Subtitle></Col>
                        <Col><Card.Subtitle className="mb-2 text-muted" style={{textAlign:'right'}}>$0.00</Card.Subtitle></Col>
                      </Row>
                        <Card.Text>
                        قم بسحب رصيدك إلى طريقة السحب المفضلة لديك
                        </Card.Text>
                        <Row>
                        <Col>
                        <Card className="text-center" style={{background:'#F7F9F9'}}>
                        <Card.Body>
                          <Card.Title><MdOutlineAccessTime /></Card.Title>
                          <Card.Text style={{fontSize:'13px'}}>
                          عادي
                          </Card.Text>
                          <Card.Text style={{fontSize:'13px'}}>
                          ساعة إلى ٧٢ ساعة
                          </Card.Text>
                        </Card.Body>
                      </Card>
                        </Col>
                        <Col>
                        <Card className="text-center" style={{background:'#F7F9F9'}}>
                        <Card.Body>
                          <Card.Title><IoIosRocket /></Card.Title>
                          <Card.Text style={{fontSize:'13px'}}>
                          مستعجل
                          </Card.Text>
                          <Card.Text style={{fontSize:'13px'}}>
                          في نفس الوقت
                          </Card.Text>
                        </Card.Body>
                      </Card>
                        </Col>
                      </Row>
                      </Card.Body>
                      <Card.Footer className="text-muted"> <PiWarningCircle />تعليمات هامة بخصوص طلبات السحب</Card.Footer>
                    </Card>
                    </Tab>
                    <Tab eventKey="تحويل" title="تحويل">
                    <Card style={{background:'#F7F9F9'}}>
                    <Card.Body>
                    <Row>
                        <Col><Card.Subtitle className="mb-2 text-muted">تحويل رصيد</Card.Subtitle></Col>
                        <Col><Card.Subtitle className="mb-2 text-muted" style={{textAlign:'right'}}>$0.00</Card.Subtitle></Col>
                      </Row>
                      <Card.Subtitle className="mb-2 text-muted">قم بتحويل رصيد إلى مستخدم أخر</Card.Subtitle><br/>
                      <Form style={{textAlign:'center'}}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>إسم مستخدم المستفيد</Form.Label>
                        <Form.Control type="text" className='username' />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>المبلغ</Form.Label>
                        <Form.Control type="number" className='Amount' />
                      </Form.Group>

                      <Form.Group className="mb-3">
                      <Form.Label>سبب التحويل</Form.Label>
                      <Form.Select >
                        <option>سبب التحويل</option>
                        <option>سبب التحويل </option>
                      </Form.Select>
                    </Form.Group>
                     <p>المبلغ المتوقع إستلامه: $0</p>
                     <Button variant="primary" type="submit" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                        😎تنفيذ البوست
                      </Button>
                    </Form>
                    </Card.Body>
                  </Card>
                    </Tab>
                    <Tab eventKey="إيداع" title="إيداع" >
                    <div className="col d-flex align-items-center justify-content-center">
                        <div className="">
                          <div className="col-12">
                            <Form className='sign__form'>
                            <div className="col d-flex align-items-center justify-content-center">
                              <div className="">
                                <div className="col-12">
                                  <Form className='sign__form'>
                                    <h3 className="mb-3 text-primary">المستخدمين</h3>
                                    <p style={{ textAlign: 'center', fontSize: '14px' }}>
                                      يمكنك جعل خدمتك تظهر في بداية الخدمات وأيضاً إظهار كلمة (خدمة مميزة) أسفل الخدمة🥰
                                    </p>
                                    <DayCounter
                                      totalPrice={totalPrice3}
                                      onDecrease={handleDecrease3}
                                      onIncrease={handleIncrease3}
                                    />
                                    <Button variant="primary" type="submit" className="w-100">
                                    <IoCardOutline />إيداع عبر البطاقة
                                    </Button><br/>

                                    <Button variant="primary" type="submit" className="w-100">
                                    <FaBitcoin />إيداع عبر العملات الرقمية 
                                    </Button>
                             
                                  </Form>
                                </div>
                              </div>
                            </div>
                            </Form>
                            </div>
                            </div>
                          </div>   
                    </Tab>
                    <Tab eventKey="بنكي" title="بنكي" >
                    <Card style={{ width: '32rem',background:'#F7F9F9'}}>
                      <Card.Body>
                      <Row>
                        <Col><Card.Subtitle className="mb-2 text-muted"> <BsBank />حساباتي البنكية</Card.Subtitle></Col>
                      </Row>
                        <Card.Text>
                        إدارة حساباتك البنكية المربوطة
                        </Card.Text>
                        <Card.Text>
                        الحسابات البنكية
                        </Card.Text>
                      </Card.Body>

                    </Card>
                    </Tab>
                  </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      )}
    </>
  );
}

export default Wallet;
