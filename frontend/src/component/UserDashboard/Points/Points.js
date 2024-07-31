import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Points.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function Points() {
  const  marginTopValue = '50px',marginBottomValue = '10px';
  return (
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
        <div className="col-12 col-md-6 col-lg-9">
        <div class="col-12">
        <h1 class="page-404__title"  id="xLoader">🗃</h1>
        <h2 style={{textAlign:'center',fontFamily:'Noto Kufi Arabic',marginTop:'1.5rem'}}>الصندوق</h2>
        <h3 style={{textAlign:'center',fontFamily:'Noto Kufi Arabic',marginTop:'1.5rem'}}>شاراتي</h3>
        <h4 style={{textAlign:'center',fontFamily:'Noto Kufi Arabic',marginTop:'1.5rem'}}>شاراتي</h4>
        <div class="col-12">
        <div class="sign">
        <div class="sign__content">
        <Form className='sign__form'>
        <p>تحويل النقاط</p>
        <p>لديك : 0 نقطة</p>
        <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Control placeholder="أسم المستخدم" className='sign__input' />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Control placeholder="عدد النقاط" className='sign__input'  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" rows={3} className='sign__textarea' placeholder="سبب التحويل"/>
        </Form.Group>

        <Button variant="primary" type="submit" style={{fontFamily:'Noto Kufi Arabic'}}>
        تحويل النقاط
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
  );
}

export default Points;