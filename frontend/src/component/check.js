import React, { useState } from 'react';
import axios from 'axios';

function InstagramUserDetails() {
  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  // Handle the manual input of the Instagram username
  const handleUsernameSubmit = async () => {
    if (!username) {
      setError('Please enter a valid username');
      return;
    }

    setError(null);
    setLoading(true);  // Set loading state to true while fetching data

    try {
      // Call the backend API which will interact with Instagram Graph API
      const response = await axios.post('/api/getUserInfo', { username });

      setLoading(false);  // Reset loading state after request is complete

      if (response.data) {
        setUserInfo(response.data);
      } else {
        setError('User not found');
      }
    } catch (err) {
      setLoading(false);  // Reset loading state in case of error
      setError('Failed to fetch user info');
    }
  };

  return (
    <div className="App">
      <h1>Instagram User Information</h1>

      {/* Input for custom username */}
      <div>
        <input
          type="text"
          placeholder="Enter Instagram Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleUsernameSubmit}>Search</button>
      </div>

      {/* Show loading message while fetching data */}
      {loading && <p>Loading...</p>}

      {/* Display user info if available */}
      {userInfo && (
        <div>
          <h2>Profile</h2>
          <p><strong>Username:</strong> {userInfo.username}</p>
          <p><strong>Bio:</strong> {userInfo.bio}</p>
          <p><strong>Account Type:</strong> {userInfo.account_type}</p>
          <p><strong>Media Count:</strong> {userInfo.media_count}</p>
        </div>
      )}

      {/* Show error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default InstagramUserDetails;
