import React from 'react';
import { Card, Row, Col, ListGroup, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Servicesuser.css';

const JobList = ({ jobs, userinfo }) => {
  return (
    <Row>
      {jobs.length === 0 ? (
        <p style={{ fontSize: '20px' }}>لم يتم العثور على حساب..</p>
      ) : (
        jobs.map((job) => {
          const user = userinfo.find((user) => user._id === job.userid);

          return (
            <Col md={4} key={job._id}>
              <div>
                <Card style={{ backgroundColor: '#F2F3F4' }}>
                  <Card.Title>
                    <div className="card__likes">
                      <span className="card__likes1">🚀بوست</span>
                    </div>
                  </Card.Title>
                  <Nav.Link as={Link} to={`/Service-view/${job._id}`} onClick={()=>{
                  localStorage.setItem("socialMediaAccountViewId", job.userid)
                }}>
                    <Card.Title>{job.service_heading}</Card.Title>
                  </Nav.Link>
                  <Card.Body>
                    <Card.Text>{job.service_dec}</Card.Text>
                  </Card.Body>
                  <ListGroup.Item>
                    <h3 style={{ color: '#6164ff', fontSize: '24px' }}>
                      ${job.service_Amount}
                    </h3>
                    <div className="post__meta">
                      <a className="post__date" href="https://usr.gg/450">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="bi bi-person-circle"
                          viewBox="0 0 16 17"
                        >
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
                          <path
                            fillRule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                          ></path>
                        </svg>
                        @{user?.displayName || 'Unknown'}
                      </a>
                      <span className="post__comments" dir="rtl" title="الوقت التقريبي لتنفيذ الخدمة">
                        ⏰ {job.service_time_houre}
                      </span>
                      <span className="post__comments">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="bi bi-cart-check"
                          viewBox="0 0 16 20"
                        >
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
          );
        })
      )}
    </Row>
  );
};

export default JobList;
