import React, { useState } from 'react';

const InstagramUserInfo = () => {
    const [userId, setUserId] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);

    const fetchUserInfo = async () => {
        if (!userId) {
            setError('Please enter a user ID');
            return;
        }

        try {
            const response = await fetch(`/api/instagram/user/${userId}`);
            
            if (!response.ok) {
                // Read response text for more details
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}. Details: ${errorText}`);
            }

            try {
                const data = await response.json();
                setUserInfo(data);
                setError(null);
            } catch (jsonError) {
                // Handle JSON parsing errors
                throw new Error('Error parsing JSON response. Please ensure the server is returning valid JSON.');
            }
            
        } catch (error) {
            // Set the error state with a message
            setError(`An error occurred: ${error.message}`);
            setUserInfo(null);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter Instagram User ID"
            />
            <button onClick={fetchUserInfo}>Get User Info</button>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {userInfo && (
                <div>
                    <p><strong>ID:</strong> {userInfo.id}</p>
                    <p><strong>Username:</strong> {userInfo.username}</p>
                    <p><strong>Account Type:</strong> {userInfo.account_type}</p>
                </div>
            )}
        </div>
    );
};

export default InstagramUserInfo;
