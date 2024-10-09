import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function ServiceEdit() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_HOST}/service/${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setItem(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userdbtoken = localStorage.getItem('userdbtoken'); // Ensure 'userdbtoken' is the correct key
   

      const response = await fetch(`${process.env.REACT_APP_API_HOST}/service/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userdbtoken}` // Ensure this is the correct format
      },
        body: JSON.stringify(item),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      // Handle successful submission (e.g., show a success message)
      Swal.fire({
        icon: 'success',
        title: 'تم تحديث الحساب!',
        text: 'تم حفظ التعديلات بنجاح.',
        confirmButtonColor: '#6164ff'
      });
      navigate("/الألعاب");
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'حدث خطأ!',
        text: error.message,
        confirmButtonColor: '#6164ff'
      });
    }
  };


  const handleDelete = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_HOST}/service/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Network response was not ok');

      Swal.fire(
        'تم الحذف!',
        'تم حذف الحساب بنجاح.',
        'success'
      );
      navigate("/الألعاب");
      // Handle successful deletion (e.g., redirect or show a success message)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'حدث خطأ!',
        text: error.message,
        confirmButtonColor: '#6164ff'
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
      <Row>
        <Col style={{ backgroundColor: '#FFFFFF' }}>
          <div className="col d-flex align-items-center justify-content-center">
            <div className="col-12">
              <div className="sign">
                <Form className='sign__form' onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: 'auto' }}>
                  <h3 style={{ marginBottom: '30px', color: 'rgb(97, 100, 255)', fontSize: '23px', textAlign: 'center' }}>
                    {item.service_heading}
                  </h3>

                  <p style={{background:'#8037ff', color:'white'}}>
                  جديد : هذه الميزة متاحة للمستخدمين العاديين برسوم ١٠٪ , ولمستخدمي باقة لايت برسوم ٥٪ , ولمستخدمي باقة برو برسوم ٣٪</p>
                  
                  <Form.Group className="mb-3" controlId="formGridGameTitle" style={{width:'100%'}}>
                    <Form.Label>عنوان الخدمة</Form.Label>
                    <Form.Control
                      className='sign__input'
                      name="service_heading"
                      placeholder="أدخل عنوانك هنا"
                      value={item?.
                        service_heading || ''}
                      onChange={(e) => setItem(prevItem => ({
                        ...prevItem,
                        service_heading: e.target.value
                      }))}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridDocumentCountry" style={{width:'100%'}}>
                    <Form.Label>دولة إصدار الوثيقة</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      className='sign__input'
                      name="service_type"
                      value={item?.service_type || ''}
                      onChange={(e) => setItem(prevItem => ({
                        ...prevItem,
                        service_type: e.target.value
                      }))}
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

                  <Form.Group className="mb-3" controlId="formGridDocumentNumber" style={{width:'100%'}}>
                    <Form.Label>رقم الوثيقة</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      className='sign__input'
                      name="service_dec"
                      placeholder="أدخل رقم الوثيقة هنا"
                      value={item?.service_dec || ''}
                      onChange={(e) => setItem(prevItem => ({
                        ...prevItem,
                        service_dec: e.target.value
                      }))}
                    />
                  </Form.Group>

                  
                  <Form.Group className="mb-3" controlId="formGridGameTitle" style={{width:'100%'}}>
                    <Form.Label>عنوان الخدمة</Form.Label>
                    <Form.Control
                      className='sign__input'
                      name="service_Amount"
                      type='number'
                      placeholder="أدخل عنوانك هنا"
                      value={item?.service_Amount|| ''}
                      onChange={(e) => setItem(prevItem => ({
                        ...prevItem,
                        service_Amount: e.target.value
                      }))}
                    />
                  </Form.Group>

                  
                  <Form.Group className="mb-3" controlId="formGridGameTitle" style={{width:'100%'}}>
                    <Form.Label>عنوان الخدمة</Form.Label>
                    <Form.Control
                      className='sign__input'
                      name="service_time_houre"
                      type='number'
                      placeholder="أدخل عنوانك هنا"
                      value={item?.
                        service_time_houre || ''}
                      onChange={(e) => setItem(prevItem => ({
                        ...prevItem,
                        service_time_houre: e.target.value
                      }))}
                    />
                  </Form.Group>

                  
                  <Form.Group className="mb-3" controlId="formGridGameTitle" style={{width:'100%'}}>
                    <Form.Label>عنوان الخدمة</Form.Label>
                    <Form.Control
                      className='sign__input'
                      name="service_buy_Amount"
                      type='number'
                      placeholder="أدخل عنوانك هنا"
                      value={item?.
                        service_buy_Amount|| ''}
                      onChange={(e) => setItem(prevItem => ({
                        ...prevItem,
                        service_buy_Amount: e.target.value
                      }))}
                    />
                  </Form.Group>

                  <Row>
                    <Col xs={12} sm={6} md={3}>
                    <div className="p-3 mb-2 bg-light text-dark">
                        <button className="asset__btn asset__btn--clr open-modal">
                        تحديث الخدمة
                        </button>
                    </div>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                    <div className="p-3 mb-2 bg-light text-dark">
                        <button className="asset__btn asset__btn--clr open-modal">
                        تعديل
                        </button>
                    </div>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                    <div className="p-3 mb-2 bg-light text-dark">
                        <button className="asset__btn asset__btn--clr open-modal">
                        تعديل
                        </button>
                    </div>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                    <div className="p-3 mb-2 bg-light text-dark">
                        <button className="asset__btn asset__btn--clr open-modal">
                        تعديل
                        </button>
                    </div>
                    </Col>
                </Row>

                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ServiceEdit;
