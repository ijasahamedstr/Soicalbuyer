import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function PointTransfer() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your API endpoint
    fetch('http://localhost:8000/register/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <Container className="text-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <p>Loading data...</p>
    </Container>
  );

  if (error) return (
    <Container className="text-center">
      <Alert variant="danger">
        Error: {error.message}
      </Alert>
    </Container>
  );

  return (
    <Container>
    <Row>
      {data && data.map(data => (
        <Col  key={data._id}>
          <Card>
            <Card.Body>
              <Card.Title>{data.displayName}</Card.Title>
              <Card.Text>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
  );
}

export default PointTransfer;
