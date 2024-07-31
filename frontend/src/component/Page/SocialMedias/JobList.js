import React from 'react';
import { Card } from 'react-bootstrap';
import {Row, Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';

const JobList = ({ jobs }) => {
  return (
    <Row>
          {jobs.length === 0 ? (
            <p style={{fontSize:'20px'}}>لم يتم العثور على حساب..</p>
            ) : (
                jobs.map(job => (
                <Col md={4}>   
                <div>
                <Card style={{backgroundColor:'#F2F3F4'}} key={job.id}>
                <Nav.Link href='/social-media-accounts-view'><Card.Img variant="top" src="https://usr.dokan-cdn.com/instagram.png" /></Nav.Link>
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
                </div>
                </Col>
                ))
            )}
      </Row>
  );
};

export default JobList;

