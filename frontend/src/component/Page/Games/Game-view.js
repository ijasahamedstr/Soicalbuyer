import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';


function MyVerticallyCentered(props) {
  return (
    <Modal style={{fontSize:'13px',paddingLeft:'-10px'}}
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" style={{fontFamily:'Noto Kufi Arabic',fontSize:'18px'}}>
        يجب إن يكون لديك حساب
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{textAlign:'center'}}>
      <Nav.Link href="/طلبات المستخدمين"><div className='google'><button style={{ borderRadius: '40px',background:'#292940',color:'white'}} className='button'  type="submit">تسجيل الدخول</button></div></Nav.Link>
      <Nav.Link href="/تسجيل حساب جديد"><div className='google'><button style={{ borderRadius: '40px',background:'#6164ff',color:'white'}} className='button'  type="submit">تسجيل حساب جديد</button></div></Nav.Link>
      <div className='google'><button style={{ borderRadius: '40px',background:'#D5D8DC'}} className='button'  type="submit"><i className="fab fa-google" style={{color:'rgb(97, 100, 255)'}}></i> تسجيل الدخول عبر جوجل</button></div>                 
      </Modal.Body>
    </Modal>
  );
}


function MyVertical(props) {
  return (
    <Modal style={{fontSize:'13px',paddingLeft:'-17px'}}
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        تعليمات البائع
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{textAlign:'center'}}>
        <p style={{textAlign:'left',color:'red'}}>يوزر فخم وخالي من كل مشاكل ان واجهتك مشكله كلمني في شات منصة ولاتنسه تقييم بعد 12ساعة لاهنت ❤️</p>
        <p style={{textAlign:'left'}}>إختيار طريقة الدفع</p>
        <div className='google'><button style={{ borderRadius: '40px',background:'#883ea7',color:'white'}} className='button'  type="submit">فيزا - ماستر كارد - مدى - ابل باي  - استي سي باي </button></div>
        <div className='google'><button style={{ borderRadius: '40px',background:'#73a73e',color:'white'}} className='button'  type="submit">العملات الرقمية</button></div>
      </Modal.Body>
    </Modal>
  );
}




