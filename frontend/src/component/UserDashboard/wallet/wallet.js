import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './wallet.css';
import React, { useState } from 'react';
import 'reactjs-popup/dist/index.css';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';


function MyVerticallyCenteredModal(props) {
    return (
      <Modal style={{fontSize:'13px',paddingLeft:'-10px'}}
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          سحب عبر التحويل البنكي
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign:'center'}}>
          <h4>البنوك الدولية</h4>
          <p>
          البنوك الدولية يتم التحويل لها كل يوم أحد وتفرض رسوم على كل عملية سحب 57.50 ريال فقط شاملة ضريبة القيمة المضافة , وغير مسؤولين عن إختلاف سعر صرف عملة دولتك , أدنى حد للسحب هو 500 دولار ويجب عمل طلب السحب قبل يوم الاحد ليتم تنفيذة في يوم الأحد علماً أن الطلبات التي يتم عملها بيوم الاحد تأجل للأحد القادم
          </p>
          <p style={{color:'red'}}>
          يرجى الملاحظة أن البنوك الوسيطة قد تفرض رسوم لمعالجة العملية و قد يختلف المبلغ الذي يتم استلامه في حسابك عن المبلغ الأصلي المرسل، حيث يعتمد ذلك على سعر الصرف لدى البنوك التي تقوم بتنفيذ العملية ومعالجتها من الريال السعودي إلى العملة الخاصة بدولتك
          </p>
          <h4>البنوك السعودية</h4>
          <p>تفرض على كل عملية سحب رسوم 6.15 ريال سعودي فقط شاملة ضريبة القيمة المضافة وتستغرق مدة التحويل من يوم إلى أربعة أيام عمل</p>
          <p style={{color:'red'}}>* لاندعم التحويل إلى المحافظ الرقمية كـ إس تي سي باي, يور باي, والمحافظ الرقمية المشابهة لها *</p>
          <p style={{color:'red'}}>لايوجد لديك حساب بنكي فعال , الرجاء إضافة حساب بنكي من خلال الضغط علي</p>
        </Modal.Body>
      </Modal>
    );
  }
  


  function MyVertically(props) {
    return (
      <Modal style={{fontSize:'13px',paddingLeft:'-17px'}}
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          سحب عبر بايبال
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign:'center'}}>
        <p style={{color:'red'}}>تنبيه : سعر الصرف هو 0.9590 لكل دولار واحد في محفظة المنصة ويستغرق تحويل طلب السحب من يوم إلى اربعة أيام عمل.</p>
        <div class="col d-flex align-items-center justify-content-center">
        <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Control placeholder="إيميل البايبال" className='sign__input'  />
        </Form.Group>
        </div>
        <p style={{color:'red'}}>في حال إسترجاعك للمبلغ في البايبال او إلغاءك للعملية في البايبال يجب عليك الإنتظار من 10 إلى 21 يوم لإسترجاعها في رصيدك في المنصة</p>
        <Button variant="primary" className='sign__btn' type="submit" style={{fontFamily:'Noto Kufi Arabic',marginBottom:'5px' , background:'#2f2f2f'}}>
        سحب    
        </Button>
        </Modal.Body>
      </Modal>
    );
  }
  

  function Vertically(props) {
    return (
      <Modal style={{fontSize:'13px',paddingLeft:'-17px'}}
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          سحب عبر بتكوين
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign:'center'}}>
        <p style={{color:'red'}}>تنبيه : سعر الصرف هو 0.9375 لكل دولار واحد في محفظة المنصة وتحسب رسوم 1$ شاملة ضريبة القيمة المضافة على كل طلب سحب وتستغرق عملية السحب من يوم إلى 4 أيام عمل , عند وجود ضغط عمليات كثيره ستتأثر جميع التحويلات بسبب الضغط.</p>
        <p style={{textAlign:'center',color:'#6969ff'}}> المبلغ الذي سيصلك تقريباً <span style={{color:'black'}} id="btc-amount">$0</span></p>
        <div class="col d-flex align-items-center justify-content-center">
        <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Control placeholder="ادخل عنوان محفظة البتكوين" className='sign__input'  />
        </Form.Group>
        </div>
    
        <Button variant="primary" className='sign__btn' type="submit" style={{fontFamily:'Noto Kufi Arabic',marginBottom:'5px' , background:'#2f2f2f'}}>
        سحب    
        </Button>
        </Modal.Body>
      </Modal>
    );
  }


  function Verticallynew(props) {
    return (
      <Modal style={{fontSize:'13px',paddingLeft:'-17px'}}
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          سحب عبر USDT - TRC20 / TRON
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign:'center'}}>
        <p style={{color:'red'}}>تنبيه : سعر الصرف هو 0.9375 لكل دولار واحد في محفظة المنصة وتحسب رسوم 1.98$ شاملة ضريبة القيمة المضافة على كل طلب سحب وتستغرق عملية السحب من يوم إلى 4 أيام عمل , عند وجود ضغط عمليات كثيره ستتأثر جميع التحويلات بسبب الضغط.</p>
        <p style={{textAlign:'center',color:'orange'}}>* عملة الـUSDT لها شبكات كثيرة وهذا السحب مخصص للسحب على شبكة ( ترون - TRC20 ) في حال إستخدامك لعنوان شبكة إخرى المنصة غير مسؤولة عن فقدان الأموال *<span style={{color:'black'}} id="btc-amount">$0</span></p>
        <p style={{textAlign:'center',color:'#6969ff'}}> المبلغ الذي سيصلك تقريباً <span style={{color:'black'}} id="usdt-trc20-amount">$0</span></p>
        <div class="col d-flex align-items-center justify-content-center">
        <Form.Group className="mb-3" controlId="formGridAddress2" style={{textAlign:'left'}}>
        <Form.Label>عنوان محفظة الـ USDT ( TRC20 )</Form.Label>
            <Form.Control placeholder="أدخل عنوان المحفظة" className='sign__input'  />
        </Form.Group>
        </div>
    
        <Button variant="primary" className='sign__btn' type="submit" style={{fontFamily:'Noto Kufi Arabic',marginBottom:'5px' , background:'#2f2f2f'}}>
        سحب    
        </Button>
        </Modal.Body>
      </Modal>
    );
  }


