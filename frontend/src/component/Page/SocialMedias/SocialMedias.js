import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for data fetching
import JobList from './JobList';
import Filters from './Filters';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './SocialMedias.css';

function Social() {
  const [userdata, setUserdata] = useState({});
  const [jobs, setJobs] = useState([]);
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
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/soical'); // Ensure endpoint is correct
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching job listings:', error);
        setError('Failed to fetch job listings.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [filterType]: value }));
  };

  // Filter jobs based on current filters
  const filteredJobs = jobs.filter(job => {
    const jobLocation = job[userdata?.displayName] || ''; // Optional chaining for safety
    return filters.location === '' || jobLocation.includes(filters.location);
  });

  // Display loading state
  if (loading) {
    return (
      <Container>
        <Row className="justify-content-center mt-5">
          <Col xs="auto">
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
        <Row className="justify-content-center mt-5">
          <Col xs="auto">
            <p>{error}</p>
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
          <h2 className='entry-title'>حسابات الألعاب</h2>
        </div>
        <Col style={{ backgroundColor: '#FFFFFF' }}>
          <Filters filters={filters} onFilterChange={handleFilterChange} />
        </Col>
      </Row>
      <Row>
        <Col>
          <JobList jobs={filteredJobs} />
        </Col>
      </Row>
    </Container>
  );
}

export default Social;
