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
        const response = await axios.get('http://localhost:8000/gameaccount'); // Replace with actual API endpoint
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

export default Gamesaccount;;
