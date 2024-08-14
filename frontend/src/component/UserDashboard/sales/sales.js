import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './sales.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function Sales() {

  return (
    <Container>
    <Row>
      <Col style={{ backgroundColor: '#FFFFFF' }}>
      </Col>
    </Row>
    <Row>
      <Col>
        <div className="col d-flex align-items-center justify-content-center">
          <div className="col-12 col-md-6 col-lg-9">
            <h2 style={{ textAlign: 'center', fontFamily: 'Changa, sans-serif', marginTop: '1.5rem' }}>المحفظة</h2>
            <div className="sign">
              <div className="sign__content" style={{display:'grid'}}>
              <Tabs
                defaultActiveKey="تواصل إجتماعي"
                transition={false}
                id="fill-tab-example"
                className="mb-3" style={{justifyContent:'center'}}
              >
                <Tab eventKey="تواصل إجتماعي" title="تواصل إجتماعي">
                <div class="col d-flex align-items-center justify-content-center">
                <div className="col-12 col-md-6 col-lg-9">
                <div className="knowledge">
                <h3 className="knowledge__title"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20,17.57a4.3,4.3,0,1,0-3.67,2.06A4.37,4.37,0,0,0,18.57,19l1.72,1.73a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42ZM18,17a2.37,2.37,0,0,1-3.27,0,2.32,2.32,0,0,1,0-3.27,2.31,2.31,0,0,1,3.27,0A2.32,2.32,0,0,1,18,17ZM19,3H5A3,3,0,0,0,2,6v9a3,3,0,0,0,3,3H9a1,1,0,0,0,0-2H5a1,1,0,0,1-1-1V9H20v1a1,1,0,0,0,2,0V6A3,3,0,0,0,19,3Zm1,4H4V6A1,1,0,0,1,5,5H19a1,1,0,0,1,1,1ZM10,11H7a1,1,0,0,0,0,2h3a1,1,0,0,0,0-2Z"></path></svg> طلبات حسابات التواصل الإجتماعي</h3>
                <div className="table-responsive table-dark rounded rounded-3 border-0 text-center" style={{background:'#ECF0F1'}}>
                <table className="table">
                <thead>
                <tr>
                <th>#</th>
                <th>الحساب</th>
                <th>معاينة</th>
                </tr>
                </thead>
                <tbody>
                </tbody>
                </table>
                </div>
                </div>
                </div>
                </div>
                </Tab>
                <Tab eventKey="العاب" title="العاب">
                <div class="col d-flex align-items-center justify-content-center">
                <div className="col-12 col-md-6 col-lg-9">
                <div className="knowledge">
                <h3 className="knowledge__title"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20,17.57a4.3,4.3,0,1,0-3.67,2.06A4.37,4.37,0,0,0,18.57,19l1.72,1.73a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42ZM18,17a2.37,2.37,0,0,1-3.27,0,2.32,2.32,0,0,1,0-3.27,2.31,2.31,0,0,1,3.27,0A2.32,2.32,0,0,1,18,17ZM19,3H5A3,3,0,0,0,2,6v9a3,3,0,0,0,3,3H9a1,1,0,0,0,0-2H5a1,1,0,0,1-1-1V9H20v1a1,1,0,0,0,2,0V6A3,3,0,0,0,19,3Zm1,4H4V6A1,1,0,0,1,5,5H19a1,1,0,0,1,1,1ZM10,11H7a1,1,0,0,0,0,2h3a1,1,0,0,0,0-2Z"></path></svg>حسابات الألعاب</h3>
                <div className="table-responsive table-dark rounded rounded-3 border-0 text-center" style={{background:'#ECF0F1'}}>
                <table className="table">
                <thead>
                <tr>
                <th>#</th>
                <th>المبلغ</th>
                <th>الحساب</th>
                <th>معاينة</th>
                </tr>
                </thead>
                <tbody>
                </tbody>
                </table>
                </div>
                </div>
                </div>
                </div>
                </Tab>
                <Tab eventKey="خدمات" title="خدمات" >
                <div class="col d-flex align-items-center justify-content-center">
                <div className="col-12 col-md-6 col-lg-9">
                <div className="knowledge">
                <h3 className="knowledge__title"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20,17.57a4.3,4.3,0,1,0-3.67,2.06A4.37,4.37,0,0,0,18.57,19l1.72,1.73a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42ZM18,17a2.37,2.37,0,0,1-3.27,0,2.32,2.32,0,0,1,0-3.27,2.31,2.31,0,0,1,3.27,0A2.32,2.32,0,0,1,18,17ZM19,3H5A3,3,0,0,0,2,6v9a3,3,0,0,0,3,3H9a1,1,0,0,0,0-2H5a1,1,0,0,1-1-1V9H20v1a1,1,0,0,0,2,0V6A3,3,0,0,0,19,3Zm1,4H4V6A1,1,0,0,1,5,5H19a1,1,0,0,1,1,1ZM10,11H7a1,1,0,0,0,0,2h3a1,1,0,0,0,0-2Z"></path></svg>الخدمات</h3>
                <div className="table-responsive table-dark rounded rounded-3 border-0 text-center" style={{background:'#ECF0F1'}}>
                <table className="table">
                <thead>
                <tr>
                <th>#</th>
                <th>المبلغ</th>
                <th>الخدمة</th>
                <th>معاينة</th>
                </tr>
                </thead>
                <tbody>
                </tbody>
                </table>
                </div>
                </div>
                </div>
                </div>
                </Tab>
                <Tab eventKey="النزاعات" title="النزاعات" >
                <div class="col d-flex align-items-center justify-content-center">
                <div className="col-12 col-md-6 col-lg-9">
                <div className="knowledge">
                <h3 className="knowledge__title"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-emoji-angry" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zm6.991-8.38a.5.5 0 1 1 .448.894l-1.009.504c.176.27.285.64.285 1.049 0 .828-.448 1.5-1 1.5s-1-.672-1-1.5c0-.247.04-.48.11-.686a.502.502 0 0 1 .166-.761l2-1zm-6.552 0a.5.5 0 0 0-.448.894l1.009.504A1.94 1.94 0 0 0 5 6.5C5 7.328 5.448 8 6 8s1-.672 1-1.5c0-.247-.04-.48-.11-.686a.502.502 0 0 0-.166-.761l-2-1z"></path></svg>الخدمات</h3>
                <div className="table-responsive table-dark rounded rounded-3 border-0 text-center" style={{background:'#ECF0F1'}}>
                <table className="table">
                <thead>
                </thead>
                <tbody>
                </tbody>
                </table>
                </div>
                </div>
                </div>
                </div>
                </Tab>
              </Tabs>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  </Container>
  );
}

export default Sales;