function Wallet({ isLoggedIn = true },{ isActive = false }) {
  const [modalShowone, setModalShowone] = React.useState(false);
  const [modalShowtwo, setModalShowtwo] = React.useState(false);
  const [modalShowtree, setModalShowtree] = React.useState(false);
  const [modalShow, setModalShow] = React.useState(false);

  const  marginTopValue = '50px',marginBottomValue = '10px';
  const [showButton, setShowButton] = useState(true);
  const [display, setDisplayText] = useState(

   
    <div className='feature'>
    <Card style={{border:'none',backgroundColor: `rgba(var(--bs-info-rgb), 0.1)`}}>
        <Card.Title className='feature' style={{ display: 'flex'}}><span className='feature__icon feature__icon--purple'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16">
        <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"></path>
        <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"></path>
        <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"></path>
        </svg></span><div className='eature__title'>🐪السحب العادي </div></Card.Title><br></br>
    </Card>
    </div>
  );
  
  const handleClick = () => {
    setShowButton(false); // Hide the button
    setDisplayText(
    <>
    <p style={{textAlign:'center',color:'red'}}>مدة السحب هي من يوم لـ 4 ايام عمل كحد أقصى</p>

    <Form.Group className="mb-3" controlId="formGridAddress2" style={{margin:'10px'}}>
            <Form.Control placeholder="أسم المستخدم" className='sign__input'  />
    </Form.Group>
    <Button variant="primary" className='sign__btn' onClick={() => setModalShow(true)} style={{fontFamily:'Noto Kufi Arabic',marginBottom:'5px',background:'#9e61ff'}}>
    سحب عبر التحويل البنكي
    </Button>
    <Button variant="primary" className='sign__btn' onClick={() => setModalShowone(true)} style={{fontFamily:'Noto Kufi Arabic',marginBottom:'5px',background:'#6164ff'}}>
    سحب عبر بايبال   
    </Button>
    <Button variant="primary" className='sign__btn' onClick={() => setModalShowtwo(true)} style={{fontFamily:'Noto Kufi Arabic',marginBottom:'5px' , background:'#2f2f2f'}}>
    سحب عبر بتكوين    
    </Button>
    <Button variant="primary" className='sign__btn' onClick={() => setModalShowtree(true)} style={{fontFamily:'Noto Kufi Arabic',marginBottom:'5px',background:'#6ba34a'}}>
    سحب عبر USDT (TRC20 \ Tron) 
    </Button>
    </>
    
    ); // Change the displayed text
  };
  return (
    <>


    <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
    />

    <MyVertically
        show={modalShowone}
        onHide={() => setModalShowone(false)}
    />

    <Vertically
        show={modalShowtwo}
        onHide={() => setModalShowtwo(false)}
    />

    <Verticallynew
        show={modalShowtree}
        onHide={() => setModalShowtree(false)}
    />

     <Container>
    {/* Stack the columns on mobile by making one full-width and the other half-width */}
    <Row>
    <div style={{marginTop:marginTopValue,marginBottom:marginBottomValue,fontFamily:'Changa, sans-serif'}}><h2 className='entry-title'>الطلبات</h2></div>
      <Col style={{backgroundColor:'#FFFFFF'}}>
      </Col>
    </Row>
    {isLoggedIn ?  
    <Row>
      <Col>
        <div class="col d-flex align-items-center justify-content-center">
        <div className="col-12 col-md-6 col-lg-9">
        <div class="col-12">
        <h2 style={{textAlign:'center',fontFamily:'Changa, sans-serif',marginTop:'1.5rem'}}>المحفظة</h2>
        <div class="col-12">
        <div class="sign">
        <div class="sign__content">
        <Form className='sign__form'>
        <p>سحب الرصيد</p>
        <p>المتوفر : $0.00</p>
        <p style={{color:'red',fontSize:'12px',textAlign:'center'}}>للمواصلة إلى السحب الرجاء تأكيد ملكية الحساب</p>
        <p style={{color:'red',fontSize:'12px',textAlign:'center'}}>أدخل رمز التحقق الذي سيتم إرساله لرقم الهاتف و البريد الإلكتروني المربوط</p>
        
        <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>عدد أيام البوست</Form.Label>
            <Form.Control  type="number" id="auth-code-withdraw" class="sign__input" placeholder="######" style={{textAlign:'center'}} />
        </Form.Group>

        <Button variant="primary" className='sign__btn' type="submit" style={{fontFamily:'Noto Kufi Arabic',marginBottom:'20px'}}>
        تأكيد   
        </Button>

        <Button variant="primary" type="submit" style={{fontFamily:'Noto Kufi Arabic',background:'#D5D8DC'}}>
        إرسال رمز التحقق
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
    : 
    <Row>
    <Col>
      <div class="col d-flex align-items-center justify-content-center">
      <div className="col-12 col-md-6 col-lg-9">
      <div class="col-12">
      <h2 style={{textAlign:'center',fontFamily:'Noto Kufi Arabic',marginTop:'1.5rem'}}>المحفظة</h2>
      <div class="col-12">
      <div class="sign">
      <div class="sign__content">
      <Form className='sign__form'>
      <p>سحب الرصيد</p>
      <p>المتوفر : $0.00</p>

      <div>
      <p>{display}</p>
      {showButton && <p class="feature__text">يتم التحويل خلال يوم إلى 4 أيام كحد أقصى<br/> <span onClick={handleClick} style={{color:'#6164ff'}}>إختيار</span></p>}
      </div>
      
      <p style={{color:'red',fontSize:'12px',textAlign:'center'}}>الرسوم المستقطعة من طلب السحب , لا تستفيد منصة يوزر منها بأي شكل من الاشكال جميعها تذهب إلى مزودي الخدمة*</p>
      </Form>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
    </Col>
    </Row>
    }
    
    <Row>
      <Col>
        <div class="col d-flex align-items-center justify-content-center">
        <div className="col-12 col-md-6 col-lg-9">
        <div class="col-12">
        <div class="col-12">
        <div class="sign">
        <div class="sign__content">
        <Form className='sign__form'>
        <h3 style={{marginBottom:'30px',color:'rgb(97, 100, 255)'}}>تحويل الرصيد داخل الموقع</h3>

        <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Control placeholder="أسم المستخدم" className='sign__input'  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Control placeholder="المبلغ" className='sign__input'  />
        </Form.Group>

        <Form.Group className="mb-31" controlId="validationCustom03">
        <Form.Control as="textarea" rows={3} placeholder="سبب التحويل" required/>
        </Form.Group>

        <p style={{fontSize:'13px'}}>ستصل للمستلم $<span style={{color:'#009ece'}} id="recieved_amount">0</span></p>

        <Button variant="primary" className='sign__btn' type="submit" style={{fontFamily:'Noto Kufi Arabic'}}>
        تحويل الرصيد
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

    {isActive ? 
    
    <Row>
    <Col>
      <div class="col d-flex align-items-center justify-content-center">
      <div className="col-12 col-md-6 col-lg-9">
      <div class="col-12">
      <div class="col-12">
      <div class="sign">
      <div class="sign__content">
      <Form className='sign__form'>
      <p>IJAS</p>
      </Form>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
    </Col>
  </Row>

    
    : 
    
    <Row>
    <Col>
      <div class="col d-flex align-items-center justify-content-center">
      <div className="col-12 col-md-6 col-lg-9">
      <div class="col-12">
      <div class="col-12">
      <div class="sign">
      <div class="sign__content">
      <Form className='sign__form'>
      <p style={{textAlign:'center',fontSize:'20px'}}>يجب عليك<br/>تفعيل الحساب بهوية<br/>لإضافة حساب بنكي<br/>
      <span style={{color:'#6164ff'}}>اضغط علي لتفعيل الحساب بهوية</span></p>
      </Form>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
    </Col>
  </Row>

    
    
    
    }

   

    
    <Row>
      <Col>
        <div class="col d-flex align-items-center justify-content-center">
        <div className="col-12 col-md-6 col-lg-9">
        <div class="col-12">
        <div class="col-12">
        <div class="sign">
        <div class="sign__content">
        <Form className='sign__form'>
        <h3 style={{marginBottom:'30px',color:'rgb(97, 100, 255)'}}> تعبئة الرصيد</h3>
        <p style={{textAlign:'center',fontSize:'14px',color:'red'}}>الرصيد الأدنى للتعبئة هو 10 دولار</p>
        


        <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Control placeholder="المبلغ" className='sign__input'  />
        </Form.Group>

        <Button variant="primary" className='sign__btn' type="submit" style={{fontFamily:'Noto Kufi Arabic'}}>
        تعبئة الرصيد 
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
    </>
  );
}

export default Wallet;