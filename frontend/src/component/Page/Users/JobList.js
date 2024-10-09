import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
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
      {jobs.map(job  => (
        <Col key={job.id} className='col-12 col-sm-6 col-lg-3 mb-4'>
          <div className="user-card">
            <div className='image-card'>
              <img
                className="avatar"
                src={`${process.env.REACT_APP_API_HOST}/uploads/${job.imgpath || "https://usr.dokan-cdn.com/img/avatars/default.jpg"}`}
                alt="User Avatar"
              />
            </div>
            <div className="user-info">
              <h2>{job.displayName}</h2>
              <p>Email: {job.email}</p>
              <p>{job.bio}</p>
            </div>
            <div className="user-info">
              <Button variant="outline-primary" href={`/UserView/${job._id}`}>View Profile</Button>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default JobList;