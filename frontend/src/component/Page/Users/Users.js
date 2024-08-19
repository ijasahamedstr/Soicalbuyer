import React, { useState, useEffect } from 'react';
import Filters from './Filters';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './user.css';
import JobList from './JobList';
import axios from 'axios';

function Users() {
  const marginTopValue = '50px';
  const marginBottomValue = '20px';
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    level: '',
    language: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(' http://localhost:8000/register'); // Replace with actual API endpoint
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

  const filteredJobs = jobs.filter(job => {
    // Safeguard against undefined or null values by defaulting to empty string
    const jobLocation = job.location || '';
    const jobType = job.type || '';
    const jobLevel = job.level || '';
    const jobLanguage = job.language || '';

    return (
      (filters.location === '' || jobLocation.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.type === '' || jobType.toLowerCase() === filters.type.toLowerCase()) &&
      (filters.level === '' || jobLevel.toLowerCase() === filters.level.toLowerCase()) &&
      (filters.language === '' || jobLanguage.toLowerCase() === filters.language.toLowerCase())
    );
  });

  return (
    <Container>
      <Row>
        <div style={{ marginTop: marginTopValue, marginBottom: marginBottomValue }}>
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
