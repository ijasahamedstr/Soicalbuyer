import React, { useState, useEffect } from 'react';
import JobList from './JobList';
import Filters from './Filters';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Servicesuser.css';
import axios from 'axios';

function Servicesuser() {
  const [userdata, setUserdata] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [userinfo, setUserinfo] = useState([]);
  const [filters, setFilters] = useState({ location: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data from localStorage and set interval
  useEffect(() => {
    const fetchUserData = () => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      setUserdata(userDetails || {});
    };

    fetchUserData();
    const intervalId = setInterval(fetchUserData, 300000); // Update every 5 minutes

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  // Fetch job data from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/service'); // Replace with actual API endpoint
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching job listings:', error);
        setError('Failed to fetch job listings.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Fetch user info from API
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/register'); // Ensure endpoint is correct
        setUserinfo(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setError('Failed to fetch user info.');
      } finally {
        setLoading(false);
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
    const jobLocation = job.location || ''; // Adjust this to the correct property in the job object
    const isLocationMatch = filters.location === '' || jobLocation.includes(filters.location);
    const isUserMatch = userinfo.some(user => user._id === job.userid);

    return isLocationMatch && isUserMatch;
  });

  // Display loading state
  if (loading) {
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

  // Display error state
  if (error) {
    return (
      <Container>
        <Row>
          <Col className="text-center mt-5">
            <p>{error}</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <Row>
          <Col style={{ backgroundColor: '#FFFFFF' }}>
            <Filters filters={filters} onFilterChange={handleFilterChange} />
          </Col>
        </Row>
        <Row>
          <Col>
            <JobList jobs={filteredJobs} userinfo={userinfo} /> {/* Pass userinfo here */}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Servicesuser;
