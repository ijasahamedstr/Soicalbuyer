import React from 'react'; 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';


function Sellservice() {
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    const fetchUserData = () => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      setUserdata(userDetails || {}); // Fallback to empty object
    };

    fetchUserData();
    const intervalId = setInterval(fetchUserData, 300000); // 5 minutes interval

    return () => clearInterval(intervalId);
  }, []);

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
          <Col  style={{ backgroundColor: '#FFFFFF' }}>
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
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>عنوان الخدمة</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>نوع الخدمة </Form.Label>
                      <Form.Select>
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

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Label>وصف الحساب</Form.Label>
                      <Form.Control as="textarea" rows={3} />
                     <p>لاتقم بوضع أي طريقة تواصل خارج المنصة في الوصف بشكل نهائي لأنها قد تعرض حسابك للحظر!</p>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>السعر (بالدولار)</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>كم ساعة يستغرق تسليم الخدمة؟</Form.Label>
                      <Form.Control type="number" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>أقصى كمية يمكن العميل شراءها </Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>

                    <p style={{ textAlign: 'center' }}>المبلغ الذي سيتم إيداعه في حسابك في المنصة بعد البيع: 100</p>

                    <Row>
                      <Col> <Button variant="primary" type="submit" style={{ fontFamily: 'Noto Kufi Arabic', fontSize: '13px',background:'#6164ff' }}>
                      عرض الخدمة
                    </Button>
                    </Col>
                      <Col> <Button variant="primary" type="submit" style={{ fontFamily: 'Noto Kufi Arabic', fontSize: '13px',background:'grey' }}>
                      إضافة خيارات مدفوعة
                    </Button>
                    </Col>
                      <Col> <Button variant="primary" type="submit" style={{ fontFamily: 'Noto Kufi Arabic', fontSize: '13px',background:'#cb910d' }}>
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
