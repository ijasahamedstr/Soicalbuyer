import React, { useState } from 'react';
import axios from 'axios';

function PointTransfer() {
  const [username, setUsername] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkAccount = async () => {
    setLoading(true);
    setError('');
    setResult('');

    try {
      // Replace with your backend API endpoint
      const response = await axios.get('http://localhost:8000/check-account', {
        params: { username }
      });

      setResult(response.data.result);
    } catch (err) {
      setError('An error occurred while checking the account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Instagram Account Checker</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter Instagram username"
      />
      <button onClick={checkAccount} disabled={loading}>
        {loading ? 'Checking...' : 'Check Account'}
      </button>
      {result && <p>{result}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default PointTransfer;
