import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './wallet.css';
import 'reactjs-popup/dist/index.css';
import { Container, Row, Col, Form, Button, Tabs, Tab, Card, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { sentOtpFunction, Verify } from "../../Page/LoginPage/LoginAPI/Apis.js";
import { useNavigate } from 'react-router-dom';
import { MdOutlineAccessTime } from "react-icons/md";
import { PiWarningCircle } from "react-icons/pi";
import { IoIosRocket } from "react-icons/io";
import { IoCardOutline } from "react-icons/io5";
import { FaBitcoin } from "react-icons/fa";
import { BsBank } from "react-icons/bs";
import axios from 'axios'; // or your preferred method for API requests

function MyVerticallyCenteredModal(props) {
  const [userdata, setUserdata] = useState(null);
  const [bankAccountName, setBankAccountName] = useState("");
  const [iban, setIban] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Replace with your API endpoint
      const response = await axios.post('http://localhost:8000/bank', {
        userId: userdata?._id,
        bankAccountName,
        iban,
        accountNumber,
      });

      if (response.status === 200) {
        // Handle success
        props.onHide(); // Close the modal
        // Optionally show a success message
      } else {
        // Handle error
        console.error('Failed to save bank account', response.data);
      }
    } catch (error) {
      console.error('An error occurred while saving the bank account', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          إضافة حساب بنكي
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          يجب أن يكون اسم صاحب الحساب البنكي مطابق لإسم صاحب وثقية التفعيل لضمان وصول المبلغ لحسابك البنكي
        </p>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGridAddress2" style={{ width: '100%' }}>
            <Form.Control
              placeholder="الإسم الاول"
              name="userid"
              value={userdata?._id || ""}
              readOnly
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>إسم صاحب الحساب البنكي</Form.Label>
            <Form.Control
              type="text"
              placeholder="مد ساجال تورول"
              value={bankAccountName}
              onChange={(e) => setBankAccountName(e.target.value)}
              required
              style={{ fontFamily: "Changa, sans-serif" }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>إيبان الحساب البنكي</Form.Label>
            <Form.Control
              type="text"
              placeholder="مثال : SAXXXXXXXXXXXXXX"
              value={iban}
              onChange={(e) => setIban(e.target.value)}
              required
              style={{ fontFamily: "Changa, sans-serif" }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>رقم الحساب البنكي</Form.Label>
            <Form.Control
              type="text"
              placeholder="مثال : XXXXXXXXXXXX"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
              style={{ fontFamily: "Changa, sans-serif" }}
            />
          </Form.Group>
          <p style={{ color: 'red' }}>
            **** يجب أن يكون اسم صاحب الحساب البنكي مطابق لإسم صاحب وثقية التفعيل لضمان وصول المبلغ لحسابك البنكي.
          </p>
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? 'حفظ...' : 'حفظ'}
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

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
  const [modalShow, setModalShow] = useState(false);
  const [userdata, setUserdata] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

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
      const data = { otp, email: userdata.email, Accountstatus: 'verified' };

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

  const [totalPrice3, setTotalPrice3] = useState(10); // Initial total price
  const priceIncrement = 5; // Fixed increment amount

  const handleDecrease3 = () => {
    if (totalPrice3 > 0) {
      const newPrice = totalPrice3 - priceIncrement;
      setTotalPrice3(newPrice >= 0 ? newPrice : 0); // Ensure price doesn't go below 0
    }
  };

  const handleIncrease3 = () => {
    setTotalPrice3(totalPrice3 + priceIncrement);
  };

  const [username, setUsername] = useState('');
  const [points, setPoints] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');


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

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    setMessage('');

    // Ensure points is a number
    const numericPoints = parseFloat(points);

    if (isNaN(numericPoints) || numericPoints <= 0) {
        setMessage('Invalid points amount.');
        return;
    }

    if (userdata && numericPoints > userdata.currentbalance) {
        setMessage('Insufficient balance.');
        return;
    }

    try {
        const userdbtoken = localStorage.getItem('userdbtoken'); // Ensure 'userdbtoken' is the correct key
        if (!userdbtoken) {
            setMessage('User not authenticated.');
            return;
        }

        const response = await fetch('http://localhost:8000/point', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userdbtoken}` // Ensure this is the correct format
            },
            body: JSON.stringify({ username, currentbalance: numericPoints, reason }), // Correct field names
        });

        const result = await response.json();
        if (response.ok) {
            setMessage('Transfer successful!');
            const updatedBalance = userdata.currentbalance - numericPoints;
            setUserdata(prev => ({
                ...prev,
                currentbalance: updatedBalance, // Correct field name
            }));
            localStorage.setItem('userDetails', JSON.stringify({
                ...userdata,
                currentbalance: updatedBalance, // Correct field name
            }));
        } else {
            // Show detailed error message
            setMessage(result.message || 'Transfer failed.');
        }
    } catch (error) {
        console.error('Error during points transfer:', error);
        setMessage('An error occurred.');
    }
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
                <div>
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
                <div>
                  <h2 style={{ textAlign: 'center', fontFamily: 'Changa, sans-serif', marginTop: '1.5rem' }}>المحفظة</h2>
                  <div className="sign">
                    <div className="sign__content" style={{ display: 'grid' }}>
                      <Tabs
                        defaultActiveKey="سحب"
                        transition={false}
                        id="fill-tab-example"
                        className="mb-3"
                      >
                        <Tab eventKey="سحب" title="سحب">
                          <Card style={{ width: '32rem', background: '#F7F9F9' }}>
                            <Card.Body>
                              <Row>
                                <Col><Card.Subtitle className="mb-2 text-muted">سحب رصيد</Card.Subtitle></Col>
                                <Col><Card.Subtitle className="mb-2 text-muted" style={{ textAlign: 'right' }}>$0.00</Card.Subtitle></Col>
                              </Row>
                              <Card.Text>
                                قم بسحب رصيدك إلى طريقة السحب المفضلة لديك
                              </Card.Text>
                              <Row>
                                <Col>
                                  <Card className="text-center" style={{ background: '#F7F9F9' }}>
                                    <Card.Body>
                                      <Card.Title><MdOutlineAccessTime /></Card.Title>
                                      <Card.Text style={{ fontSize: '13px' }}>
                                        عادي
                                      </Card.Text>
                                      <Card.Text style={{ fontSize: '13px' }}>
                                        ساعة إلى ٧٢ ساعة
                                      </Card.Text>
                                    </Card.Body>
                                  </Card>
                                </Col>
                                <Col>
                                  <Card className="text-center" style={{ background: '#F7F9F9' }}>
                                    <Card.Body>
                                      <Card.Title><IoIosRocket /></Card.Title>
                                      <Card.Text style={{ fontSize: '13px' }}>
                                        مستعجل
                                      </Card.Text>
                                      <Card.Text style={{ fontSize: '13px' }}>
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
                          <Card style={{ background: '#F7F9F9' }}>
                            <Card.Body>
                              <Row>
                                <Col><Card.Subtitle className="mb-2 text-muted">تحويل رصيد</Card.Subtitle></Col>
                                <Col><Card.Subtitle className="mb-2 text-muted" style={{ textAlign: 'right' }}>${userdata?.currentbalance}</Card.Subtitle></Col>
                              </Row>
                              <Card.Subtitle className="mb-2 text-muted">قم بتحويل رصيد إلى مستخدم أخر</Card.Subtitle><br />
                              <Form style={{ textAlign: 'center' }} onSubmit={handleSubmit1}>
                              <Form.Group className="mb-3" controlId="username">
                                <Form.Label>إسم مستخدم المستفيد</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="أدخل اسم المستخدم"
                                  value={username} onChange={(e) => setUsername(e.target.value)}
                                  required
                                />
                              </Form.Group>

                              <Form.Group className="mb-3" controlId="amount">
                                <Form.Label>المبلغ</Form.Label>
                                <Form.Control
                                  type="number"
                                  placeholder="أدخل المبلغ"
                                  value={points}   onChange={(e) => setPoints(e.target.value)} 
                                  required
                                  min="1"
                                />
                              </Form.Group>

                              <Form.Group className="mb-3" controlId="reason">
                                <Form.Label>سبب التحويل</Form.Label>
                                <Form.Select
                                  value={reason}
                                  onChange={(e) => setReason(e.target.value)}
                                  required
                                >
                                  <option value="" disabled>اختار سبب التحويل</option> {/* Placeholder option */}
                                  <option value="تحويل رصيد">تحويل رصيد</option>
                                  <option value="مدفوعات">مدفوعات</option>
                                  <option value="شراء منتجات">شراء منتجات</option>
                                  <option value="خدمة">خدمة</option>
                                  {/* Add more options as needed */}
                                </Form.Select>
                              </Form.Group>

                              <p>المبلغ المتوقع إستلامه: $</p>

                              <Button variant="primary" type="submit" style={{ fontFamily: 'Noto Kufi Arabic' }}>
                                😎 تنفيذ البوست
                              </Button>
                            </Form>
                            </Card.Body>
                          </Card>
                        </Tab>
                        <Tab eventKey="إيداع" title="إيداع">
                          <div className="col d-flex align-items-center justify-content-center">
                            <div>
                              <div className="col-12">
                                <Form className='sign__form' > 
                                  <div className="col d-flex align-items-center justify-content-center">
                                    <div>
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
                                          </Button><br />
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
                        <Tab eventKey="بنكي" title="بنكي">
                          <Card style={{ width: '32rem', background: '#F7F9F9' }}>
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
                            <Button variant="primary" onClick={() => setModalShow(true)} style={{ width: '100%' }}>
                              إضافة حساب بنكي
                            </Button>
                            <MyVerticallyCenteredModal
                              show={modalShow}
                              onHide={() => setModalShow(false)}
                            />
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
