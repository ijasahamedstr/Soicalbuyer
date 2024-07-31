import React from 'react';
import { Card } from 'react-bootstrap';
import {Row, Col } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import './Servicesuser.css';

const JobList = ({ jobs }) => {
  return (
    <Row>
          {jobs.length === 0 ? (
            <p style={{fontSize:'20px'}}>لم يتم العثور على حساب..</p>
            ) : (
                jobs.map(job => (
                <Col md={4}>   
                <div>
                <Card style={{backgroundColor:'#F2F3F4'}}>
                <Card.Title><div className='card__likes'><span className='card__likes1'>🚀بوست</span></div></Card.Title>
                <Card.Title>ارخص و افضل خدمات تيك توك 🔥 ضمان مدى الحياة (متابعين - لايكات - مشاهدات - حفظ - اكسبلور - تعليقات )🔥 هدية رباعي تيك مع كل طلب 🎁
                </Card.Title>
                <Card.Body>
                  <Card.Text> 🔴عرض حتى وصول الخدمة ل 1200طلب|🎁ستحصل دبل(ضعف) طلبك مجانا+ هدية مجانية ولفترة محدودة 🔥|الخدمة الافضل بضمان وتنفيذ فوري 0~24ساعة</Card.Text>
                  <Card.Text>
                  </Card.Text>
                </Card.Body>
                    <ListGroup.Item>
                    <h3 style={{ color: '#6164ff', fontSize: '24px'}}>$100.00 </h3>
                    <div class="post__meta">
                    <a class="post__date" href="https://usr.gg/450">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 17">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"></path>
                    </svg>
                    @450
                    </a>
                    <span class="post__comments"  dir="rtl" title="الوقت التقريبي لتنفيذ الخدمة">
                    ⏰ 24 ساعة
                    </span>
                    <span class="post__comments">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-cart-check" viewBox="0 0 16 20">
                    <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"></path>
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                    </svg>
                    1906
                    </span>
                    </div>
                  </ListGroup.Item>
              </Card>
                </div>
                </Col>
                ))
            )}
      </Row>
  );
};

export default JobList;

