import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Notifications() {
  const  marginTopValue = '50px',marginBottomValue = '10px';
  const user = {
    avatar: 'https://usr.dokan-cdn.com/img/loader.gif', // Replace with actual avatar URL
  };
  return (
    <Container>
    {/* Stack the columns on mobile by making one full-width and the other half-width */}
    <Row>
    <div style={{marginTop:marginTopValue,marginBottom:marginBottomValue,textAlign:'center'}}><h2>الطلبات</h2></div>
    </Row>
    <Row>
      <Col>
        <div className="col d-flex align-items-center justify-content-center">
        <div className="col-12 col-md-6 col-lg-9">
        <div className="page-load-status pt-3" style={{textAlign:'center',alignItems:'center',justifyContent:'center'}}>
        <div className="loader-ellips infinite-scroll-request">
        <img  src={user.avatar} style={{width:'50px',background:'black',borderRadius:'70px'}} alt="User Avatar" />
        </div>
        <div className="infinite-scroll-last">
        </div>
        </div>
        </div>
        </div>
      </Col>
    </Row>
  </Container>
  );
}

export default Notifications;