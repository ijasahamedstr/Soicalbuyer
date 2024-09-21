// src/TikTokInfo.js
import React, { useState } from 'react';
import axios from 'axios';

const TikTokInfo = () => {
  const [username, setUsername] = useState('');
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      setError('Username is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Convert username to user ID (if necessary)
      // Here you might need to use an API or service to resolve username to user ID
      // For the sake of this example, assume we have an API to do this:
      const userIdResponse = await axios.get(`http://localhost:8000/api/resolve-username/${username}`);
      const userId = userIdResponse.data.userId;

      // Fetch user information using the resolved user ID
      const response = await axios.get(`http://localhost:8000/api/tiktok-info/${userId}`);
      setInfo(response.data);
    } catch (err) {
      console.error('Error fetching TikTok data:', err.message);
      setError('Failed to load TikTok information. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          TikTok Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter TikTok Username"
          />
        </label>
        <button type="submit">Fetch User Info</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {info && (
        <div>
          <h2>TikTok User Information</h2>
          <p><strong>Username:</strong> {info.username}</p>
          <p><strong>Full Name:</strong> {info.full_name}</p>
          <p><strong>Bio:</strong> {info.bio}</p>
          <p><strong>Followers Count:</strong> {info.followers_count}</p>
          <p><strong>Following Count:</strong> {info.following_count}</p>
          <p><strong>Likes Count:</strong> {info.likes_count}</p>
        </div>
      )}
    </div>
  );
};

export default TikTokInfo;
