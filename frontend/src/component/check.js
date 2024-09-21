import React, { useState } from 'react';
import axios from 'axios';

const InstagramUserDetails = () => {
  const [username, setUsername] = useState('');
  const [accountInfo, setAccountInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleFetchUserDetails = async () => {
    try {
      // Assuming you need to send the username to the backend
      const response = await axios.get(
        `http://localhost:8000/api/instagram/user`, 
        { params: { username } } // Sending username as a query parameter if needed
      );
      setAccountInfo({
        id: response.data.id,
        username: response.data.username,
        fullName: response.data.full_name,
        bio: response.data.biography, // Assuming the correct field name is 'biography'
        followers: response.data.followers_count,
        following: response.data.follows_count,
        profilePicture: response.data.profile_picture_url
      });
      setError(null);
    } catch (err) {
      console.error(err); // Log the actual error for debugging
      setError('Error fetching user details. Please check the console for more information.');
      setAccountInfo(null);
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
      {error && <p>{error}</p>}
    </div>

  );
};

export default InstagramUserDetails;