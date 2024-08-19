import React from 'react';
import { Row, Col, Button, Alert } from 'react-bootstrap';
import './user.css'; // Ensure you have your styles

const JobList = ({ jobs }) => {
  if (jobs.length === 0) {
    return (
      <div className="text-center mt-5">
        <p>No jobs found.</p>
      </div>
    );
  }

  return (
    <Row>
      {jobs.map(user => (
        <Col key={user.id} className='col-12 col-sm-6 col-lg-3 mb-4'>
          <div className="user-card">
            <div className='image-card'>
              <img
                className="avatar"
                src={`http://localhost:8000/uploads/${user.imgpath || "https://usr.dokan-cdn.com/img/avatars/default.jpg"}`}
                alt="User Avatar"
              />
            </div>
            <div className="user-info">
              <h2>{user.displayName}</h2>
              <p>Email: {user.email}</p>
              <p>{user.bio}</p>
            </div>
            <div className="user-info">
              <Button variant="outline-primary" href={`/user/${user.id}`}>View Profile</Button>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default JobList;