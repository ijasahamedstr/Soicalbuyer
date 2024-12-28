import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';

// Modal Components
const MyVerticallyCentered = (props) => (
  <Modal
    {...props}
    size="sm"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    style={{ fontSize: '13px', paddingLeft: '-10px' }}
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter" style={{ fontFamily: 'Noto Kufi Arabic', fontSize: '18px' }}>
        يجب إن يكون لديك حساب
      </Modal.Title>
    </Modal.Header>
    <Modal.Body style={{ textAlign: 'center' }}>
      <Nav.Link href="/طلبات المستخدمين">
        <button className="btn btn-dark rounded-pill" type="button">تسجيل الدخول</button>
      </Nav.Link>
      <Nav.Link href="/تسجيل حساب جديد">
        <button className="btn btn-primary rounded-pill" type="button">تسجيل حساب جديد</button>
      </Nav.Link>
      <button className="btn btn-light rounded-pill" type="button">
        <i className="fab fa-google" style={{ color: 'rgb(97, 100, 255)' }}></i> تسجيل الدخول عبر جوجل
      </button>
    </Modal.Body>
  </Modal>
);

const MyVertical = (props) => (
  <Modal
    {...props}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    style={{ fontSize: '13px', paddingLeft: '-17px' }}
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">تعليمات البائع</Modal.Title>
    </Modal.Header>
    <Modal.Body style={{ textAlign: 'center' }}>
      <p style={{ textAlign: 'left', color: 'red' }}>
        يوزر فخم وخالي من كل مشاكل ان واجهتك مشكله كلمني في شات منصة ولاتنسه تقييم بعد 12ساعة لاهنت ❤️
      </p>
      <p style={{ textAlign: 'left' }}>إختيار طريقة الدفع</p>
      <button className="btn btn-purple rounded-pill" type="button">فيزا - ماستر كارد - مدى - ابل باي  - استي سي باي</button>
      <button className="btn btn-success rounded-pill" type="button">العملات الرقمية</button>
    </Modal.Body>
  </Modal>
);

function Gameview({ isLoggedIn = false, item = {} }) {
  const [modalShow1, setModalShow1] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  const marginTopValue = '50px';
  const marginBottomValue = '10px';

  return (
    <>
      <MyVerticallyCentered show={modalShow1} onHide={() => setModalShow1(false)} />
      <MyVertical show={modalShow2} onHide={() => setModalShow2(false)} />
      <Container>
        <Row>
          <div style={{ marginTop: marginTopValue, marginBottom: marginBottomValue }}>
            <h2 className="entry-title">الطلبات</h2>
          </div>
          <Col style={{ backgroundColor: '#FFFFFF' }}></Col>
        </Row>
        <Row>
          <Col>
            <div className="d-flex align-items-center justify-content-center">
              <div>
                <Form className="sign__form" style={{ maxWidth: '600px' }}>
                  <h3 style={{ marginBottom: '30px', color: 'rgb(97, 100, 255)' }}>
                  {item.gameid}
                  </h3>
                  <p style={{ textAlign: 'center', fontSize: '14px' }}>
                  {item.gamedec}
                  </p>
                  <ul className="asset__authors" style={{ justifyContent: 'center' }}>
                    <li>
                      <span>البائع</span>
                      <div className="asset__author" style={{ justifyContent: 'center' }}>
                        <img src="https://usr.dokan-cdn.com/public/avatars/51bd4f061c48feac5d6054f551f03b48.jpg" alt=""/>
                        <a href="https://usr.gg/madmon">@madmon</a>
                      </div>
                    </li>
                    <li style={{ paddingTop: '13px' }}>
                      <span>اللعبة</span>
                      <div className="asset__author">
                        <a href="https://usr.gg/gaming?game=2">{item.gamename}</a>
                      </div>
                    </li>
                    <li style={{ paddingTop: '13px' }}>
                      <span>المنصة</span>
                      <div className="asset__author">
                        <a href="https://usr.gg/gaming?platform=1">{item.gametype}</a>
                      </div>
                    </li>
                  </ul>
                  {isLoggedIn ? (
                    <button
                      onClick={() => setModalShow1(true)}
                      className="btn btn-primary asset__btn asset__btn--clr open-modal"
                    >
                      <span id="PriceQuotation"> (${item.social_amount}) </span> شراء
                    </button>
                  ) : (
                    <button
                      onClick={() => setModalShow2(true)}
                      className="btn btn-primary asset__btn asset__btn--clr open-modal"
                    >
                      <span id="PriceQuotation"> (${item.social_amount}) </span> شراء
                    </button>
                  )}
                  <div className="a2a_kit a2a_kit_size_32 a2a_default_style mt-3" style={{ lineHeight: '32px' }}>
                    {/* Social Share Buttons */}
                    <a className="a2a_button_whatsapp" target="_blank" rel="nofollow noopener" href="/#whatsapp">
                      <span className="a2a_svg a2a_s__default a2a_s_whatsapp" style={{ background: 'rgb(97, 100, 255)' }}>
                        {/* WhatsApp SVG */}
                      </span>
                      <span className="a2a_label"></span>
                    </a>
                    <a className="a2a_button_twitter" target="_blank" rel="nofollow noopener" href="/#twitter">
                      <span className="a2a_svg a2a_s__default a2a_s_twitter" style={{ background: 'rgb(97, 100, 255)' }}>
                        {/* Twitter SVG */}
                      </span>
                      <span className="a2a_label"></span>
                    </a>
                    <a className="a2a_button_telegram" target="_blank" rel="nofollow noopener" href="/#telegram">
                      <span className="a2a_svg a2a_s__default a2a_s_telegram" style={{ background: 'rgb(97, 100, 255)' }}>
                        {/* Telegram SVG */}
                      </span>
                      <span className="a2a_label"></span>
                    </a>
                    <a className="a2a_button_copy_link" target="_blank" rel="nofollow noopener" href="/#copy_link">
                      <span className="a2a_svg a2a_s__default a2a_s_link" style={{ background: 'rgb(97, 100, 255)' }}>
                        {/* Copy Link SVG */}
                      </span>
                      <span className="a2a_label"></span>
                    </a>
                    <a className="a2a_dd" href="https://www.addtoany.com/share#url=https%3A%2F%2Fyour-website-url&title=Share%20This%20Page" target="_blank" rel="nofollow noopener noreferrer">
                      <span className="a2a_svg a2a_s__default a2a_s_share" style={{ background: 'rgb(97, 100, 255)' }}>
                        {/* Share SVG */}
                      </span>
                      <span className="a2a_label"></span>
                    </a>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Gameview;
