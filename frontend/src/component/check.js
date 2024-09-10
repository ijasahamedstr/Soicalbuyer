import React, { useState } from 'react';
import axios from 'axios';

const InstagramInfo = () => {
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
      const response = await axios.get(`http://localhost:8000/api/instagram-info/${username}`);
      console.log('API Response:', response.data); // Debugging line
      setInfo(response.data);
    } catch (err) {
      console.error('Error fetching Instagram data:', err.message);
      setError('Failed to load Instagram information. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Instagram Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Instagram Username"
          />
        </label>
        <button type="submit">Fetch User Info</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {info && (
        <div>
          <h2>Instagram User Information</h2>
          <p><strong>Username:</strong> {info.username || 'N/A'}</p>
          <p><strong>Full Name:</strong> {info.full_name || 'N/A'}</p>
          <p><strong>Bio:</strong> {info.biography || 'N/A'}</p>
          <p><strong>Media Count:</strong> {info.media_count || 'N/A'}</p>
          <p><strong>Account Type:</strong> {info.account_type || 'N/A'}</p>
          {info.profile_picture_url && (
            <div>
              <strong>Profile Picture:</strong>
              <img src={info.profile_picture_url} alt="Profile" width="100" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InstagramInfo;
