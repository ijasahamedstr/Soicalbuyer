import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react'; 

function PointTransfer() {
  const [userdata, setUserdata] = useState(null);
  const [username, setUsername] = useState('');
  const [points, setPoints] = useState(''); // Keep as string for input
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');

  // Fetch user data from localStorage and set interval
  useEffect(() => {
    const fetchUserData = () => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      setUserdata(userDetails || {}); // Fallback to empty object
    };

    fetchUserData();
    const intervalId = setInterval(fetchUserData, 300000); // 5 minutes interval

    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const numericPoints = parseFloat(points);

    if (isNaN(numericPoints) || numericPoints <= 0) {
      setMessage('Invalid points amount.');
      return;
    }

    if (userdata && numericPoints > userdata.currentbalance) {
      setMessage('Insufficient balance.');
      return;
    }

    try {
      // Retrieve token from localStorage or other secure location
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('User not authenticated.');
        return;
      }

      const response = await fetch('http://localhost:8000/point', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the token in the request header
        },
        body: JSON.stringify({ username, points: numericPoints, reason }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Transfer successful!');

        // Update user data and localStorage
        const updatedPoints = userdata.currentbalance - numericPoints;
        setUserdata((prev) => ({
          ...prev,
          currentbalance: updatedPoints,
        }));
        localStorage.setItem('userDetails', JSON.stringify({
          ...userdata,
          currentbalance: updatedPoints,
        }));
      } else {
        setMessage(result.message || 'Transfer failed.');
      }
    } catch (error) {
      setMessage('An error occurred.');
    }
  };

  const marginTopValue = '50px';
  const marginBottomValue = '10px';

  return (
    <Container>
      <Row>
        <div style={{ marginTop: marginTopValue, marginBottom: marginBottomValue }}>
          <h2 className='entry-title'>الطلبات</h2>
        </div>
        <Col style={{ backgroundColor: '#FFFFFF' }}></Col>
      </Row>
      <Row>
        <Col>
          <div className="d-flex align-items-center justify-content-center">
            <div className="col-12 col-md-6 col-lg-9">
              <div className="col-12">
                <h1 className="page-404__title" id="xLoader">🗃</h1>
                <h2 style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '25px' }}>الصندوق</h2>
                <h3 style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '20px' }}>شاراتي</h3>
                <h4 style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '18px' }}>شاراتي</h4>
                <div className="col-12">
                  <div className="sign">
                    <div className="sign__content">
                      <Form className='sign__form' onSubmit={handleSubmit}>
                        <p>تحويل النقاط</p>
                        <p>لديك :{userdata?.currentbalance || 0} نقطة</p>
                        <Form.Group className="mb-3" controlId="formGridUsername">
                          <Form.Control 
                            placeholder="أسم المستخدم" 
                            className='sign__input'  
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}  
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridPoints">
                          <Form.Control 
                            type='number' 
                            placeholder="عدد النقاط" 
                            className='sign__input' 
                            value={points}   
                            onChange={(e) => setPoints(e.target.value)}   
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridReason">
                          <Form.Control 
                            as="textarea" 
                            rows={3} 
                            className='sign__textarea' 
                            placeholder="سبب التحويل" 
                            value={reason} 
                            onChange={(e) => setReason(e.target.value)} 
                          />
                        </Form.Group>

                        <Button 
                          variant="primary" 
                          type="submit" 
                          style={{ fontFamily: 'Noto Kufi Arabic' }}
                        >
                          تحويل النقاط
                        </Button>
                        {message && <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{message}</p>}
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default PointTransfer;


