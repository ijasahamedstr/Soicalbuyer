import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch access token from backend securely
        const tokenResponse = await axios.get('/api/get-access-token');
        const accessToken = tokenResponse.data.access_token;

        // Make API request to TikTok using the access token
        const response = await axios.get('https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        // Set user data
        setUserData(response.data.data.user);
      } catch (err) {
        // Improved error handling
        if (err.response) {
          // Server responded with an error
          const errorMessage = err.response.data?.error?.message || 'An error occurred while fetching user data.';
          setError(errorMessage);
        } else if (err.request) {
          // No response received from the server
          setError('No response received from the server.');
        } else {
          // Error occurred while setting up the request
          setError(err.message || 'An unexpected error occurred.');
        }
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>No user data found</div>;

  return (
    <div>
      <h1>User Profile</h1>
      <img src={userData.avatar_url} alt={userData.display_name} style={{ width: 168, height: 168 }} />
      <p>Display Name: {userData.display_name}</p>
      <p>Open ID: {userData.open_id}</p>
      <p>Union ID: {userData.union_id}</p>
    </div>
  );
};

export default UserProfile;
