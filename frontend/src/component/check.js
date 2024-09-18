import React, { useState, useEffect } from 'react';

const InstagramBio = () => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchInstagramBio();
  };

  const fetchInstagramBio = async () => {
    if (!username) return;

    setLoading(true);
    setError(null);

    try {
      // Replace this with your actual API call
      const response = await fetch(`http://localhost:8000/api/instagram/${username}`);

      if (!response.ok) {
        throw new Error('Failed to fetch bio');
      }

      const data = await response.json();
      setBio(data.bio);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Instagram Bio Checker</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Instagram username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Check Bio</button>
      </form>

      {loading && <p>Loading bio...</p>}
      {error && <p>Error: {error}</p>}
      {bio && (
        <div>
          <h2>{username}'s Instagram Bio</h2>
          <p>{bio}</p>
        </div>
      )}
    </div>
  );
};

export default InstagramBio;

