import React from 'react';
import './Hero.css';
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../HeroSection/assets/image1-1.png";
import TrackVisibility from 'react-on-screen';


function HeroImage() {
  const mystyle2 = {
    fontFamily: "Noto Kufi Arabic", 
    fontSize: 25,
    fontWeight: '400',
    position: 'relative',
    textShadow: "0px  0px  10px  Red",
  };

  const mystyle = {
    fontFamily: "Noto Kufi Arabic",
    fontWeight: '400',
    textShadow: "0px  0px  10px  Red", 
  };
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "لبيع وشراء المنتجات الرقمية", "لبيع وشراء المنتجات الرقمية", "لبيع وشراء المنتجات الرقمية" ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }
 return (
  <section className="banner" id="home" style={{backgroundColor:'#121212',marginTop:'-15px',fontFamily:'Noto Kufi Arabic'}}>
  <Container className='Containerhero'>
    <Row className="aligh-items-center">
      <Col xs={12} md={6} xl={7}>
              <TrackVisibility>
          {({ isVisible }) =>
            <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
              <img src={headerImg} alt="Header Img"/>
            </div>}
        </TrackVisibility>
      </Col>
      <Col xs={12} md={6} xl={5}>
      <TrackVisibility className='track' style={{paddingTop: '30px',}}>
          {({ isVisible }) =>
          <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
            <h2 style={{mystyle,color:'#FFFFFF',fontSize:'40px'}}>أفضل منصة</h2><br/>
            <h1><span className="txt-rotate" dataPeriod="1000" data-rotate='[ "لبيع وشراء المنتجات الرقمية", "لبيع وشراء المنتجات الرقمية", "لبيع وشراء المنتجات الرقمية" ]'><span className="wrap">{text}</span></span></h1><br/>
              <p style={mystyle2}>من خلال منصة يوزر يمكنك بيع وشراء المنتجات الرقمية بأمان وسلاسة</p>
          </div>}
        </TrackVisibility>
      </Col>
    </Row>
  </Container>
</section>
 );
}

export default HeroImage;