import React from 'react';
import {Row, Col } from 'react-bootstrap';
import './user.css';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

const JobList = ({ jobs }) => {
  
  const user = {
    name: 'ايجاس احمد',
    email: 'حسابات تويتر 2007,2008,2009 لو في اي استفسار تواصل عن طريق رسائل المنصه',
    avatar: 'https://www.everypixel.com/preview_collections/20231129/people_of_the_world_vol.3_33', // Replace with actual avatar URL
  };
  return (
    <Row>
          {jobs.length === 0 ? (
            <p style={{fontSize:'20px'}}>لم يتم العثور على حساب..</p>
            ) : (
                jobs.map(job => (
                <Col className='col-12 col-sm-6 col-lg-3'>   
                <div>
                <div className="user-card moving-border">
                  <div className='uper-container'>
                    <div className='image-card'>
                  <img className="avatar" src={user.avatar} alt="User Avatar" />
                    </div>
                  </div>
                  <div className="user-info">
                    <h2 style={{color:'rgb(97, 100, 255)'}}>{user.name}</h2>
                    <p>Email: {user.email}</p>
                  </div>
                  <div className="user-info">
                  <Nav.Link href="/UserView"><Button variant="outline-primary" style={{fontWeight:'600'}}>View Profile</Button>{' '}</Nav.Link>
                  </div>
                 
                </div>
                </div>
                </Col>
                ))
            )}
      </Row>
  );
};

export default JobList;

