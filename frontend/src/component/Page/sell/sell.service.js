import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
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
  const [service_Staus, setService_Staus] = useState("Pending");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
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
      userid: String(userdata?._id),
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

  // Fetch job listings
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/service');
        const userPosts = response.data.filter(item => item.userid === userdata?._id);
        setData(userPosts);
      } catch (error) {
        console.error('Error fetching job listings:', error);
        setError('Failed to fetch job listings.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userdata]);

  const marginTopValue = '50px';
  const marginBottomValue = '20px';
  
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      
      {data.filter(item => item.service_Staus === 'Pending').length > 0 ? (
         <Container>
         {/* Stack the columns on mobile by making one full-width and the other half-width */}
         <Row>
         <div style={{marginTop:marginTopValue,marginBottom:marginBottomValue}}><h2 className='entry-title'>الطلبات</h2></div>
           <Col style={{backgroundColor:'#FFFFFF'}}>
           </Col>
         </Row>
         <Row>
           <Col>
             <div class="col d-flex align-items-center justify-content-center">
             <div className="">
             <div class="col-12">
             <div class="col-12">
             <div class="sign">
             <div class="sign__content">
             <Form className='sign__form'>
             <h1 class="page-404__title" style={{fontFamily:'Inter'}}>401</h1>
             <p class="page-404__text">لديك خدمة قيد المراجعة بالفعل, الرجاء الإنتظار لحين الإنتهاء من مراجعتها</p>
             <Button variant="primary" type="submit" style={{fontFamily:'Noto Kufi Arabic'}}>           
              العودة  
             </Button>
             </Form>
             </div>
             </div>
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
                جديد : هذه الميزة متاحة للمستخدمين العاديين برسوم ١٠٪ , ولمستخدمي باقة لايت برسوم ٥٪ , ولمستخدمي باقة برو برسوم ٣٪
              </h6>

              <Container>
                <Row style={{ background: '#F7F9F9', padding: '30px' }}>
                  <Col>
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicHeading" style={{ width: '100%' }}>
                        <Form.Label>عنوان الخدمة</Form.Label>
                        <Form.Control
                          type="text"
                          name="service_heading"
                          value={service_heading}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" style={{ width: '100%' }}>
                        <Form.Label>نوع الخدمة</Form.Label>
                        <Form.Select
                          name="service_type"
                          value={service_type}
                          onChange={handleChange}
                        >
                          <option value="خدمات المتابعين">خدمات المتابعين</option>
                          <option value="خدمات إستضافة">خدمات إستضافة</option>
                          <option value="خدمات أخرى">خدمات أخرى</option>
                          <option value="خدمات الالعاب">خدمات الالعاب</option>
                          <option value="خدمات البرمجة">خدمات البرمجة</option>
                          <option value="خدمات التصميم">خدمات التصميم</option>
                          <option value="خدمات المونتاج">خدمات المونتاج</option>
                          <option value="خدمات FiveM">خدمات FiveM</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicDescription" style={{ width: '100%' }}>
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

                      <Form.Group className="mb-3" controlId="formBasicAmount" style={{ width: '100%' }}>
                        <Form.Label>السعر (بالدولار)</Form.Label>
                        <Form.Control
                          type="text"
                          name="service_Amount"
                          value={service_Amount}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicTime" style={{ width: '100%' }}>
                        <Form.Label>كم ساعة يستغرق تسليم الخدمة؟</Form.Label>
                        <Form.Control
                          type="number"
                          name="service_time_houre"
                          value={service_time_houre}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicBuyAmount" style={{ width: '100%' }}>
                        <Form.Label>أقصى كمية يمكن العميل شراءها</Form.Label>
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
                          <Button variant="primary" type="submit" style={{ fontFamily: 'Noto Kufi Arabic', fontSize: '13px', background: '#6164ff' }}>
                            عرض الخدمة
                          </Button>
                        </Col>
                        <Col>
                          <Button variant="primary" type="button" style={{ fontFamily: 'Noto Kufi Arabic', fontSize: '13px', background: 'grey' }}>
                            إضافة خيارات مدفوعة
                          </Button>
                        </Col>
                        <Col>
                          <Button variant="primary" type="button" style={{ fontFamily: 'Noto Kufi Arabic', fontSize: '13px', background: '#cb910d' }}>
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
      )}
    </>
  );
}

export default Sellservice;
