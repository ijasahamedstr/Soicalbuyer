import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const userValid = () => {
    const token = localStorage.getItem("userdbtoken");
   
    
    if (!token) {
      navigate("/login"); // Redirect to login page if token is not present
    } else {
      console.log("User is valid");
    }
  };

  useEffect(() => {
    userValid();
  }, [navigate]); // Add navigate to dependency array

  return (
    <div>Dashboard</div>
  );
};

export default Dashboard;
