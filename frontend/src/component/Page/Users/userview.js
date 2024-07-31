import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';

function Userview() {
      
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
        <Col sm={4}>
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
                </div>
        </Col>
        <Col sm={8}>
        <Container>
        <Row style={{marginTop:'30px',fontWeight:'700'}}>
            <Col> 
            <Tabs
            defaultActiveKey="التواصل الإجتماعي"
            id="fill-tab-example"
            fill
            >
            <Tab eventKey="التواصل الإجتماعي" title="التواصل الإجتماعي">
            <Container>
            <Row>
                <Col md={4}>
                <Card style={{backgroundColor:'#F2F3F4'}}>
                <Card.Img variant="top" src="https://usr.dokan-cdn.com/instagram.png" />
                <Card.Body>
                <Card.Title>@Ijas Ahamed</Card.Title>
                <Card.Text>
                <span><div class="card__author  card__author--verified " style={{borderRadius:'20px'}}>
                <img src="https://usr.dokan-cdn.com/public/avatars/e334bb8a73397609e060efed2fb27f96.gif"  alt="" /><a href="https://usr.gg/meshari">@Ijas Ahamed</a></div></span>
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
                <Card.Title>@Ijas Ahamed</Card.Title>
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
                <Card.Title>@Ijas Ahamed</Card.Title>
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
            </Container>
            </Tab>
            <Tab eventKey="التقييمات" title="التقييمات">
            <Container>
            <Row>
            {/* <Col md={5} style={{justifyContent:'space-around',}}>
                <div className="container d-flex justify-content-center align-items-center">
                <div className="card text-center">
                <h2 class="timer count-title count-number " style={{color:'#25a56a'}}>259</h2>
                </div>
                </div>
                </Col>
                <Col md={5}>
                <div className="container d-flex justify-content-center align-items-center ">
                <div className="card text-center">
                    <div className="card-body">
                    <h5 className="card-title">250</h5>
                    <p className="card-text">This card is centered horizontally and vertically.</p>
                    </div>
                </div>
                </div>
            </Col>    */}
            <Col md={6} style={{justifyContent:'space-around',}}>
            <Card style={{ backgroundColor:'#F2F3F4'}}>
            <Card.Body>
              <Card.Title>@Ijas Ahamed</Card.Title>
              <Card.Text>
              <span><div class="card__author  card__author--verified" style={{gap:'5px'}}>
              <img src="https://usr.dokan-cdn.com/public/avatars/e334bb8a73397609e060efed2fb27f96.gif" alt="" /><span class="good-review-badge">ممتاز</span>
              <span class="good-review-badge">مشتري</span>  </div></span>
              </Card.Text>
              <span>
              ⭐️
              ⭐️
              ⭐️
              ⭐️
              ⭐️
              </span>
            </Card.Body>
            <Card.Body style={{marginTop: '-15px'}}>
              <Card.Link href="#">
              <div class="card__price">
              <span dir="rtl">
              <span class="account_price_previe">ثلث مره اشتري منه وثقهه ياربع</span>
              </span>
              </div>
              </Card.Link>
            </Card.Body>
           </Card>
            </Col> 
            <Col md={6} style={{justifyContent:'space-around',}}>
            <Card style={{ backgroundColor:'#F2F3F4'}}>
            <Card.Body>
              <Card.Title>@Ijas Ahamed</Card.Title>
              <Card.Text>
              <span><div class="card__author  card__author--verified" style={{gap:'5px'}}>
              <img src="https://usr.dokan-cdn.com/public/avatars/e334bb8a73397609e060efed2fb27f96.gif" alt="" /><span class="good-review-badge">ممتاز</span>
              <span class="good-review-badge">مشتري</span>  </div></span>
              </Card.Text>
              <span>
              ⭐️
              ⭐️
              ⭐️
              ⭐️
              ⭐️
              </span>
            </Card.Body>
            <Card.Body style={{marginTop: '-15px'}}>
              <Card.Link href="#">
              <div class="card__price">
              <span dir="rtl">
              <span class="account_price_previe">ثلث مره اشتري منه وثقهه ياربع</span>
              </span>
              </div>
              </Card.Link>
            </Card.Body>
           </Card>
            </Col> 
            <Col md={6} style={{justifyContent:'space-around',}}>
            <Card style={{ backgroundColor:'#F2F3F4'}}>
            <Card.Body>
              <Card.Title>@Ijas Ahamed</Card.Title>
              <Card.Text>
              <span><div class="card__author  card__author--verified" style={{gap:'5px'}}>
              <img src="https://usr.dokan-cdn.com/public/avatars/e334bb8a73397609e060efed2fb27f96.gif" alt="" /><span class="good-review-badge">ممتاز</span>
              <span class="good-review-badge">مشتري</span>  </div></span>
              </Card.Text>
              <span>
              ⭐️
              ⭐️
              ⭐️
              ⭐️
              ⭐️
              </span>
            </Card.Body>
            <Card.Body style={{marginTop: '-15px'}}>
              <Card.Link href="#">
              <div class="card__price">
              <span dir="rtl">
              <span class="account_price_previe">ثلث مره اشتري منه وثقهه ياربع</span>
              </span>
              </div>
              </Card.Link>
            </Card.Body>
           </Card>
            </Col> 
            <Col md={6} style={{justifyContent:'space-around',}}>
            <Card style={{ backgroundColor:'#F2F3F4'}}>
            <Card.Body>
              <Card.Title>@Ijas Ahamed</Card.Title>
              <Card.Text>
              <span><div class="card__author  card__author--verified" style={{gap:'5px'}}>
              <img src="https://usr.dokan-cdn.com/public/avatars/e334bb8a73397609e060efed2fb27f96.gif" alt="" /><span class="good-review-badge">ممتاز</span>
              <span class="good-review-badge">مشتري</span>  </div></span>
              </Card.Text>
              <span>
              ⭐️
              ⭐️
              ⭐️
              ⭐️
              ⭐️
              </span>
            </Card.Body >
            <Card.Body style={{marginTop: '-15px'}}>
              <Card.Link href="#">
              <div class="card__price">
              <span dir="rtl">
              <span class="account_price_previe">ثلث مره اشتري منه وثقهه ياربع</span>
              </span>
              </div>
              </Card.Link>
            </Card.Body>
           </Card>
            </Col>             
            </Row>
            </Container>
            </Tab>
            </Tabs>
        </Col>
        
        </Row>
        </Container>
        </Col>
      </Row>
    </Container>
    </>
   
  );
}

export default Userview;