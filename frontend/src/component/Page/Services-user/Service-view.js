import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Modal, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MyPaymentModal({ show, onHide }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" style={{ fontSize: '18px' }}>
          تعليمات البائع
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ color: 'red', padding: '10px' }}>
          الحساب مربوط ب ايدي سوني موجود بنفس إيميل الايبك<br />
          <span style={{ color: 'black' }}>إختيار طريقة الدفع</span>
        </p>
        <div className='btn'>
          <Button variant="primary" style={{ background: '#73a73e', width: '100%', border: 'none', marginBottom: '10px' }}>
            العملات الرقمية
          </Button>
          <Button variant="primary" style={{ background: '#a73e3e', width: '100%', border: 'none' }}>
            فيزا - ماستر كارد - مدى - ابل باي - استي سي باي
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

function Serviceview({ isOTPLoggedIn, OTPLoggedUserData }) {
  const [userdata, setUserdata] = useState(null);
  const { id } = useParams();
  const [fetchedItem, setFetchedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [userinfo, setUserInfo] = useState(null);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (isOTPLoggedIn) {
      setUserdata(OTPLoggedUserData?.preuser || {});
    }
  }, [isOTPLoggedIn, OTPLoggedUserData]);

  useEffect(() => {
    const fetchUserData = () => {
      try {
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        setUserdata(userDetails || {});
      } catch (error) {
        console.error('Error fetching user data from localStorage:', error);
      }
    };

    fetchUserData();
    const intervalId = setInterval(fetchUserData, 300000); // 5 minutes interval

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const getUserId = localStorage.getItem("socialMediaAccountViewId");
        const [itemResponse, userResponse] = await Promise.all([
          fetch(`${process.env.REACT_APP_API_HOST}/service/${id}`),
          fetch(`${process.env.REACT_APP_API_HOST}/register/${getUserId}`)
        ]);

        if (!itemResponse.ok || !userResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const itemData = await itemResponse.json();
        const userData = await userResponse.json();

        setFetchedItem(itemData);
        setUserInfo(userData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  useEffect(() => {
    // Initialize formData with user ID
    setFormData(prevData => ({
      ...prevData,
      userid: userinfo?._id || ''
    }));
  }, [userinfo]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.documentnumber) {
      errors.documentnumber = "Document number is required";
    }
    // Add other validations as needed
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/servicerequest`, formData);
      console.log(response.data);
      navigate("/الخدمات");
      // Optionally show success message or handle form reset here
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!fetchedItem) {
    return <div>Item not found</div>;
  }

  return (
    <>
      <Container>
        <Row>
          <div style={{ marginTop: '50px', marginBottom: '10px' }}>
            <h2 className='entry-title'>الطلبات</h2>
          </div>
          <Col style={{ backgroundColor: '#FFFFFF' }}></Col>
        </Row>
        <Row>
          <Col>
            <div className="col d-flex align-items-center justify-content-center" style={{ width: '100%', padding: '30px' }}>
              <div className="">
                <div className="col-12">
                  <div className="sign">
                    <div className="sign__content">
                      <Form className='sign__form' style={{ maxWidth: '600px' }} onSubmit={handleSubmit}>
                        <h3 style={{ marginBottom: '30px', color: 'rgb(97, 100, 255)', textAlign: 'center' }}>
                          {fetchedItem.service_heading}
                        </h3>
                        <p style={{ textAlign: 'center', fontSize: '14px' }}>
                          {fetchedItem.service_dec}
                        </p>
                        <ul className="asset__authors" style={{ justifyContent: 'center' }}>
                          <li>
                            <span>البائع</span>
                            <div className="asset__author" style={{ justifyContent: 'center' }}>
                              <img src={`${process.env.REACT_APP_API_HOST}/uploads/${userinfo?.imgpath || "https://usr.dokan-cdn.com/img/avatars/default.jpg"}`} alt="" />
                              <a href="#" style={{ fontSize: '12px' }}>
                                @{userinfo?.displayName}
                              </a>
                            </div>
                          </li>
                          <li style={{ paddingTop: '13px' }}>
                            <span>الفئة</span>
                            <div className="asset__author">
                              <a href="https://usr.gg/gaming?game=2">{fetchedItem.service_type}</a>
                            </div>
                          </li>
                          <li style={{ paddingTop: '13px' }}>
                            <span>الوقت التقريبي لتنفيذ الخدمة</span>
                            <div className="asset__author">
                              <a href="https://usr.gg/gaming?platform=1">{fetchedItem.service_time_houre}</a>
                            </div>
                          </li>
                        </ul>
                        <Form.Group className="mb-3" controlId="formGridUserId" style={{ width: '100%' }}>
                          <Form.Label>الإسم الأول</Form.Label>
                          <Form.Control 
                            placeholder="الإسم الأول" 
                            name="userid" 
                            value={formData.userid || ''} 
                            readOnly 
                          />
                        </Form.Group>
                        {Array.isArray(fetchedItem?.additionalFields1) && fetchedItem.additionalFields1.length > 0 && (
                          <>
                            <h3 style={{ marginBottom: '30px', color: 'rgb(97, 100, 255)', fontSize: '23px', textAlign: 'center' }}>
                              تفاصيل طلب الخدمة
                            </h3>
                            {fetchedItem.additionalFields1.map((field, index) => (
                              <Form.Group key={index} className="mb-3" controlId={`formGridField${index}`} style={{ width: '100%' }}>
                                <Form.Label>{field.title}</Form.Label>
                                <Form.Control
                                  placeholder="الإسم الأول"
                                  className='sign__input'
                                  name={`field${index}`}
                                  onChange={handleChange}
                                />
                                {formErrors[`field${index}`] && <Form.Text className="text-danger">{formErrors[`field${index}`]}</Form.Text>}
                              </Form.Group>
                            ))}
                          </>
                        )}
                        {Array.isArray(fetchedItem?.additionalFields) && fetchedItem.additionalFields.length > 0 && (
                          <>
                            <h3 style={{ marginBottom: '30px', color: 'rgb(97, 100, 255)', fontSize: '23px', textAlign: 'center' }}>
                              خيارات إضافية مدفوعة
                            </h3>
                            <p>
                              العروض مستمرة الى نهاية الشهر 😍 لا تشمل عروض الاضعاف ، لا تشمل عرض دبل المتابعين ، لا تشمل عرض زيادة المتابعين
                            </p>
                            {fetchedItem.additionalFields.map((field, index) => (
                              <Form.Group key={index} className="mb-3" controlId={`formGridAddress${index}`} style={{ width: '100%' }}>
                                <Form.Label>{field.title}</Form.Label>
                                <Form.Select
                                  aria-label="Default select example"
                                  className='sign__input'
                                  name={`documentcountry${index}`}
                                  onChange={handleChange}
                                >
                                  {Array.isArray(field?.fields) && field.fields.length > 0 ? (
                                    field.fields.map((optionField, i) => (
                                      <option value={optionField.value} key={i}>{optionField.title} + {optionField.amount}</option>
                                    ))
                                  ) : (
                                    <option disabled>No additional fields available</option>
                                  )}
                                </Form.Select>
                              </Form.Group>
                            ))}
                          </>
                        )}
                        <Form.Group className="mb-3" controlId="formGridDocumentNumber" style={{ width: '100%' }}>
                          <Form.Label>الكمية</Form.Label>
                          <Form.Control
                            placeholder="رقم وثيقة الإثبات"
                            className='sign__input'
                            name="documentnumber"
                            type='number'
                            onChange={handleChange}
                          />
                          {formErrors.documentnumber && <Form.Text className="text-danger">{formErrors.documentnumber}</Form.Text>}
                        </Form.Group>
                        <div className="text-center">
                          <Button
                            type="submit"
                            style={{ width: '100%', backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}
                          >
                            إضافة إلى السلة
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <MyPaymentModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Container>
    </>
  );
}

export default Serviceview;