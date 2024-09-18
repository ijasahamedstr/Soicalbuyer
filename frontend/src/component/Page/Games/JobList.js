import React from 'react';
import { Row, Col, Card, ListGroup, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Game.css'; // Ensure you have your styles

// Utility function to truncate text
const truncateText = (text, maxLength) => {
  if (typeof text !== 'string') {
    return '';
  }
  if (typeof maxLength !== 'number' || maxLength <= 0) {
    return text;
  }
  return text.length <= maxLength ? text : `${text.substring(0, maxLength)}...`;
};

const JobList = ({ jobs, userinfo }) => {
  return (
    <Row>
      {jobs.length === 0 ? (
        <Col className="text-center mt-5">
          <p style={{ fontSize: '20px' }}>لم يتم العثور على حساب..</p>
        </Col>
      ) : (
        jobs.map((job) => {
          const user = userinfo.find((user) => user._id === job.userid);

          return (
            <Col md={4} key={job._id}>
              <Card style={{ backgroundColor: '#F2F3F4' }}>
                <Card.Title>
                  <div className='card__likes'>
                    <span className='card__likes1'>🚀بوست</span>
                  </div>
                </Card.Title>
                <Nav.Link as={Link} to={`/game-view/${job._id}`} onClick={()=>{
                  localStorage.setItem("socialMediaAccountViewId", job.userid)
                }}>
                  <Card.Title>{job.gametitle}</Card.Title>
                </Nav.Link>
                <Card.Body>
                  <Card.Text style={{ fontSize: '13px' }}>
                    {truncateText(job.gamedec, 250)}
                  </Card.Text>
                  {user && (
                    <Card.Text>
                      <div className="card__author card__author--verified">
                        <img
                          src={`http://localhost:8000/uploads/${user.imgpath || "https://usr.dokan-cdn.com/img/avatars/default.jpg"}`}
                          alt="Owner Avatar"
                        />
                        <a href="https://usr.gg/meshari">@{user.displayName}</a>
                      </div>
                    </Card.Text>
                  )}
                </Card.Body>
                <ListGroup.Item>
                  <h3 style={{ color: '#6164ff', fontSize: '24px' }}>${job.gameAmount}</h3>
                  <div className='post__meta'>
                    <span className="post__comments">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-controller" viewBox="0 0 16 16">
                        {/* SVG paths here */}
                      </svg>
                      <span>{job.gamename}</span> 
                    </span>
                    <span className="post__comments">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe" viewBox="0 0 16 16">
                        {/* SVG paths here */}
                      </svg>
                      <span>{job.gametype}</span>
                    </span>
                  </div>
                </ListGroup.Item>
              </Card>
            </Col>
          );
        })
      )}
    </Row>
  );
};

export default JobList;
