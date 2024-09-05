import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function MyVerticallyCenteredModal(props) {
  const [isAdditionalFieldsVisible, setIsAdditionalFieldsVisible] = useState(false);
  const [additionalFields, setAdditionalFields] = useState([]);
  const [additionalFields1, setAdditionalFields1] = useState([]);

  const handleToggleAdditionalFields = () => {
    setIsAdditionalFieldsVisible(!isAdditionalFieldsVisible);
  };

  const handleAddField = () => {
    setAdditionalFields([...additionalFields, { id: Date.now() }]);
  };

  const handleAddField1 = () => {
    setAdditionalFields1([...additionalFields1, { id: Date.now() }]);
  };

  const handleRemoveField = (id) => {
    setAdditionalFields(additionalFields.filter(field => field.id !== id));
  };

  const handleRemoveField1 = (id) => {
    setAdditionalFields1(additionalFields1.filter(field => field.id !== id));
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          إضافة خيارات مدفوعة
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          يمكنك إضافة خيارات مدفوعة بحيث يتمكن المشتري من اختيار خيار مقابل زيادة قيمة الخيار على المبلغ.
        </p>
        <p>الخيارات الإضافية المدفوعة</p>

        <Container style={{ width: '50%' }}>
          {additionalFields1.map(field => (
            <div key={field.id}>
              <Row className="my-4">
                <Col className="d-flex align-items-center justify-content-center">
                  <Form>
                    <h5 className="text-center">تفعيل الحساب بالهوية يمكنك من التالي</h5>
                    <Form.Group className="mb-3" controlId={`formAdditionalField1-${field.id}`}>
                      <Form.Label>عنوان الحقل</Form.Label>
                      <Form.Control className='sign__input' name={`additionalField1-${field.id}`} />
                    </Form.Group>

                    {additionalFields.map(innerField => (
                      <div key={innerField.id}>
                        <hr />
                        <Form.Group className="mb-3" controlId={`formAdditionalField2-${innerField.id}`}>
                          <Form.Label>عنوان الحقل</Form.Label>
                          <Form.Control className='sign__input' name={`additionalField2-${innerField.id}`} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId={`formAdditionalField3-${innerField.id}`}>
                          <Form.Label>عنوان الحقل</Form.Label>
                          <Form.Control className='sign__input' name={`additionalField3-${innerField.id}`} type='number' />
                        </Form.Group>

                        <Button
                          variant="danger"
                          type="button"
                          className="w-100"
                          style={{ fontFamily: 'Noto Kufi Arabic', fontSize: '13px', background: '#bb1839' }}
                          onClick={() => handleRemoveField(innerField.id)}
                        >
                          حذف حقل الخيار
                        </Button>
                        <hr />
                      </div>
                    ))}

                    <Button
                      variant="danger"
                      type="button"
                      className="w-100"
                      style={{ fontFamily: 'Noto Kufi Arabic', fontSize: '13px', background: '#6f18bb' }}
                      onClick={handleAddField}
                    >
                      إضافة خيار
                    </Button>
                    <br />
                    <br />
                    <Button
                      variant="danger"
                      type="button"
                      className="w-100"
                      style={{ fontFamily: 'Noto Kufi Arabic', fontSize: '13px', background: '#bb1839' }}
                      onClick={() => handleRemoveField1(field.id)}
                    >
                      {isAdditionalFieldsVisible ? 'إخفاء الحقول' : 'عرض الحقول'}
                    </Button>
                  </Form>
                </Col>
              </Row>
            </div>
          ))}

          <Button
            variant="primary"
            style={{ background: '#bb3e18', width: '100%', border: 'none' }}
            onClick={handleAddField1}
          >
            {isAdditionalFieldsVisible ? 'حذف الحقل' : 'إضافة بيانات إضافية'}
          </Button>
        </Container>
      </Modal.Body>
    </Modal>
  );
}




