import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Tab, Tabs } from 'react-bootstrap';

function Userview() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_HOST}/register/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setItem(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  return (
    <>
      <div className="main__author">
        <img src="https://cdn.usr.gg/img/bg/bg.png" alt="Logo" style={{ marginTop: '-9px' }} />
      </div>
      <Container style={{ marginTop: '60px' }}>
        <Row>
          <Col sm={4}>
            <div className="user-card">
              <div className="uper-container">
                <div className="image-card">
                  {/* You can add a user avatar here */}
                  {/* <img className="avatar" src={userInfo?.avatar || 'default-avatar.jpg'} alt="User Avatar" /> */}
                </div>
              </div>
              <div className="user-info">
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>Error: {error}</p>
                ) : (
                  item && (
                    <>
                      <h2>{item.name} <span className="pro-badge">برو</span></h2>
                      <p>{item.email}</p>
                    </>
                  )
                )}
              </div>
            </div>
          </Col>
          <Col sm={8}>
            <Tabs defaultActiveKey="التواصل الإجتماعي" id="fill-tab-example" fill>
              <Tab eventKey="التواصل الإجتماعي" title="التواصل الإجتماعي">
                {/* Social Media Cards */}
              </Tab>
              <Tab eventKey="التقييمات" title="التقييمات">
                {/* Reviews */}
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Userview;
