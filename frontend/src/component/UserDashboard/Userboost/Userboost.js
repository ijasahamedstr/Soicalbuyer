import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Userboost.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function Userboost() {
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
        <h2 style={{textAlign:'center',fontFamily:'Noto Kufi Arabic',marginTop:'1.5rem'}}>🚀يوزر بوست</h2>
        <div class="col-12">
        <div class="sign">
        <div class="sign__content">
        <Form className='sign__form'>
        <h3 style={{marginBottom:'30px',color:'rgb(97, 100, 255)'}}>التواصل الإجتماعي & الرئيسية</h3>
        <p style={{textAlign:'center',fontSize:'14px'}}>يمكنك جعل حساب التواصل الإجتماعي الخاص بك يظهر في الصفحة الرئيسية وأيضاً في صفحة سوق التواصل الإجتماعي في البداية بمبلغ رمزي وبسيط ويساعدك على بيع الحساب بسرعة😍🥰</p>
        
        <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>الحساب</Form.Label>
        <Form.Select aria-label="Default select example" className='sign__input'>
        <option value="">الرجاء الأختيار</option>
        </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>عدد أيام البوست</Form.Label>
            <Form.Control placeholder="عدد النقاط" className='sign__input'  />
        </Form.Group>

        <p style={{color:'#D0D3D4'}}>التكلفة <span id="boost_price" style={{color:'rgb(97, 100, 255)'}}>$0</span> لـ <span id="boost_days_count" style={{color:'rgb(97, 100, 255)'}}> أيام </span></p>

        <p style={{color:'red',fontSize:'13px'}}>السعر شامل ضريبة القيمة المضافة*</p>

        <Button variant="primary" type="submit" style={{fontFamily:'Noto Kufi Arabic'}}>
        😎تنفيذ البوست  
        </Button>
        <p style={{marginTop:'15px',textAlign:'center',fontSize:'14px'}}>يمكنك عمل بوست برصيد حسابك في المنصة فقط إذا كنت تود تعبئة الرصيد إضغط علي</p>
        </Form>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
      </Col>
    </Row>

    <Row>
      <Col>
        <div class="col d-flex align-items-center justify-content-center">
        <div className="col-12 col-md-6 col-lg-9">
        <div class="col-12">
        <div class="col-12">
        <div class="sign">
        <div class="sign__content">
        <Form className='sign__form'>
        <h3 style={{marginBottom:'30px',color:'rgb(97, 100, 255)'}}><span className='spanclass'>جديد</span>حسابات الألعاب</h3>
        <p style={{textAlign:'center',fontSize:'14px'}}>يمكنك جعل حسابك يظهر في بداية صفحة سوق الألعاب وأيضاً إظهار شعار 🚀 أسفل الحساب🥰</p>
        
        <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>الحساب</Form.Label>
        <Form.Select aria-label="Default select example" className='sign__input'>
        <option value="">الرجاء الأختيار</option>
        </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>عدد أيام البوست</Form.Label>
            <Form.Control placeholder="عدد النقاط" className='sign__input'  />
        </Form.Group>

        <p style={{color:'#D0D3D4'}}>التكلفة <span id="boost_price" style={{color:'rgb(97, 100, 255)'}}>$0</span> لـ <span id="boost_days_count" style={{color:'rgb(97, 100, 255)'}}> أيام </span></p>
        <p style={{color:'#D0D3D4',fontSize:'13px'}}>سعر التكلفة أثناء الساعة السعيدة <span style={{color:'rgb(97, 100, 255)'}} id="boost_happy_gaming_price">$0</span> لـ <span  style={{color:'rgb(97, 100, 255)'}}id="boost_happy_gaming_days_count">0 أيام</span></p>

        <p style={{color:'red',fontSize:'13px'}}>السعر شامل ضريبة القيمة المضافة*</p>

        <Button variant="primary" type="submit" style={{fontFamily:'Noto Kufi Arabic'}}>
        😎تنفيذ البوست  
        </Button>
        <p style={{marginTop:'15px',textAlign:'center',fontSize:'14px'}}>يمكنك عمل بوست برصيد حسابك في المنصة فقط إذا كنت تود تعبئة الرصيد إضغط علي</p>
        
        </Form>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
      </Col>
    </Row>

    <Row>
      <Col>
        <div class="col d-flex align-items-center justify-content-center">
        <div className="col-12 col-md-6 col-lg-9">
        <div class="col-12">
        <div class="col-12">
        <div class="sign">
        <div class="sign__content">
        <Form className='sign__form'>
        <h3 style={{marginBottom:'30px',color:'rgb(97, 100, 255)'}}> المستخدمين</h3>
        <p style={{textAlign:'center',fontSize:'14px'}}>جعل ملفك الشخصي يظهر في قائمة المستخدمين في البداية🔥🔥</p>
        
        <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>الحساب</Form.Label>
        <Form.Select aria-label="Default select example" className='sign__input'>
        <option value="">الرجاء الأختيار</option>
        </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>عدد أيام البوست</Form.Label>
            <Form.Control placeholder="عدد النقاط" className='sign__input'  />
        </Form.Group>

        <p style={{color:'#D0D3D4'}}>التكلفة <span id="boost_price" style={{color:'rgb(97, 100, 255)'}}>$0</span> لـ <span id="boost_days_count" style={{color:'rgb(97, 100, 255)'}}> أيام </span></p>
        <p style={{color:'#D0D3D4',fontSize:'13px'}}>سعر التكلفة أثناء الساعة السعيدة <span style={{color:'rgb(97, 100, 255)'}} id="boost_happy_gaming_price">$0</span> لـ <span  style={{color:'rgb(97, 100, 255)'}}id="boost_happy_gaming_days_count">0 أيام</span></p>

        <p style={{color:'red',fontSize:'13px'}}>السعر شامل ضريبة القيمة المضافة*</p>

        <Button variant="primary" type="submit" style={{fontFamily:'Noto Kufi Arabic'}}>
        😎تنفيذ البوست  
        </Button>
        <p style={{marginTop:'15px',textAlign:'center',fontSize:'14px'}}>يمكنك عمل بوست برصيد حسابك في المنصة فقط إذا كنت تود تعبئة الرصيد إضغط علي</p>
        
        </Form>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
      </Col>
    </Row>


    
    <Row>
      <Col>
        <div class="col d-flex align-items-center justify-content-center">
        <div className="col-12 col-md-6 col-lg-9">
        <div class="col-12">
        <div class="col-12">
        <div class="sign">
        <div class="sign__content">
        <Form className='sign__form'>
        <h3 style={{marginBottom:'30px',color:'rgb(97, 100, 255)'}}> الخدمات</h3>
        <p style={{textAlign:'center',fontSize:'14px'}}>يمكنك جعل خدمتك تظهر في بداية الخدمات وأيضاً إظهار كلمة (خدمة مميزة) أسفل الخدمة🥰</p>
        
        <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>الحساب</Form.Label>
        <Form.Select aria-label="Default select example" className='sign__input'>
        <option value="">الرجاء الأختيار</option>
        </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>عدد أيام البوست</Form.Label>
            <Form.Control placeholder="عدد النقاط" className='sign__input'  />
        </Form.Group>

        <p style={{color:'#D0D3D4'}}>التكلفة <span id="boost_price" style={{color:'rgb(97, 100, 255)'}}>$0</span> لـ <span id="boost_days_count" style={{color:'rgb(97, 100, 255)'}}> أيام </span></p>
        <p style={{color:'#D0D3D4',fontSize:'13px'}}>سعر التكلفة أثناء الساعة السعيدة <span style={{color:'rgb(97, 100, 255)'}} id="boost_happy_gaming_price">$0</span> لـ <span  style={{color:'rgb(97, 100, 255)'}}id="boost_happy_gaming_days_count">0 أيام</span></p>

        <p style={{color:'red',fontSize:'13px'}}>السعر شامل ضريبة القيمة المضافة*</p>

        <Button variant="primary" type="submit" style={{fontFamily:'Noto Kufi Arabic'}}>
        😎تنفيذ البوست  
        </Button>
        <p style={{marginTop:'15px',textAlign:'center',fontSize:'14px'}}>يمكنك عمل بوست برصيد حسابك في المنصة فقط إذا كنت تود تعبئة الرصيد إضغط علي</p>
        
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

export default Userboost;