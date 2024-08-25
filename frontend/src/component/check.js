import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

function PointTransfer() {
  const [username, setUsername] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [error, setError] = useState(null);

  const handleCheckAccount = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/check-instagram-account', { username });
      setIsValid(response.data.valid);
      setError(null);
    } catch (err) {
      setError('Error checking account');
      setIsValid(null);
    }
  };

  return (
    <div>
      <h2>Check Instagram Account</h2>
      <Form>
        <Form.Group controlId="username">
          <Form.Label>Instagram Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Instagram username"
          />
        </Form.Group>
        <Button variant="primary" onClick={handleCheckAccount}>
          Check Account
        </Button>
      </Form>

      {isValid !== null && (
        <Alert variant={isValid ? 'success' : 'danger'}>
          {isValid ? 'The Instagram account is valid.' : 'The Instagram account is not valid.'}
        </Alert>
      )}

      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}
    </div>
  );
}

export default PointTransfer;
