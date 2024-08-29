// src/AccountChecker.js
import React, { useState } from 'react';
import axios from 'axios';

const AccountChecker = () => {
  const [username, setUsername] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    setIsValid(null);
    setError('');

    try {
      // Replace this URL with your actual API endpoint
      const response = await axios.get(`http://localhost:8000/check-tiktok-account?username=${username}`);
      setIsValid(response.data.isValid);
    } catch (err) {
      setError('Error checking account. Please try again.');
    }
  };

  return (
    <div>
      <h1>TikTok Account Checker</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter TikTok username"
      />
      <button onClick={handleCheck}>Check Account</button>

      {isValid === true && <p>Account is valid!</p>}
      {isValid === false && <p>Account is not valid.</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default AccountChecker;
