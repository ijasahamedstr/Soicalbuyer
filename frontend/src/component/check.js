import React, { useState } from 'react';
import axios from 'axios';

const InstagramUserDetails = () => {
  const [username, setUsername] = useState('');
  const [accountInfo, setAccountInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchUserDetails = async () => {
    if (!username.trim()) {
      setError('Username cannot be empty');
      return;
    }

    setError(null);
    setLoading(true);
    
    try {
      // Ensure the API endpoint and query parameter match your backend setup
      const response = await axios.get(
        `http://localhost:8000/api/instagram/user`,
        { params: { username } }
      );
      
      // Safeguard against missing fields in the response
      const data = response.data;
      setAccountInfo({
        id: data.id || 'N/A',
        username: data.username || 'N/A',
        fullName: data.full_name || 'N/A',
        bio: data.biography || 'N/A',
        followers: data.followers_count || 'N/A',
        following: data.follows_count || 'N/A',
        profilePicture: data.profile_picture_url || 'N/A'
      });
    } catch (err) {
      console.error(err); // Log the actual error for debugging
      setError('Error fetching user details. Please check the console for more information.');
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
          <p><strong>Followers:</strong> {accountInfo.followers}</p>
          <p><strong>Following:</strong> {accountInfo.following}</p>
          <p><strong>Profile Picture:</strong></p>
          {accountInfo.profilePicture !== 'N/A' && (
            <img src={accountInfo.profilePicture} alt={`${accountInfo.username}'s profile`} />
          )}
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default InstagramUserDetails;
