import React, { useState } from 'react';
import axios from 'axios';

const InstagramUserDetails = () => {
  const [username, setUsername] = useState('');
  const [accountInfo, setAccountInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchUserDetails = async () => {
    if (!username) {
      setError('Please enter a username');
      return;
    }

    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/instagram-info`, { // Use HTTP for local development
        params: { username }
      });

      setAccountInfo({
        id: response.data.id,
        username: response.data.username,
        fullName: response.data.full_name,
        bio: response.data.biography,
      });
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || 'Error fetching user details. Please check the console for more information.';
      setError(errorMessage);
      setAccountInfo(null);
    } finally {
      setLoading(false);
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
      <button onClick={handleFetchUserDetails} disabled={loading}>
        {loading ? 'Loading...' : 'Get User Details'}
      </button>

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


