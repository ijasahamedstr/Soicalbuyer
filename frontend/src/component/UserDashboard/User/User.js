import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './User.css';
import React, { useEffect, useState } from 'react';


function User({isOTPLoggedIn, OTPLoggedUserData}) {

  const [userdata, setUserdata] = useState({});
  useEffect(() => {
    if(isOTPLoggedIn){
    setUserdata(OTPLoggedUserData?.preuser)
    }
    } , [isOTPLoggedIn])

    console.log("::: user data", userdata)


  console.log("response", userdata)


const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const user = {
    name: 'ايجاس احمد',
    email: 'يا هلا والله نقدم لك انظف و أفضل يوزرات بجميع انواعه ب اسعار الجمله - فيه هدايا بكل عمليه شراء لا تنسى التقيم - ما حصلت الي يناسبك؟ تواصل معي خاص متوفر اكثر من ٥ الف يوزر 🌹❤️ - في حال واجهة مشكله او حاب اخدمك ب اي شي تواصل معي خاص هنا 👇👇👇👇👇 ',
    avatar: 'https://www.everypixel.com/preview_collections/20231129/people_of_the_world_vol.3_33', // Replace with actual avatar URL
  };
  return (
    <>
      <div className="main__author">
      <img src='https://cdn.usr.gg/img/bg/bg.png' alt="Logo of the company" style={{marginTop:'-9px'}}/>
      </div>
      <Container style={{marginTop:'60px'}} >
      <Row>
        <Col sm={4}  style={{marginTop:'60px'}} >
        <div className="user-card">
        <div className='uper-container'>
          <div className='image-card'>
            <img className="avatar" src={user.avatar} alt="User Avatar" />
          </div>
        </div>
        <div className="user-info">
        <h2>{user.name}<span class="pro-badge">برو</span></h2>
        <p>{user.email}</p>
        </div>
        <div class="author__wrap" style={{display:'inline',marginTop:'15px'}}>
        <div class="author__followers mr-2">
        <p>0</p>
        <span>عدد المبيعات</span>
        </div>
        <div class="author__followers ">
        <p>0$</p>
        <span>مجمل المبيعات</span>
        </div>
        </div>     
        </div>
        </Col>
        <Col sm={8}>
        <Container>
        <Row style={{marginTop:'30px',fontWeight:'700'}}>
            <Col>
            {/* Soical Media Card Section  */}
            <Tabs
            defaultActiveKey="التواصل الإجتماعي"
            id="fill-tab-example"
            fill
            >
            <Tab eventKey="التواصل الإجتماعي" title="التواصل الإجتماعي">
            <Container>
            {isOTPLoggedIn ? 
         
            <Row>
                <Col md={4}>
                <Card style={{backgroundColor:'#F2F3F4'}}>
                <Card.Img variant="top" src="https://usr.dokan-cdn.com/instagram.png" />
                <Card.Body>
                <Card.Title>{userdata?.displayName}</Card.Title>
                <Card.Text>
                <span><div class="card__author  card__author--verified " style={{borderRadius:'20px'}}>
                <img src="https://usr.dokan-cdn.com/public/avatars/e334bb8a73397609e060efed2fb27f96.gif"  alt="" /><a href="https://usr.gg/meshari">{userdata?.displayName}</a></div></span>
                </Card.Text>
                </Card.Body>
                <Card.Body>
                <Card.Link href="#"><div className='card__likes'><span className='card__likes1'>🚀بوست</span></div></Card.Link>
                <Card.Link href="#">
                <div class="card__price">
                <span>السعر</span>
                <span dir="rtl">
                <span class="account_price_previe">499$</span>
                </span>
                </div>
                </Card.Link>
                </Card.Body>
                </Card>
                </Col>
                <Col md={4}>
                <Card style={{backgroundColor:'#F2F3F4'}}>
                <Card.Img variant="top" src="https://usr.dokan-cdn.com/instagram.png" />
                <Card.Body>
                <Card.Title>{userdata?.displayName}</Card.Title>
                <Card.Text>
                <span><div class="card__author  card__author--verified  ">
                <img src="https://usr.dokan-cdn.com/public/avatars/e334bb8a73397609e060efed2fb27f96.gif" style={{borderRadius:'20px'}} alt="" /><a href="https://usr.gg/meshari">@Ijas Ahamed</a></div></span>
                </Card.Text>
                </Card.Body>
                <Card.Body>
                <Card.Link href="#"><div className='card__likes'><span className='card__likes1'>🚀بوست</span></div></Card.Link>
                <Card.Link href="#">
                <div class="card__price">
                <span>السعر</span>
                <span dir="rtl">
                <span class="account_price_previe">499$</span>
                </span>
                </div>
                </Card.Link>
                </Card.Body>
                </Card>
                </Col>
                <Col md={4}>
                <Card style={{backgroundColor:'#F2F3F4'}}>
                <Card.Img variant="top" src="https://usr.dokan-cdn.com/instagram.png" />
                <Card.Body>
                <Card.Title>{userdata?.displayName}</Card.Title>
                <Card.Text>
                <span><div class="card__author  card__author--verified  ">
                <img src="https://usr.dokan-cdn.com/public/avatars/e334bb8a73397609e060efed2fb27f96.gif" alt="" /><a href="https://usr.gg/meshari">@Ijas Ahamed</a></div></span>
                </Card.Text>
                </Card.Body>
                <Card.Body>
                <Card.Link href="#"><div className='card__likes'><span className='card__likes1'>🚀بوست</span></div></Card.Link>
                <Card.Link href="#">
                <div class="card__price">
                <span>السعر</span>
                <span dir="rtl">
                <span class="account_price_previe">499$</span>
                </span>
                </div>
                </Card.Link>
                </Card.Body>
                </Card>
                </Col>               
            </Row>
             : <p style={{textAlign:'center',marginTop:'30px',fontSize:'25px',color:'rgb(97, 100, 255)'}}>لايوجد منتجات</p>}           
            </Container>
            </Tab>
              {/* End Soical Media Card Section  */}


            {/* Profile Setting Card Section  */}
            <Tab eventKey="الأعدادات" title="الأعدادات">
            <Container style={{marginTop:'30px'}}>
            <Row>

              {/* Profile Personal data Setting Card Section  */}  
            <Col md={6}>
            <Card style={{background:'#fff',padding:'0px'}}>
            <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h4 class="sign__title" style={{marginBottom:'20px',color:'rgb(97, 100, 255)'}}>البيانات الشخصية</h4>
            <Row>
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>اسم المستخدم</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="أدخل اسم المستخدم"
                    className='sign__title'
                    value={userdata?.username}
                    
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label>البريد الألكتروني</Form.Label>
                <Form.Control
                    required
                    type="gmail"
                    placeholder="email@email.com"
                    value={userdata?.email}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row >
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>الأسم</Form.Label>
                <Form.Control type="text" placeholder="أدخل الأسم" required   value={userdata?.displayName}/>
                <Form.Control.Feedback type="invalid">
                    Please provide a valid city.
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom04">
                <Form.Label>رقم الهاتف</Form.Label>
                <Form.Control type="number" value={userdata?.Phone} placeholder="966571883194" required />
                <p class="mt-2" style={{fontSize:'14px'}}>إذا كنت ترغب بتحديث رقم هاتفك , يرجى منك <a href="/ChangePhoneNumber">الضغط علي</a></p>
                <Form.Control.Feedback type="invalid">
                    Please provide a valid state.
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationCustom03">
                <Form.Label>البايو</Form.Label>
                <Form.Control as="textarea" rows={3}  required/>
                <span dir="rtl" class="text-danger font-bold" style={{textAlign:'center',marginTop:'7px',fontSize:'13px'}}>لاتقم بوضع أي طريقة تواصل خارج المنصة في البايو بشكل نهائي لأنها قد تعرض حسابك للحظر!</span>
                <Form.Control.Feedback type="invalid">
                    Please provide a valid state.
                </Form.Control.Feedback>
            </Form.Group>
            </Row>
            <Button style={{marginTop:'10px'}} type="submit">حفظ</Button>
            </Form>
            </Card.Body>
            </Card>
            </Col>

            {/* End Profile Personal data Setting Card Section  */}  


            {/* Change the appearance of the account Setting Card Section  */}  
            <Col md={6}>
            <Card style={{background:'#fff',padding:'0px'}}>
            <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h4 class="sign__title" style={{marginBottom:'20px',color:'rgb(97, 100, 255)'}}>تغيير مظهر الحساب</h4>
            <Row>
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Label>افتار الحساب</Form.Label>
                <Form.Control
                    required
                    placeholder="افتار الحساب"
                    className='sign__title'
                    type="file"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} md="12" controlId="validationCustom03">
                <Form.Label>خلفية الحساب</Form.Label>
                <Form.Control type="file" placeholder="خلفية الحساب" required />
                <Form.Control.Feedback type="invalid">
                    Please provide a valid city.
                </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Button style={{background:'#6164ff',marginTop:'20px'}} type="submit">حفظ</Button>
            </Form>
            </Card.Body>
            </Card>
            </Col>
            {/* End Change the appearance of the account Setting Card Section  */}  
            
            {/* Referral link Setting Card Section  */}  
            <Col md={6}>
            <Card style={{background:'#fff',padding:'0px'}}>
            <Card.Body>
            <Form noValidate validated={validated} className='formuser' onSubmit={handleSubmit}>
            <h4 class="sign__title" style={{marginBottom:'20px',color:'rgb(97, 100, 255)'}}>رابط الإحاله</h4>
            <h5 class="sign__title" style={{marginBottom:'20px',color:'rgb(97, 100, 255)',fontSize:'15px'}}>يمكنك كسب أموال من خلال هذا الرابط!</h5>
            <Row>
                <Form.Group as={Col}  controlId="validationCustom01">
                <Form.Label>رابط الإحاله</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="أدخل اسم المستخدم"
                    className='sign__title'
                    value="https://usr.gg/register?ref=ijas704"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row >
            <Form.Group as={Col}  controlId="validationCustom03">
                <Form.Label>خلفية الحساب</Form.Label>
                <Form.Control type="text" placeholder="خلفية الحساب" required />
                <Form.Control.Feedback type="invalid">
                    Please provide a valid city.
                </Form.Control.Feedback>
                </Form.Group>
                
            </Row>
            <Row >
            <Form.Group as={Col}  controlId="validationCustom03">
                <Form.Label>كم كسبت؟</Form.Label>
                <Form.Control type="text" placeholder="خلفية الحساب" required />
                <Form.Control.Feedback type="invalid">
                    Please provide a valid city.
                </Form.Control.Feedback>
                </Form.Group>
                
            </Row>
            <Button style={{marginTop:'10px'}} type="submit">حفظ</Button>
            </Form>
            </Card.Body>
            </Card>
            </Col>
            {/* End Referral link Setting Card Section  */}  

            {/* account details Setting Card Section  */}  
            <Col md={6}>
            <Card style={{background:'#fff',padding:'0px',width:'100%'}}>
            <Card.Body>
            <h4 class="sign__title" style={{marginBottom:'20px',color:'rgb(97, 100, 255)'}}>تفاصيل الحساب</h4>
            <Row >
            <ul class="knowledge__list">
            <li>رمز الدعم الفني<span >i-106597</span></li>
            <li>عدد بوستاتي<span > 0 </span></li>
            <li>حالة التوثيق<span >غير موثق</span></li>
            <li>مستوى الحساب<span >1</span></li>
            <li>الرصيد الحالي<span >$0.00</span></li>
            <li>نوع الباقة<span >مستخدم</span></li>
            <li>تاريخ إنتهاء الباقة<span>لايوجد</span></li>
            <li>تاريخ إنشاء الحساب<span >2024-06-02 23:27PM</span></li>
            </ul>
            </Row>
            </Card.Body>
            </Card>
            </Col>
            {/*End account details Setting Card Section  */}  


            {/* other options Setting Card Section  */}  
            <Col md={6}>
            <Card style={{background:'#fff',padding:'0px',width:'100%'}}>
            <Card.Body>
            <h4 class="sign__title" style={{marginBottom:'20px',color:'rgb(97, 100, 255)'}}>خيارات اخرى</h4>
            <Row >
            <div className="col-12" style={{display:'flex',gap:'10px'}}>
            <button className="sign__btn mr-3" type="button" style={{background:'red',textAlign:'center',borderRadius:'15px',padding:'5px',fontFamily:'Noto Kufi Arabic',color:'white'}}>حذف جميع الحسابات المعروضة</button>
            <button className="sign__btn" type="button"  style={{background:'red',textAlign:'center',borderRadius:'15px',padding:'5px',fontFamily:'Noto Kufi Arabic',color:'white'}}>حذف جميع الخدمات المعروضة</button>
            </div>
            <div> <button class="sign__btn" type="button" style={{background:'red',textAlign:'center',borderRadius:'15px',padding:'5px',fontFamily:'Noto Kufi Arabic',color:'white',marginTop:'15px',width:'100%'}}>تسجيل خروج جميع الأجهزة الأخرى</button></div>
            </Row>
            </Card.Body>
            </Card>
            </Col>
            {/*End other options Setting Card Section  */} 

            </Row>
            </Container>
            </Tab>
            </Tabs>
        </Col>     
        </Row>
          {/* End Profile Setting Card Section  */}
        </Container>
        </Col>
      </Row>
    </Container>
    </>
   
  );
}

export default User;