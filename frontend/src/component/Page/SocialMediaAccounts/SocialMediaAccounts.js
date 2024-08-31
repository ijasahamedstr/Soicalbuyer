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
        const response = await axios.get('http://localhost:8000/soical'); // Ensure endpoint is correct
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



  const  marginTopValue = '50px',marginBottomValue = '20px';
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

  const getImageForPlatform = (social_type) => {
    switch (social_type) {
      case 'instagram':
        return 'https://usr.dokan-cdn.com/instagram.png';
      case 'tiktok':
        return 'https://usr.dokan-cdn.com/tiktok.png';
      case 'twitter':
        return 'https://usr.dokan-cdn.com/twitter.png';
      case 'steam':
        return 'https://usr.dokan-cdn.com/steam.png';
      default:
        return 'https://usr.dokan-cdn.com/default.png';
    }
  };
    return (
      <>
      <div className="container">
      <div className="row">
      <div className="slider-container">
      <div style={{ marginTop:marginTopValue,marginBottom:marginBottomValue}}><h2 className='entry-title'>🔥 حسابات تواصل إجتماعي مميزة</h2></div>
      <Slider {...settings}>
      {jobs.map((job, index) => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="p-3">
          <div className='feature'>
          <Card style={{ width: '18rem', backgroundColor:'#F2F3F4'}}>
          <Nav.Link as={Link} to={`/social-media-accounts-view/${job._id}`}><Card.Img variant="top"  src={getImageForPlatform(job.social_type)}  style={{borderRadius:'30px'}}  /></Nav.Link>
            <Card.Body>
              <Card.Title>@{job.social_username}</Card.Title>
              <Card.Text>
              <span><div class="card__author  card__author--verified  ">
              <img src="https://usr.dokan-cdn.com/public/avatars/e334bb8a73397609e060efed2fb27f96.gif" alt="" /><a href="https://usr.gg/meshari">@Ijas Ahamed</a></div></span>
              </Card.Text>
            </Card.Body>
            <Card.Body>
              <Card.Link href="#"><div className='card__likes'><span className='card__likes1'>🚀بوست</span></div></Card.Link>
              <Card.Link href="#">
              <div class="card__price">
              <span>السعر</span>
              <span dir="rtl">
              <span class="account_price_previe">${job.social_amount}</span>
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
  
  export default Soicalaccount;