
import React, { useState, useEffect } from 'react';
import JobList from './JobList';
import Filters from './Filters';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Servicesuser.css';

function Servicesuser() {
  const marginTopValue = '50px',marginBottomValue = '20px';
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
        // Replace with actual API endpoint or local data
        // const response = await axios.get('https://api.example.com/jobs');
        const mockData = [
          { id: 1, title: 'Frontend Developer', location: 'Remote', type: 'Full-time', level: 'Senior', language: 'JavaScript' },
          { id: 2, title: 'Backend Developer', location: 'New York', type: 'Part-time', level: 'Junior', language: 'Python' },
          { id: 3, title: 'Backend Developer', location: 'New York', type: 'Part-time', level: 'Junior', language: 'Python' },
          { id: 4, title: 'Backend Developer', location: 'New York', type: 'Part-time', level: 'Junior', language: 'Python' },
          // Add more mock data or fetch from API
        ];
        setJobs(mockData);
      } catch (error) {
        console.error('Error fetching job listings:', error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
  };

  const filteredJobs = jobs.filter(job =>
    (filters.location === '' || job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
    (filters.type === '' || job.type.toLowerCase() === filters.type.toLowerCase()) &&
    (filters.level === '' || job.level.toLowerCase() === filters.level.toLowerCase()) &&
    (filters.language === '' || job.language.toLowerCase() === filters.language.toLowerCase())
  );

    return (
      <>
    <Container>
      {/* Stack the columns on mobile by making one full-width and the other half-width */}
      <Row>
      <div style={{marginTop:marginTopValue,marginBottom:marginBottomValue}}><h2 className='entry-title'>حسابات التواصل الإجتماعي</h2></div>
        <Col style={{backgroundColor:'#FFFFFF'}}>
        <Filters filters={filters} onFilterChange={handleFilterChange} />
        </Col>
      </Row>
      <Row>
        <Col>
        <JobList jobs={filteredJobs} />
        </Col>
      </Row>
    </Container>
    
      </>
    );
  }
  
  export default Servicesuser;