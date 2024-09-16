import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [username, setUsername] = useState(''); // State to store the input username
  const [userData, setUserData] = useState(null); // State to store user data
  const [loading, setLoading] = useState(false); // State to track loading status
  const [error, setError] = useState(null); // State to track errors

  const handleFetchUserData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8000/api/users/${username}`);

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      setUserData(data); // Store the fetched data in state
    } catch (err) {
      setError(err.message); // Store any errors that occur
    } finally {
      setLoading(false); // Set loading to false once the request completes
    }
  };

  return (
    <div className="user-profile">
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleFetchUserData}>Fetch User Data</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {userData && (
        <div>
          <img src={userData.profile_picture} alt={`${userData.username}'s profile`} />
          <h2>{userData.username}</h2>
          <p>{userData.bio}</p>
          <p>Followers: {userData.followers}</p>
          <p>Following: {userData.following}</p>
          <p>Posts: {userData.posts}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
