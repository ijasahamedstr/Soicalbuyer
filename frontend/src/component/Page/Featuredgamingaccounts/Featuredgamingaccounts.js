import Card from 'react-bootstrap/Card';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './Featuredgamingaccounts.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Utility function to truncate text
const truncateText = (text, maxLength) => {
  if (typeof text !== 'string') return '';
  return text.length <= maxLength ? text : `${text.substring(0, maxLength)}...`;
};

function Game() {
  const [userdata, setUserdata] = useState({});
  const [jobs, setJobs] = useState([]);
  const [userinfo, setUserinfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data from localStorage and set interval
  useEffect(() => {
    const fetchUserData = () => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      setUserdata(userDetails || {});
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
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/gameaccount`);
        setJobs(response.data || []);
      } catch (error) {
        console.error('Error fetching job listings:', error);
        setError('Failed to fetch job listings.');
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
        setUserinfo(response.data || []);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setError('Failed to fetch user info.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter jobs based on user ownership, only if userinfo is available
  const filteredJobs = jobs.filter(job =>
    userinfo && userinfo.some(user => user._id === job.userid)
  );

  const marginLeftValue = '15px', marginTopValue = '50px', marginBottomValue = '20px';

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="slider-container">
            <div style={{ marginLeft: marginLeftValue, marginTop: marginTopValue, marginBottom: marginBottomValue }}>
              <h2 className='entry-title'>🚀 حسابات ألعاب مميزة</h2>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <Slider {...settings}>
                {filteredJobs.map((job) => (
                  <div key={job._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="p-3">
                      <div className='feature'>
                        <Card style={{ width: '18rem', backgroundColor: '#F2F3F4' }}>
                          <Card.Title>
                            <div className='card__likes'><span className='card__likes1'>🚀بوست</span></div>
                          </Card.Title>
                          <Nav.Link as={Link} to={`/game-view/${job._id}`}>
                            <Card.Title>{job.gametitle}</Card.Title>
                          </Nav.Link>
                          <Card.Body>
                            <Card.Text>
                              {truncateText(job.gamedec, 150)}
                            </Card.Text>
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
                          <ListGroup.Item>
                            <h3 style={{ color: '#6164ff', fontSize: '24px' }}>${job.gameAmount}</h3>
                            <div className='post__meta'>
                              <span className="post__comments">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-controller" viewBox="0 0 16 16">
                                  <path d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1v-1z"></path>
                                  <path d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729c.14.09.266.19.373.297.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.733.474-1.74.806-2.466.315-.722.738-1.364 1.085-1.772a2.34 2.34 0 0 1 .433-.335.504.504 0 0 1-.028-.079z"></path>
                                </svg>
                                <span>{job.gamename}</span>
                              </span>
                              <span className="post__comments">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe" viewBox="0 0 16 16">
                                  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"></path>
                                </svg>
                                <span>{job.gametype}</span>
                              </span>
                            </div>
                          </ListGroup.Item>
                        </Card>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
