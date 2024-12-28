import Card from 'react-bootstrap/Card';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './review.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for data fetching


function Review() {

  const [userdata, setUserdata] = useState({});
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userinfo, setUserinfo] = useState([]);

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
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/feedback`); // Ensure endpoint is correct
        setJobs(response.data);
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
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/register`); // Ensure endpoint is correct
        setUserinfo(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setError('Failed to fetch user info.');
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

  
  
  const marginTopValue = '50px',marginBottomValue = '20px';
  var settings = {
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
      <div style={{marginTop:marginTopValue,marginBottom:marginBottomValue}}><h2 className='entry-title'>🌟ماذا قالوا عن يوزر؟</h2></div>
      <Slider {...settings}>
      {filteredJobs.map((job) => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="p-3">
          <div className='feature'>
          <Card style={{ backgroundColor:'#F2F3F4'}}>
            <Card.Body>
              <Card.Title>
              {userinfo.find(user => user._id === job.userid) && (                  
              <a>{userinfo.find(user => user._id === job.userid).displayName}</a>                         
              )}
              </Card.Title>
              <Card.Text>
              <span><div class="card__author  card__author--verified" style={{gap:'5px'}}>
              {userinfo.find(user => user._id === job.userid) && (                  
              <img
              src={`${process.env.REACT_APP_API_HOST}/uploads/${userinfo.find(user => user._id === job.userid).imgpath || "https://usr.dokan-cdn.com/img/avatars/default.jpg"}`}
             alt="Owner Avatar"
              />                        
              )}
             <span class="good-review-badge">ممتاز</span>
              <span class="good-review-badge">مشتري</span>  </div></span>
              <span>
              ⭐️
              ⭐️
              ⭐️
              ⭐️
              ⭐️
              </span>
              </Card.Text>
            </Card.Body>
            <Card.Body>
              <Card.Link href="#">
              <div class="card__price">
              <span dir="rtl">
              <span class="account_price_previe">{job.feedback}</span>
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
      </>
    );
  }
  
export default Review;