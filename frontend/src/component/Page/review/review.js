import Card from 'react-bootstrap/Card';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import './review.css';


function Review() {
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
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="p-3">
          <div className='feature'>
          <Card style={{ backgroundColor:'#F2F3F4'}}>
            <Card.Body>
              <Card.Title>@Ijas Ahamed</Card.Title>
              <Card.Text>
              <span><div class="card__author  card__author--verified" style={{gap:'5px'}}>
              <img src="https://usr.dokan-cdn.com/public/avatars/e334bb8a73397609e060efed2fb27f96.gif" alt="" /><span class="good-review-badge">ممتاز</span>
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
              <span class="account_price_previe">ثلث مره اشتري منه وثقهه ياربع</span>
              </span>
              </div>
              </Card.Link>
            </Card.Body>
           </Card>
          </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        <div className="p-3">
        <div className='feature'>
        <Card style={{ backgroundColor:'#F2F3F4'}}>
            <Card.Body>
              <Card.Title>@Ijas Ahamed</Card.Title>
              <Card.Text>
              <span><div class="card__author  card__author--verified" style={{gap:'5px'}}>
              <img src="https://usr.dokan-cdn.com/public/avatars/e334bb8a73397609e060efed2fb27f96.gif" alt="" /><span class="good-review-badge">ممتاز</span>
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
              <span class="account_price_previe">ثلث مره اشتري منه وثقهه ياربع</span>
              </span>
              </div>
              </Card.Link>
            </Card.Body>
           </Card>
        </div>
        </div>
      </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        <div className="p-3">
        <div className='feature'>
        <Card style={{ backgroundColor:'#F2F3F4'}}>
            <Card.Body>
              <Card.Title>@Ijas Ahamed</Card.Title>
              <Card.Text>
              <span><div class="card__author  card__author--verified" style={{gap:'5px'}}>
              <img src="https://usr.dokan-cdn.com/public/avatars/e334bb8a73397609e060efed2fb27f96.gif" alt="" /><span class="good-review-badge">ممتاز</span>
              <span class="good-review-badge">مشتري</span>  </div></span>
              </Card.Text>
              <span>
              ⭐️
              ⭐️
              ⭐️
              ⭐️
              ⭐️
              </span>
            </Card.Body>
            <Card.Body>
              <Card.Link href="#">
              <div class="card__price">
              <span dir="rtl">
              <span class="account_price_previe">ثلث مره اشتري منه وثقهه ياربع</span>
              </span>
              </div>
              </Card.Link>
            </Card.Body>
           </Card>
        </div>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        <div className="p-3">
        <div className='feature'>
        <Card style={{ backgroundColor:'#F2F3F4'}}>
            <Card.Body>
              <Card.Title>@Ijas Ahamed</Card.Title>
              <Card.Text>
              <span><div class="card__author  card__author--verified" style={{gap:'5px'}}>
              <img src="https://usr.dokan-cdn.com/public/avatars/e334bb8a73397609e060efed2fb27f96.gif" alt="" /><span class="good-review-badge">ممتاز</span>
              <span class="good-review-badge">مشتري</span>  </div></span>
              </Card.Text>
              <span>
              ⭐️
              ⭐️
              ⭐️
              ⭐️
              ⭐️
              </span>
            </Card.Body>
            <Card.Body>
              <Card.Link href="#">
              <div class="card__price">
              <span dir="rtl">
              <span class="account_price_previe">ثلث مره اشتري منه وثقهه ياربع</span>
              </span>
              </div>
              </Card.Link>
            </Card.Body>
           </Card>
        </div>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        <div className="p-3">
        <div className='feature'>
        <Card style={{ backgroundColor:'#F2F3F4'}}>
            <Card.Body>
              <Card.Title>@Ijas Ahamed</Card.Title>
              <Card.Text>
              <span><div class="card__author  card__author--verified" style={{gap:'5px'}}>
              <img src="https://usr.dokan-cdn.com/public/avatars/e334bb8a73397609e060efed2fb27f96.gif" alt="" /><span class="good-review-badge">ممتاز</span>
              <span class="good-review-badge">مشتري</span>  </div></span>
              </Card.Text>
              <span>
              ⭐️
              ⭐️
              ⭐️
              ⭐️
              ⭐️
              </span>
            </Card.Body>
            <Card.Body>
              <Card.Link href="#">
              <div class="card__price">
              <span dir="rtl">
              <span class="account_price_previe">ثلث مره اشتري منه وثقهه ياربع</span>
              </span>
              </div>
              </Card.Link>
            </Card.Body>
           </Card>
        </div>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        <div className="p-3">
        <div className='feature'>
        <Card style={{ backgroundColor:'#F2F3F4'}}>
            <Card.Body>
              <Card.Title>@Ijas Ahamed</Card.Title>
              <Card.Text>
              <span><div class="card__author  card__author--verified" style={{gap:'5px'}}>
              <img src="https://usr.dokan-cdn.com/public/avatars/e334bb8a73397609e060efed2fb27f96.gif" alt="" /><span class="good-review-badge">ممتاز</span>
              <span class="good-review-badge">مشتري</span>  </div></span>
              </Card.Text>
              <span>
              ⭐️
              ⭐️
              ⭐️
              ⭐️
              ⭐️
              </span>
            </Card.Body>
            <Card.Body>
              <Card.Link href="#">
              <div class="card__price">
              <span dir="rtl">
              <span class="account_price_previe">ثلث مره اشتري منه وثقهه ياربع</span>
              </span>
              </div>
              </Card.Link>
            </Card.Body>
           </Card>
        </div>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        <div className="p-3">
        <div className='feature'>
        <Card style={{ backgroundColor:'#F2F3F4'}}>
            <Card.Body>
              <Card.Title>@Ijas Ahamed</Card.Title>
              <Card.Text>
              <span><div class="card__author  card__author--verified" style={{gap:'5px'}}>
              <img src="https://usr.dokan-cdn.com/public/avatars/e334bb8a73397609e060efed2fb27f96.gif" alt="" /><span class="good-review-badge">ممتاز</span>
              <span class="good-review-badge">مشتري</span>  </div></span>
              </Card.Text>
              <span>
              ⭐️
              ⭐️
              ⭐️
              ⭐️
              ⭐️
              </span>
            </Card.Body>
            <Card.Body>
              <Card.Link href="#">
              <div class="card__price">
              <span dir="rtl">
              <span class="account_price_previe">ثلث مره اشتري منه وثقهه ياربع</span>
              </span>
              </div>
              </Card.Link>
            </Card.Body>
           </Card>
        </div>
        </div>
      </div>
      </Slider>
    </div>
    </div>
    </div>
      </>
    );
  }
  
  export default Review;