function Gameview({isLoggedIn = false}) {
  const [modalShow1, setModalShow1] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const  marginTopValue = '50px',marginBottomValue = '10px';
  return (
    <>
    <MyVerticallyCentered
    show={modalShow1}
    onHide={() => setModalShow1(false)}
    />

<MyVertical
    show={modalShow2}
    onHide={() => setModalShow2(false)}
    />
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
        <div class="col-12">
        <div class="sign">
        <div class="sign__content">
        <Form className='sign__form' style={{maxWidth:'600px'}}>
        <h3 style={{marginBottom:'30px',color:'rgb(97, 100, 255)'}}>حساب فورت ايكونيك + سيزون 3 كامل🔥</h3>
        <p style={{textAlign:'center',fontSize:'14px'}}>حساب فورت يحتوي على ايكونيك و طور الزومبي ورويال بومبر نص سيزون 2 + سيزون 3 كامل
        يحتوي 81 سكن .
        يربط سوني ويربط في جميع المنصات✅️ .
        ( أساسي ايميل يتغير ).
        خامل من +240يوم .
        نوع ايميل الحساب هوتميل.
        .</p>
    
        <ul className="asset__authors" style={{justifyContent:'center'}}>
        <li>
        <span>البائع</span>
        <div className="asset__author" style={{justifyContent:'center'}}>
        <img src="https://usr.dokan-cdn.com/public/avatars/51bd4f061c48feac5d6054f551f03b48.jpg" alt=""/>
        <a href="https://usr.gg/madmon">@madmon</a>
        </div>
        </li>
        <li style={{paddingTop:'13px'}}>
        <span>اللعبة</span>
        <div className="asset__author ">
        <a href="https://usr.gg/gaming?game=2" >Fortnite</a>
        </div>
        </li>
        <li style={{paddingTop:'13px'}}>
        <span>المنصة</span>
        <div className="asset__author ">
        <a href="https://usr.gg/gaming?platform=1">PSN</a>
        </div>
        </li>
        </ul>
        {isLoggedIn ? 
            <button  onClick={() => setModalShow1(true)}  class="asset__btn asset__btn--clr open-modal"><span id="PriceQuotation"> ($120.00) </span> شراء </button>
        :  <button  onClick={() => setModalShow2(true)} class="asset__btn asset__btn--clr open-modal"><span id="PriceQuotation"> ($120.00) </span> شراء </button>  }
        <div class="a2a_kit a2a_kit_size_32 a2a_default_style mt-3" style={{lineHeight:'32px'}}>
        <a class="a2a_button_whatsapp" target="_blank" rel="nofollow noopener" href="/#whatsapp"><span style={{background:'rgb(97, 100, 255)'}} class="a2a_svg a2a_s__default a2a_s_whatsapp" ><svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#FFF" fill-rule="evenodd" d="M16.21 4.41C9.973 4.41 4.917 9.465 4.917 15.7c0 2.134.592 4.13 1.62 5.832L4.5 27.59l6.25-2.002a11.24 11.24 0 0 0 5.46 1.404c6.234 0 11.29-5.055 11.29-11.29 0-6.237-5.056-11.292-11.29-11.292m0 20.69c-1.91 0-3.69-.57-5.173-1.553l-3.61 1.156 1.173-3.49a9.35 9.35 0 0 1-1.79-5.512c0-5.18 4.217-9.4 9.4-9.4s9.397 4.22 9.397 9.4c0 5.188-4.214 9.4-9.398 9.4zm5.293-6.832c-.284-.155-1.673-.906-1.934-1.012-.265-.106-.455-.16-.658.12s-.78.91-.954 1.096c-.176.186-.345.203-.628.048-.282-.154-1.2-.494-2.264-1.517-.83-.795-1.373-1.76-1.53-2.055s0-.445.15-.584c.134-.124.3-.326.45-.488.15-.163.203-.28.306-.47.104-.19.06-.36-.005-.506-.066-.147-.59-1.587-.81-2.173-.218-.586-.46-.498-.63-.505-.168-.007-.358-.038-.55-.045-.19-.007-.51.054-.78.332-.277.274-1.05.943-1.1 2.362-.055 1.418.926 2.826 1.064 3.023.137.2 1.874 3.272 4.76 4.537 2.888 1.264 2.9.878 3.43.85.53-.027 1.734-.633 2-1.297s.287-1.24.22-1.363c-.07-.123-.26-.203-.54-.357z" clip-rule="evenodd"></path></svg></span><span class="a2a_label"></span></a>
        <a class="a2a_button_twitter" target="_blank" rel="nofollow noopener" href="/#twitter"><span style={{background:'rgb(97, 100, 255)'}} class="a2a_svg a2a_s__default a2a_s_twitter" ><svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#FFF" d="M28 8.557a10 10 0 0 1-2.828.775 4.93 4.93 0 0 0 2.166-2.725 9.7 9.7 0 0 1-3.13 1.194 4.92 4.92 0 0 0-3.593-1.55 4.924 4.924 0 0 0-4.794 6.049c-4.09-.21-7.72-2.17-10.15-5.15a4.94 4.94 0 0 0-.665 2.477c0 1.71.87 3.214 2.19 4.1a5 5 0 0 1-2.23-.616v.06c0 2.39 1.7 4.38 3.952 4.83-.414.115-.85.174-1.297.174q-.476-.001-.928-.086a4.935 4.935 0 0 0 4.6 3.42 9.9 9.9 0 0 1-6.114 2.107q-.597 0-1.175-.068a13.95 13.95 0 0 0 7.55 2.213c9.056 0 14.01-7.507 14.01-14.013q0-.32-.015-.637c.96-.695 1.795-1.56 2.455-2.55z"></path></svg></span><span class="a2a_label"></span></a>
        <a class="a2a_button_telegram" target="_blank" rel="nofollow noopener" href="/#telegram"><span style={{background:'rgb(97, 100, 255)'}} class="a2a_svg a2a_s__default a2a_s_telegram" ><svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#FFF" d="M25.515 6.896 6.027 14.41c-1.33.534-1.322 1.276-.243 1.606l5 1.56 1.72 5.66c.226.625.115.873.77.873.506 0 .73-.235 1.012-.51l2.43-2.363 5.056 3.734c.93.514 1.602.25 1.834-.863l3.32-15.638c.338-1.363-.52-1.98-1.41-1.577z"></path></svg></span><span class="a2a_label"></span></a>
        <a class="a2a_button_copy_link" target="_blank" rel="nofollow noopener" href="/#copy_link"><span style={{background:'rgb(97, 100, 255)'}} class="a2a_svg a2a_s__default a2a_s_link" ><svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#fff" d="M7.591 21.177q0-.54.377-.917l2.804-2.804a1.24 1.24 0 0 1 .913-.378q.565 0 .97.43-.038.041-.255.25-.215.21-.29.29a3 3 0 0 0-.2.256 1.1 1.1 0 0 0-.177.344 1.4 1.4 0 0 0-.046.37q0 .54.377.918a1.25 1.25 0 0 0 .918.377q.19.001.373-.047.189-.056.345-.175.135-.09.256-.2.15-.14.29-.29c.14-.142.223-.23.25-.254q.445.42.445.984 0 .539-.377.916l-2.778 2.79a1.24 1.24 0 0 1-.917.364q-.54-.001-.917-.35l-1.982-1.97a1.22 1.22 0 0 1-.378-.9zm9.477-9.504q0-.54.377-.917l2.777-2.79a1.24 1.24 0 0 1 .913-.378q.525-.001.917.364l1.984 1.968q.38.378.38.903 0 .54-.38.917l-2.802 2.804a1.24 1.24 0 0 1-.916.364q-.565 0-.97-.418.038-.04.255-.25a8 8 0 0 0 .29-.29q.108-.12.2-.255.121-.156.176-.344.048-.181.047-.37 0-.538-.377-.914a1.25 1.25 0 0 0-.917-.377q-.205 0-.37.046-.172.046-.346.175a4 4 0 0 0-.256.2q-.08.076-.29.29l-.25.258q-.441-.417-.442-.983zM5.003 21.177q0 1.617 1.146 2.736l1.982 1.968c.745.75 1.658 1.12 2.736 1.12q1.63 0 2.75-1.143l2.777-2.79c.75-.747 1.12-1.66 1.12-2.737q.002-1.66-1.183-2.818l1.186-1.185q1.16 1.185 2.805 1.186 1.617 0 2.75-1.13l2.803-2.81q1.127-1.132 1.128-2.748 0-1.62-1.146-2.738L23.875 6.12Q22.758 4.999 21.139 5q-1.63 0-2.75 1.146l-2.777 2.79c-.75.747-1.12 1.66-1.12 2.737q-.002 1.658 1.183 2.817l-1.186 1.186q-1.16-1.186-2.805-1.186-1.617 0-2.75 1.132L6.13 18.426Q5 19.559 5 21.176z"></path></svg></span><span class="a2a_label"> </span></a>
        <a class="a2a_dd" href="https://www.addtoany.com/share#url=https%3A%2F%2Fusr.gg%2Fgaming%2F7960&amp;title=%D9%85%D9%86%D8%B5%D8%A9%20%D9%8A%D9%88%D8%B2%D8%B1%20%E2%80%93%20%D8%AD%D8%B3%D8%A7%D8%A8%20%D9%81%D9%88%D8%B1%D8%AA%20%D8%A7%D9%8A%D9%83%D9%88%D9%86%D9%8A%D9%83%20%2B%20%D8%B3%D9%8A%D8%B2%D9%88%D9%86%203%20%D9%83%D8%A7%D9%85%D9%84%F0%9F%94%A5"><span style={{background:'rgb(97, 100, 255)'}} class="a2a_svg a2a_s__default a2a_s_a2a" ><svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g fill="#FFF"><path d="M14 7h4v18h-4z"></path><path d="M7 14h18v4H7z"></path></g></svg></span><span class="a2a_label a2a_localize" data-a2a-localize="inner,Share"></span></a>
        <p style={{textAlign:'center'}}>مشاركة</p>
        <div></div></div>
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

export default Gameview;