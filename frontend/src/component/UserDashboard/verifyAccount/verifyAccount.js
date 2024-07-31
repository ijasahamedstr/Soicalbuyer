import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './verifyAccount.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function Verifyaccount() {
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
        <h2 style={{textAlign:'center',fontFamily:'Noto Kufi Arabic',marginTop:'1.5rem'}}>تفعيل الحساب</h2>
        <div class="col-12">
        <div class="sign">
        <div class="sign__content">
        <Form className='sign__form'>
        <h3 style={{marginBottom:'30px',color:'rgb(97, 100, 255)',fontSize:'23px'}}>تفعيل الحساب بالهوية يمكنك من التالي</h3>
        <div>
        <p style={{textAlign:'center',fontSize:'14px',color:'red',marginBottom:'1px'}}>فتح حد السحب</p>
        <p style={{textAlign:'center',fontSize:'14px',color:'red',marginBottom:'1px'}}>فتح حد التحويل الداخلي</p>
        <p style={{textAlign:'center',fontSize:'14px',color:'red',marginBottom:'1px'}}>عرض حسابات بقيمة 250$ وما فوق</p><br/>
        </div>
        <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>الإسم الاول</Form.Label>
            <Form.Control placeholder="الإسم الاول" className='sign__input'  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>الإسم الوسط</Form.Label>
            <Form.Control placeholder="الإسم الوسط" className='sign__input'  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>الإسم الأخير</Form.Label>
            <Form.Control placeholder="الإسم الأخير" className='sign__input'  />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>دولة إصدار الوثيقة</Form.Label>
        <Form.Select aria-label="Default select example" className='sign__input'>
        <option value="BH">مملكة البحرين</option>
        <option value="SA">المملكة العربية السعودية</option>
        <option value="AE">الإمارات العربية المتحدة</option>
        <option value="QA">قطر</option>
        <option value="OM">عمان</option>
        <option value="KW">الكويت</option>
        <option value="EG">مصر</option>
        <option value="JO">الأردن</option>
        <option value="IQ">العراق</option>
        <option value="SY">سوريا</option>
        </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>نوع الوثيقة</Form.Label>
        <Form.Select aria-label="Default select example" className='sign__input'>
        <option value="passport">جواز السفر</option>
        <option value="id">بطاقة الهوية</option>
        <option value="driving_license">رخصة القيادة</option>
        </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>رقم الوثيقة</Form.Label>
            <Form.Control placeholder="رقم وثيقة الإثبات" className='sign__input'  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>وثيقة الإثبات</Form.Label>
            <Form.Control type="file" placeholder="رقم وثيقة الإثبات" className='sign__input'  />
        </Form.Group>

        <h4 >لضمان قبول طلبك الرجاء مراجعة</h4>
        <h5 style={{color:'red'}}>إرشادات الوثيقة</h5>
        <div>
        <Form.Group className="mb-3" style={{marginTop:'15px',fontFamily:'Noto Kufi Arabic',fontSize:'13px'}}>
        <Form.Check
          required
          label="أوافق على الشروط والأحكام "
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
 
      <Form.Group className="mb-3" style={{fontFamily:'Noto Kufi Arabic',fontSize:'13px',textAlign:'left'}}>
        <Form.Check
          required
          label="انا مسؤول عن أي بيانات مدخله وأتحمل أي إجراء قانوني "
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      </div>
     
        <Button variant="primary" type="submit" style={{fontFamily:'Noto Kufi Arabic',fontSize:'13px',background:'red'}}>
        مشاهدة إرشادات الوثيقة لإرسال الطلب 
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

    <Row>
      <Col>
        <div class="col d-flex align-items-center justify-content-center">
        <div className="col-12 col-md-6 col-lg-9">
        <div class="col-12">
        <div class="col-12">
        <div class="sign">
        <div class="sign__content">
        <Form className='sign__form'>
        <div className="container mt-4">
        <div className="row justify-content-center">
            <img
                src="https://usr.dokan-cdn.com/usr-card-method.jpg"
                className="img-fluid"
                alt="Responsive"
            />
        </div>
        </div>
        <h3 style={{marginBottom:'30px',color:'red',textAlign:'center',marginTop:'15px'}}>إرشادات الوثيقة</h3>
        <p style={{textAlign:'center',fontSize:'14px',color:'red'}}>انت على وشك رفع طلب تفعيل الرجاء التأكد أن</p>
    
        <p style={{fontSize:'13px',textAlign:'center'}}>هذه هي الوثيقة الخاصة بك الصادرة من الحكومة الخاصة بك وغير منتهية الصلاحية</p>
        <p style={{fontSize:'13px',textAlign:'center'}}>هذه هي الوثيقة الحقيقية وليست صورة أو نسخة</p>
        <p style={{fontSize:'13px',textAlign:'center'}}>التأكد من وضوح الصورة وإمكانية قراءة البيانات الموجودة عليها</p>
        <p style={{fontSize:'13px',textAlign:'center'}}>التأكد من تصوير الوثيقة بالقرب من ورقة مكتوب فيها اسم المستخدم الخاص بك او بالقرب من جهاز يظهر فيه حسابك في المنصة</p>
        <p style={{fontSize:'13px',textAlign:'center'}}>إذا كنت تواجه صعوبة أو مشكلة أو لديك أي إستفسار تواصل مع <a href="https://wa.me/+966505381800">الدعم الفني</a></p>
        
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

export default Verifyaccount;