import Card from 'react-bootstrap/Card';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './Social Media Accounts.css';
import Nav from 'react-bootstrap/Nav';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for data fetching
import { Link } from 'react-router-dom';

function Soicalaccount() {
  const [userdata, setUserdata] = useState({});
  const [jobs, setJobs] = useState([]);
  const [userinfo, setUserinfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data from localStorage and set interval
  useEffect(() => {
    const fetchUserData = () => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      if (userDetails) {
        setUserdata(userDetails);
      } else {
        setUserdata({});
      }
    };

    fetchUserData();
    const intervalId = setInterval(fetchUserData, 300000); // Update every 5 minutes

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  // Fetch job data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://soicalbuyer-vert.vercel.app/soical`);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching job listings:', error);
        if (error.response) {
          setError(`API Error: ${error.response.status} - ${error.response.data.message}`);
        } else if (error.request) {
          setError('No response from the server');
        } else {
          setError('Network Error: ' + error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch user info from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/register`);
        setUserinfo(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
        if (error.response) {
          setError(`API Error: ${error.response.status} - ${error.response.data.message}`);
        } else if (error.request) {
          setError('No response from the server');
        } else {
          setError('Network Error: ' + error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter jobs based on user ownership
  const filteredJobs = jobs.filter(job =>
    userinfo.some(user => user._id === job.userid)
  );

  // Handle rendering state
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="slider-container">
          <div style={{ marginTop: '50px', marginBottom: '20px' }}>
            <h2 className="entry-title">🔥 حسابات تواصل إجتماعي مميزة</h2>
          </div>
          <Slider {...settings}>
            {filteredJobs.map((job) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={job._id}>
                <div className="p-3">
                  <div className="feature">
                    <Card style={{ width: '18rem', backgroundColor: '#F2F3F4' }}>
                      <Nav.Link as={Link} to={`/social-media-accounts-view/${job._id}`}>
                        <Card.Img
                          variant="top"
                          src={getImageForPlatform(job.social_type)}
                          style={{ borderRadius: '30px' }}
                        />
                      </Nav.Link>
                      <Card.Body>
                        <Card.Title>@{job.social_username}</Card.Title>
                        <Card.Text>
                          <span>
                            {userinfo.find(user => user._id === job.userid) && (
                              <div className="card__author card__author--verified">
                                <img
                                   src={`${process.env.REACT_APP_API_HOST}/uploads/${userinfo.find(user => user._id === job.userid).imgpath || "https://usr.dokan-cdn.com/img/avatars/default.jpg"}`}
                                  alt="Owner Avatar"
                                />
                                <a href="https://usr.gg/meshari">@{userinfo.find(user => user._id === job.userid).displayName}</a>
                              </div>
                            )}
                          </span>
                        </Card.Text>
                      </Card.Body>
                      <Card.Body>
                        <Card.Link href="#">
                          <div className="card__likes">
                            <span className="card__likes1">🚀بوست</span>
                          </div>
                        </Card.Link>
                        <Card.Link href="#">
                          <div className="card__price">
                            <span>السعر</span>
                            <span dir="rtl">
                              <span className="account_price_previe">${job.social_amount}</span>
                            </span>
                          </div>
                        </Card.Link>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Soicalaccount;
