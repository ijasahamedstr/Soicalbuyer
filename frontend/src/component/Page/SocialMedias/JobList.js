import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const getImageForPlatform = (social_type) => {
  switch (social_type) {
    case 'instagram':
      return 'https://usr.dokan-cdn.com/instagram.png';
    case 'tiktok':
      return 'https://usr.dokan-cdn.com/tiktok.png';
    case 'twitter':
      return 'https://usr.dokan-cdn.com/twitter.png';
    case 'steam':
      return 'https://usr.dokan-cdn.com/steam.png';
    default:
      return 'https://usr.dokan-cdn.com/default.png';
  }
};

const JobList = ({ jobs, userinfo }) => {
  return (
    <Row>
      {jobs.length > 0 ? (
        jobs.map((job) => {
          const user = userinfo.find((user) => user._id === job.userid);
          return (
            <Col xs={12} sm={6} md={4} lg={3} key={job._id} className="mb-4">
              <Card style={{ backgroundColor: '#F2F3F4' }}>
                <Nav.Link as={Link} to={`/social-media-accounts-view/${job._id}`} onClick={()=>{
                  localStorage.setItem("socialMediaAccountViewId", job.userid)
                }}>
                  <Card.Img variant="top" src={getImageForPlatform(job.social_type)} />
                </Nav.Link>
                <Card.Body>
                  <Card.Title>@{job.social_username}</Card.Title>
                  {user && (
                    <div className="card__author card__author--verified">
                      <img
                        src={`${process.env.REACT_APP_API_HOST}/uploads/${user.imgpath || "https://usr.dokan-cdn.com/img/avatars/default.jpg"}`}
                        alt="Owner Avatar"
                      />
                      <a href="https://usr.gg/meshari">@{user.displayName}</a>
                    </div>
                  )}
                </Card.Body>
                <Card.Body>
                  <Card.Link href="#">
                    <div className='card__likes'>
                      <span className='card__likes1'>🚀بوست</span>
                    </div>
                  </Card.Link>
                  <Card.Link href="#">
                    <div className="card__price">
                      <span>السعر</span>
                      <span dir="rtl">
                        <span className="account_price_previe">${job.social_amount}</span>
                      </span>
                    </div>
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          );
        })
      ) : (
        <Col xs={12}>
          <p className="text-center">No jobs available</p>
        </Col>
      )}
    </Row>
  );
};

JobList.propTypes = {
  jobs: PropTypes.array.isRequired,
  userinfo: PropTypes.array.isRequired
};

export default JobList;
