import React, { useState, useEffect } from 'react';
import Filters from './Filters';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './user.css';
import JobList from './JobList';
import axios from 'axios';

function Users() {
  const [userdata, setUserdata] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
  });

  // Fetch user data from localStorage and set interval
  useEffect(() => {
    const fetchUserData = () => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      setUserdata(userDetails || {}); // Fallback to empty object if no data
    };

    fetchUserData();
    const intervalId = setInterval(fetchUserData, 300000); // Update every 5 minutes

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  // Fetch job data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/register'); // Replace with actual API endpoint
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching job listings:', error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [filterType]: value }));
  };

  // Filter jobs based on current filters
  const filteredJobs = jobs.filter(job => {
    const jobLocation = job[userdata.displayName] || '';


    return (
      (filters.location === '' || jobLocation.includes(filters.location)));
  });

  return (
    <Container>
      <Row>
        <div style={{ marginTop: '50px', marginBottom: '20px' }}>
          <h2 className='entry-title'>حسابات التواصل الإجتماعي</h2>
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

export default Users;
