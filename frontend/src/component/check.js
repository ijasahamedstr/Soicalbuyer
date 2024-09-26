import React, { useState } from 'react';
import axios from 'axios';

const InstagramUserDetails = () => {
  const [username, setUsername] = useState('');
  const [accountInfo, setAccountInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleFetchUserDetails = async () => {
    if (!username) {
      setError('Please enter a username');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8000/api/instagram-info`, {
        params: { username }
      });
      
      setAccountInfo({
        id: response.data.id,
        username: response.data.username,
        fullName: response.data.full_name,
        bio: response.data.biography,
      });
      setError(null); // Clear error if successful
    } catch (err) {
      console.error(err); // Log actual error
      setError('Error fetching user details. Please check the console for more information.');
      setAccountInfo(null); // Reset account info on error
    }
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter Instagram username"
      />
      <button onClick={handleFetchUserDetails}>Get User Details</button>

      {accountInfo && (
        <div className="account-info">
          <h2>Account Information</h2>
          <p><strong>Username:</strong> {accountInfo.username}</p>
          <p><strong>Full Name:</strong> {accountInfo.fullName}</p>
          <p><strong>Bio:</strong> {accountInfo.bio}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default InstagramUserDetails;
