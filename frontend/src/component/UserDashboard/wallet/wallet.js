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
                <div className="col-12 col-md-6 col-lg-9">
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
              <div className="col-12 col-md-6 col-lg-9">
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
                    <Card style={{ width: '32rem',background:'#ffff'}}>
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
                        <Card className="text-center" style={{ width: '12rem', background:'#ffff'}}>
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
                        <Card className="text-center" style={{ width: '12rem', background:'#ffff'}}>
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
                      Tab content for Profile
                    </Tab>
                    <Tab eventKey="إيداع" title="إيداع" >
                      Tab content for Contact
                    </Tab>
                    <Tab eventKey="بنكي" title="بنكي" >
                      Tab content for Contact
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
