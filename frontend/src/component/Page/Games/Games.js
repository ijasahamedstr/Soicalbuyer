import React, { useState, useEffect } from 'react';
import Filters from './Filters';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import JobList from './JobList';
import axios from 'axios';
import './Game.css';

function Gamesaccount() {
  const [userdata, setUserdata] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [userinfo, setUserinfo] = useState([]);
  const [filters, setFilters] = useState({ location: '' });
  const [jobsLoading, setJobsLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);
  const [jobsError, setJobsError] = useState(null);
  const [usersError, setUsersError] = useState(null);

  // Fetch user data from localStorage and set interval
  useEffect(() => {
    const fetchUserData = () => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      setUserdata(userDetails || {}); // Handle case where there's no data
    };

    fetchUserData();
    const intervalId = setInterval(fetchUserData, 300000); // Update every 5 minutes

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  // Fetch job data from API
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setJobsLoading(true);
        const response = await axios.get('http://localhost:8000/gameaccount'); // Replace with actual API endpoint
        setJobs(response.data || []);
      } catch (error) {
        console.error('Error fetching job listings:', error);
        setJobsError('Failed to fetch job listings.');
      } finally {
        setJobsLoading(false);
      }
    };

    fetchJobData();
  }, []);

  // Fetch user info from API
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setUsersLoading(true);
        const response = await axios.get('http://localhost:8000/register'); // Ensure endpoint is correct
        setUserinfo(response.data || []);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setUsersError('Failed to fetch user info.');
      } finally {
        setUsersLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [filterType]: value }));
  };

  // Filter jobs based on current filters
  const filteredJobs = jobs.filter(job => {
    const jobLocation = job.location || ''; // Ensure job.location is defined
    const isLocationMatch = filters.location === '' || jobLocation.includes(filters.location);
    const isUserMatch = userinfo.some(user => user._id === job.userid);

    return isLocationMatch && isUserMatch;
  });

  const Filters = ({ location = {} }) => {
  const { pathname } = location;
  // Your component logic
};

  // Loading states for jobs and userinfo
  if (jobsLoading || usersLoading) {
    return (
      <Container>
        <Row>
          <Col className="text-center mt-5">
            <p>Loading...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  // Error states for jobs and userinfo
  if (jobsError || usersError) {
    return (
      <Container>
        <Row>
          <Col className="text-center mt-5">
            <p>{jobsError || usersError}</p>
          </Col>
        </Row>
      </Container>
    );
  }

  // Main component view
  return (
    <Container>
      <Row>
        <div style={{ marginTop: '50px', marginBottom: '20px' }}>
          <h2 className="entry-title">حسابات الألعاب</h2>
        </div>
        <Col style={{ backgroundColor: '#FFFFFF' }}>
          <Filters jobs={filteredJobs} onFilterChange={handleFilterChange} />
        </Col>
      </Row>
      <Row>
        <Col>
          <JobList jobs={filteredJobs} userinfo={userinfo} />
        </Col>
      </Row>
    </Container>
  );
}

export default Gamesaccount;
