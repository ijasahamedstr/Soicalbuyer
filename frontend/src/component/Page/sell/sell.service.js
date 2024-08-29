import React, { useEffect, useState } from 'react'; 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';  // Import SweetAlert2
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

function Sellservice() {
  const [userdata, setUserdata] = useState(null);
  const [service_heading, setService_heading] = useState("");
  const [service_type, setService_type] = useState("");
  const [service_dec, setService_dec] = useState("");
  const [service_Amount, setService_Amount] = useState("");
  const [service_time_houre, setService_time_houre] = useState("");
  const [service_buy_Amount, setService_buy_Amount] = useState("");
  const [service_Staus, setService_Staus] = useState("");
  const navigate = useNavigate();

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

  // Handle changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'service_heading':
        setService_heading(value);
        break;
      case 'service_type':
        setService_type(value);
        break;
      case 'service_dec':
        setService_dec(value);
        break;
      case 'service_Amount':
        setService_Amount(value);
        break;
      case 'service_time_houre':
        setService_time_houre(value);
        break;
      case 'service_buy_Amount':
        setService_buy_Amount(value);
        break;
      case 'service_Staus':
        setService_Staus(value);
        break;
      default:
        break;
    }
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      userid: String(userdata?._id), // Convert _id to string if necessary
      service_heading,
      service_type,
      service_dec,
      service_Amount,
      service_time_houre,
      service_buy_Amount,
      service_Staus,
    };
    
    try {
      const res = await axios.post("http://localhost:8000/service", formData);
      
      if (res.data.status === 401 || !res.data) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error occurred while uploading data!',
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'User data uploaded successfully.',
        });
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error occurred while uploading data!',
      });
    }
  };

  const marginTopValue = '50px';
  const marginBottomValue = '20px';
  
  return (
    <>
      <Container>
        <Row>
          <div
            style={{
              marginTop: marginTopValue,
              marginBottom: marginBottomValue,
            }}
          >
            <h2
              style={{
                textAlign: 'center',
                fontSize: '20px',
                color: 'white',
                background: 'red',
                padding: '15px',
              }}
            >
             منصة يوزر لن تطلب منك بيانات الحساب خارج هذه الصفحة بشكل نهائي | ولن تطلب منك تسليم أي بيانات عبر الواتس اب او منصات أخرى
            </h2>
          </div>
          <Col style={{ backgroundColor: '#FFFFFF' }}>
            <h4>بيع خدمة</h4>

            <h6
              style={{
                textAlign: 'center',
                fontSize: '15px',
                color: 'white',
                background: '#8037ff',
                padding: '15px',
              }}
            > 
جديد : هذه الميزة متاحة للمستخدمين العاديين برسوم ١٠٪ , ولمستخدمي باقة لايت برسوم ٥٪ , ولمستخدمي باقة برو برسوم ٣٪</h6>
            <Container>
              <Row>
                <Col style={{ backgroundColor: '#FFFFFF' }}></Col>
              </Row>
              <Row style={{ background: '#F7F9F9', padding: '30px' }}>
                <Col>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicHeading">
                      <Form.Label>عنوان الخدمة</Form.Label>
                      <Form.Control
                        type="text"
                        name="service_heading"
                        value={service_heading}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>نوع الخدمة </Form.Label>
                      <Form.Select
                        name="service_type"
                        value={service_type}
                        onChange={handleChange}
                      >
                        <option value="1">خدمات المتابعين</option>
                        <option value="2">خدمات إستضافة</option>
                        <option value="3">خدمات أخرى</option>
                        <option value="4">خدمات الالعاب</option>
                        <option value="5">خدمات البرمجة</option>
                        <option value="6">خدمات التصميم</option>
                        <option value="7">خدمات المونتاج</option>
                        <option value="8">خدمات FiveM</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDescription">
                      <Form.Label>وصف الحساب</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="service_dec"
                        value={service_dec}
                        onChange={handleChange}
                      />
                      <p>لاتقم بوضع أي طريقة تواصل خارج المنصة في الوصف بشكل نهائي لأنها قد تعرض حسابك للحظر!</p>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicAmount">
                      <Form.Label>السعر (بالدولار)</Form.Label>
                      <Form.Control
                        type="text"
                        name="service_Amount"
                        value={service_Amount}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicTime">
                      <Form.Label>كم ساعة يستغرق تسليم الخدمة؟</Form.Label>
                      <Form.Control
                        type="number"
                        name="service_time_houre"
                        value={service_time_houre}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicBuyAmount">
                      <Form.Label>أقصى كمية يمكن العميل شراءها </Form.Label>
                      <Form.Control
                        type="text"
                        name="service_buy_Amount"
                        value={service_buy_Amount}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <p style={{ textAlign: 'center' }}>المبلغ الذي سيتم إيداعه في حسابك في المنصة بعد البيع: 100</p>

                    <Row>
                      <Col>
                        <Button variant="primary" type="submit" style={{ fontFamily: 'Noto Kufi Arabic', fontSize: '13px',background:'#6164ff' }}>
                          عرض الخدمة
                        </Button>
                      </Col>
                      <Col>
                        <Button variant="primary" type="button" style={{ fontFamily: 'Noto Kufi Arabic', fontSize: '13px',background:'grey' }}>
                          إضافة خيارات مدفوعة
                        </Button>
                      </Col>
                      <Col>
                        <Button variant="primary" type="button" style={{ fontFamily: 'Noto Kufi Arabic', fontSize: '13px',background:'#cb910d' }}>
                          إضافة حقول بيانات
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Sellservice;
