import React, { useState } from 'react';
import axios from 'axios';

const TwitterInfo = () => {
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
      const response = await axios.get(`http://localhost:8000/api/twitter-info/${username}`);
      console.log('API Response:', response.data); // Debugging line
      setInfo(response.data);
    } catch (err) {
      console.error('Error fetching Twitter data:', err.message);
      setError('Failed to load Twitter information. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Twitter Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Twitter Username"
          />
        </label>
        <button type="submit">Fetch User Info</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {info && (
        <div>
          <h2>Twitter User Information</h2>
          <p><strong>Username:</strong> {info.username || 'N/A'}</p>
          <p><strong>Name:</strong> {info.name || 'N/A'}</p>
          <p><strong>Bio:</strong> {info.description || 'N/A'}</p>
          <p><strong>Followers Count:</strong> {info.public_metrics?.followers_count ?? 'N/A'}</p>
          <p><strong>Following Count:</strong> {info.public_metrics?.following_count ?? 'N/A'}</p>
          <p><strong>Tweets Count:</strong> {info.public_metrics?.tweet_count ?? 'N/A'}</p>
        </div>
      )}
    </div>
  );
};

export default TwitterInfo;
