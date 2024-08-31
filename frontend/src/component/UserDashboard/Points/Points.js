import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Points.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react'; // Import useEffect here


function Points() {
  const [userdata, setUserdata] = useState(null);
  const [username, setUsername] = useState('');
  const [points, setPoints] = useState('');
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

    // Ensure points is a number
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
        const userdbtoken = localStorage.getItem('userdbtoken'); // Ensure 'userdbtoken' is the correct key
        if (!userdbtoken) {
            setMessage('User not authenticated.');
            return;
        }

        const response = await fetch('http://localhost:8000/point', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userdbtoken}` // Ensure this is the correct format
            },
            body: JSON.stringify({ username, currentbalance: numericPoints, reason }), // Correct field names
        });

        const result = await response.json();
        if (response.ok) {
            setMessage('Transfer successful!');
            const updatedBalance = userdata.currentbalance - numericPoints;
            setUserdata(prev => ({
                ...prev,
                currentbalance: updatedBalance, // Correct field name
            }));
            localStorage.setItem('userDetails', JSON.stringify({
                ...userdata,
                currentbalance: updatedBalance, // Correct field name
            }));
        } else {
            // Show detailed error message
            setMessage(result.message || 'Transfer failed.');
        }
    } catch (error) {
        console.error('Error during points transfer:', error);
        setMessage('An error occurred.');
    }
};

  const  marginTopValue = '50px',marginBottomValue = '10px';
  return (
    <Container>
    {/* Stack the columns on mobile by making one full-width and the other half-width */}
    <Row>
    <div style={{marginTop:marginTopValue,marginBottom:marginBottomValue}}><h2 className='entry-title'>الطلبات</h2></div>
      <Col style={{backgroundColor:'#FFFFFF'}}>
      </Col>
    </Row>
    <Row>
      <Col>
        <div class="col d-flex align-items-center justify-content-center">
        <div className="">
        <div class="col-12">
        <h1 class="page-404__title"  id="xLoader">🗃</h1>
        <h2 style={{textAlign:'center',marginTop:'1.5rem',fontSize:'25px'}}>الصندوق</h2>
        <h3 style={{textAlign:'center',marginTop:'1.5rem',fontSize:'20px'}}>شاراتي</h3>
        <h4 style={{textAlign:'center',marginTop:'1.5rem',fontSize:'18px'}}>شاراتي</h4>
        <div class="col-12">
        <div class="sign">
        <div class="sign__content">
        <Form className='sign__form' onSubmit={handleSubmit}>
        <p>تحويل النقاط</p>
        <p>لديك :{userdata?.currentbalance} نقطة</p>
        <Form.Group className="mb-3" controlId="formGridUsername" style={{width:'100%'}}>
            <Form.Control placeholder="أسم المستخدم" className='sign__input'  value={username} onChange={(e) => setUsername(e.target.value)}  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridPoints" style={{width:'100%'}}>
            <Form.Control type='number' placeholder="عدد النقاط" className='sign__input' value={points}   onChange={(e) => setPoints(e.target.value)}   />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridReason">
        <Form.Control as="textarea" rows={3} className='sign__textarea' placeholder="سبب التحويل" value={reason} onChange={(e) => setReason(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit" style={{fontFamily:'Noto Kufi Arabic'}}>
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

export default Points;