function MyVerticallyCenteredModal1(props) {
  const [isAdditionalFieldsVisible, setIsAdditionalFieldsVisible] = useState(false);
  const [additionalFields, setAdditionalFields] = useState([]);

  const handleAddField = () => {
    setAdditionalFields([...additionalFields, { id: Date.now(), title: '', documentType: '' }]);
  };

  const handleRemoveField = (id) => {
    setAdditionalFields(additionalFields.filter(field => field.id !== id));
  };

  const handleChangeField = (id, e) => {
    const { name, value } = e.target;
    setAdditionalFields(additionalFields.map(field => field.id === id ? { ...field, [name]: value } : field));
  };

  const handleToggleAdditionalFields = () => {
    setIsAdditionalFieldsVisible(!isAdditionalFieldsVisible);
  };

  const handleSave = () => {
    props.handleAdditionalFieldsChange(additionalFields);
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          إضافة خيارات مدفوعة
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          يمكنك إضافة خيارات مدفوعة بحيث يتمكن المشتري من اختيار خيار مقابل زيادة قيمة الخيار على المبلغ.
        </p>
        <p>الخيارات الإضافية المدفوعة</p>

        <Container style={{ width: '50%' }}>
          {isAdditionalFieldsVisible && (
            <Row className="my-4">
              <Col className="d-flex align-items-center justify-content-center">
                <Form>
                  <h5 className="text-center">تفعيل الحساب بالهوية يمكنك من التالي</h5>
                  
                  {additionalFields.map(field => (
                    <div key={field.id}>
                      <Form.Group className="mb-3" controlId={`formAdditionalField-${field.id}`}>
                        <Form.Label>عنوان الحقل</Form.Label>
                        <Form.Control
                          className='sign__input'
                          name="title"
                          value={field.title}
                          onChange={(e) => handleChangeField(field.id, e)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formGridAddress2" style={{width:'100%'}}>
                        <Form.Label>نوع الوثيقة</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          className='sign__input'
                          name="documentType"
                          value={field.documentType}
                          onChange={(e) => handleChangeField(field.id, e)}
                        >
                          <option value="نصي">نصي</option>
                          <option value="رقمي">رقمي</option>
                        </Form.Select>
                      </Form.Group>
                      <Button
                        variant="danger"
                        type="button"
                        className="w-100 mb-2"
                        style={{ fontFamily: 'Noto Kufi Arabic', fontSize: '13px', background: '#bb1839' }}
                        onClick={() => handleRemoveField(field.id)}
                      >
                        حذف الحقل 
                      </Button>
                      <hr />
                    </div>
                  ))}

                  <Button
                    variant="danger"
                    type="button"
                    className="w-100"
                    style={{ fontFamily: 'Noto Kufi Arabic', fontSize: '13px', background: '#17b643' }}
                    onClick={handleAddField}
                  >
                    إضافة حقل إضافي
                  </Button>
                </Form>
              </Col>
            </Row>
          )}

          <Button
            variant="primary"
            style={{ background: '#bb3e18', width: '100%', border: 'none' }}
            onClick={handleToggleAdditionalFields}
          >
            {isAdditionalFieldsVisible ? 'حذف الحقل' : 'إضافة بيانات إضافية'}
          </Button>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>إغلاق</Button>
        <Button variant="primary" onClick={handleSave}>حفظ</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Sellservice() {
  const [userdata, setUserdata] = useState(null);
  const [formState, setFormState] = useState({
    service_heading: '',
    service_type: '',
    service_dec: '',
    service_Amount: '',
    service_time_houre: '',
    service_buy_Amount: '',
    service_Staus: 'Pending',
    additionalFields: [] // Add additional fields to the state
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAdditionalFieldsChange = (fields) => {
    setFormState(prevState => ({
      ...prevState,
      additionalFields: fields
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/service", {
        userid: String(userdata?._id),
        ...formState
      });

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

    if (userdata) {
      fetchData();
    }
  }, [userdata]);

  const marginTopValue = '50px';
  const marginBottomValue = '20px';

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {data.some(item => item.service_Staus === 'Pending') ? (
        <Container>
          <Row>
            <div style={{ marginTop: marginTopValue, marginBottom: marginBottomValue }}>
              <h2 className='entry-title'>الطلبات</h2>
            </div>
            <Col style={{ backgroundColor: '#FFFFFF' }}></Col>
          </Row>
          <Row>
            <Col>
              <Form className='sign__form'>
                <h1 className="page-404__title" style={{ fontFamily: 'Inter' }}>401</h1>
                <p className="page-404__text">لديك خدمة قيد المراجعة بالفعل, الرجاء الإنتظار لحين الإنتهاء من مراجعتها</p>
                <Button variant="primary" type="button" style={{ fontFamily: 'Noto Kufi Arabic' }}>العودة</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container>
          <Row>
            <Col style={{ backgroundColor: '#FFFFFF' }}>
              <div style={{ marginTop: marginTopValue, marginBottom: marginBottomValue }}>
                <h2 style={{ textAlign: 'center', fontSize: '20px', color: 'white', background: 'red', padding: '15px' }}>
                  منصة يوزر لن تطلب منك بيانات الحساب خارج هذه الصفحة بشكل نهائي | ولن تطلب منك تسليم أي بيانات عبر الواتس اب او منصات أخرى
                </h2>
              </div>
              <h4>بيع خدمة</h4>
              <h6 style={{ textAlign: 'center', fontSize: '15px', color: 'white', background: '#8037ff', padding: '15px' }}>
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
                          value={formState.service_heading}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" style={{ width: '100%' }}>
                        <Form.Label>نوع الخدمة</Form.Label>
                        <Form.Select
                          name="service_type"
                          value={formState.service_type}
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
                          value={formState.service_dec}
                          onChange={handleChange}
                        />
                        <p>لا تقم بوضع أي طريقة تواصل خارج المنصة في الوصف بشكل نهائي لأنها قد تعرض حسابك للحظر!</p>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicAmount" style={{ width: '100%' }}>
                        <Form.Label>السعر (بالدولار)</Form.Label>
                        <Form.Control
                          type="text"
                          name="service_Amount"
                          value={formState.service_Amount}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicTime" style={{ width: '100%' }}>
                        <Form.Label>كم ساعة يستغرق تسليم الخدمة؟</Form.Label>
                        <Form.Control
                          type="number"
                          name="service_time_houre"
                          value={formState.service_time_houre}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicBuyAmount" style={{ width: '100%' }}>
                        <Form.Label>أقصى كمية يمكن العميل شراءها</Form.Label>
                        <Form.Control
                          type="text"
                          name="service_buy_Amount"
                          value={formState.service_buy_Amount}
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
                          <Button variant="primary" type="button" style={{ fontFamily: 'Noto Kufi Arabic', fontSize: '13px', background: 'grey' }} onClick={() => setModalShow(true)}>
                            إضافة خيارات مدفوعة
                          </Button>
                          <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                          />
                        </Col>
                        <Col>
                          <Button variant="primary" type="button" style={{ fontFamily: 'Noto Kufi Arabic', fontSize: '13px', background: '#cb910d' }} onClick={() => setModalShow1(true)}>
                            إضافة حقول بيانات
                          </Button>
                          <MyVerticallyCenteredModal1
                            show={modalShow1}
                            onHide={() => setModalShow1(false)}
                            handleAdditionalFieldsChange={handleAdditionalFieldsChange}
                          />
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
