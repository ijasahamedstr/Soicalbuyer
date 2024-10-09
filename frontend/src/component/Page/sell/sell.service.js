
import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function MyVerticallyCenteredModal({ show, onHide, handleFieldsChange }) {
  const [fields1, setFields1] = useState([]);

  // Handle adding a new field1
  const handleAddField1 = () => {
    setFields1([...fields1, { id: Date.now(), title: '', fields: [] }]);
  };

  // Handle removing a field1 by id
  const handleRemoveField1 = (id) => {
    setFields1(fields1.filter(field1 => field1.id !== id));
  };

  // Handle field1 value change
  const handleChangeField1 = (id, e) => {
    const { name, value } = e.target;
    setFields1(fields1.map(field1 =>
      field1.id === id ? { ...field1, [name]: value } : field1
    ));
  };

  // Handle adding a new field to a specific field1
  const handleAddField = (sectionId) => {
    setFields1(fields1.map(field1 =>
      field1.id === sectionId ? { ...field1, fields: [...field1.fields, { id: Date.now(), title: '', amount: '' }] } : field1
    ));
  };

  // Handle removing a field by id from a specific field1
  const handleRemoveField = (sectionId, fieldId) => {
    setFields1(fields1.map(field1 =>
      field1.id === sectionId ? { ...field1, fields: field1.fields.filter(field => field.id !== fieldId) } : field1
    ));
  };

  // Handle field value change within a specific field1
  const handleChangeField = (sectionId, fieldId, e) => {
    const { name, value } = e.target;
    setFields1(fields1.map(field1 =>
      field1.id === sectionId ? {
        ...field1,
        fields: field1.fields.map(field =>
          field.id === fieldId ? { ...field, [name]: value } : field
        )
      } : field1
    ));
  };

  // Handle save button click
  const handleSave = () => {
    handleFieldsChange(fields1);
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Extra Fields
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container style={{ width: '50%' }}>
          {fields1.length > 0 ? fields1.map(field1 => (
            <div key={field1.id}>
              <Form.Group className="mb-3">
                <Form.Label>Section Title</Form.Label>
                <Form.Control
                  name='title'
                  value={field1.title}
                  onChange={(e) => handleChangeField1(field1.id, e)}
                />
              </Form.Group>

              {field1.fields.length > 0 ? field1.fields.map(field => (
                <div key={field.id}>
                  <Form.Group className="mb-3">
                    <Form.Label>Field Title</Form.Label>
                    <Form.Control
                      name='title'
                      value={field.title}
                      onChange={(e) => handleChangeField(field1.id, field.id, e)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Amount (USD)</Form.Label>
                    <Form.Control
                      type='number'
                      name="amount"
                      value={field.amount}
                      onChange={(e) => handleChangeField(field1.id, field.id, e)}
                    />
                  </Form.Group>
                  <Button
                    variant="danger"
                    type="button"
                    className="w-100 mb-2"
                    onClick={() => handleRemoveField(field1.id, field.id)}
                  >
                    Remove Field
                  </Button>
                  <hr />
                </div>
              )) : <p>No fields added.</p>}

              <Button
                variant="success"
                type="button"
                className="w-100"
                onClick={() => handleAddField(field1.id)}
                style={{ background: '#bb3e18' }}
              >
                Add Field
              </Button>

              <Button
                variant="danger"
                type="button"
                className="w-100 mt-2"
                onClick={() => handleRemoveField1(field1.id)}
              >
                Remove This Section
              </Button>
              <hr />
            </div>
          )) : <p>No sections added.</p>}

          <Button
            variant="primary"
            style={{ width: '100%', border: 'none' }}
            onClick={handleAddField1}
          >
            Add Section
          </Button>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

MyVerticallyCenteredModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  handleFieldsChange: PropTypes.func.isRequired,
};



function MyVerticallyCenteredModal1({ show, onHide, handleAdditionalFieldsChange1 }) {
  const [isAdditionalFieldsVisible, setIsAdditionalFieldsVisible] = useState(false);
  const [additionalFields, setAdditionalFields] = useState([]);

  const handleAddField = () => {
    setAdditionalFields(prev => [...prev, { id: Date.now(), title: '', documentType: '' }]);
  };

  const handleRemoveField = (id) => {
    setAdditionalFields(prev => prev.filter(field => field.id !== id));
  };

  const handleChangeField = (id, e) => {
    const { name, value } = e.target;
    setAdditionalFields(prev => prev.map(field => field.id === id ? { ...field, [name]: value } : field));
  };

  const handleToggleAdditionalFields = () => {
    setIsAdditionalFieldsVisible(prev => !prev);
  };

  const handleSave1 = () => {
    handleAdditionalFieldsChange1(additionalFields);
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
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
                      <Form.Group className="mb-3" style={{ width: '100%' }}>
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
        <Button variant="secondary" onClick={onHide}>إغلاق</Button>
        <Button variant="primary" onClick={handleSave1}>حفظ</Button>
      </Modal.Footer>
    </Modal>
  );
}

MyVerticallyCenteredModal1.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  handleAdditionalFieldsChange1: PropTypes.func.isRequired,
};


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
    additionalFields: [],
    additionalFields1: [] 
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

  const handleAdditionalFieldsChange1 = (fields) => {
    setFormState(prevState => ({
      ...prevState,
      additionalFields1: fields
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_HOST}/service`, {
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
        setFormState({
          service_heading: '',
          service_type: '',
          service_dec: '',
          service_Amount: '',
          service_time_houre: '',
          service_buy_Amount: '',
          service_Staus: 'Pending',
          additionalFields: [],
          additionalFields1: [] 
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
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/service`);
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
                            handleFieldsChange={handleAdditionalFieldsChange}
                          />
                        </Col>
                        <Col>
                          <Button variant="primary" type="button" style={{ fontFamily: 'Noto Kufi Arabic', fontSize: '13px', background: '#cb910d' }} onClick={() => setModalShow1(true)}>
                            إضافة حقول بيانات
                          </Button>
                          <MyVerticallyCenteredModal1
                            show={modalShow1}
                            onHide={() => setModalShow1(false)}
                            handleAdditionalFieldsChange1={handleAdditionalFieldsChange1}
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
