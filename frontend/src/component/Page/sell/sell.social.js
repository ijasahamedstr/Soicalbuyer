import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col, Button, Form, Modal, Card, Nav } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Ownership Confirmation Modal
const DescriptionModal1 = ({ show, onHide, handleSubmit, social_code, social_username }) => (
  <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">تأكيد الملكية ومعلومات التسليم</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h4>
        حرصاً منا على تقديم بيئة آمنة لبيع وشراء الحسابات يجب عليك إتمام الخطوات أدناه لكي تتمكن من إضافة الحساب.
      </h4>
      <p>
        قم بوضع الكلمة أدناه في بايو الحساب <span>({social_username})</span> واضغط تأكيد لكي تتمكن من المتابعة.
      </p>
      <Form.Group className="mb-3" controlId="supportCode">
        <Form.Label>الكلمة</Form.Label>
        <Form.Control type="text" readOnly value={social_code} />
      </Form.Group>
      <Button variant="primary" style={{ fontFamily: 'Noto Kufi Arabic', fontSize: '13px', width: '100%' }} onClick={handleSubmit}>
        تأكيد الملكية
      </Button>
    </Modal.Body>
  </Modal>
);

const generateReferenceNumber = () => `CHK${Math.floor(Math.random() * 90000) + 10000}`;

function Sellsocial() {
  const [userdata, setUserdata] = useState(null);
  const [userid, setUserid] = useState("");
  const [social_code, setSocial_code] = useState(generateReferenceNumber());
  const [social_username, setSocial_username] = useState('');
  const [social_type, setSocial_type] = useState('instagram');
  const [social_amount, setSocial_amount] = useState('');
  const [social_dec, setSocial_dec] = useState('');
  const [modalShow1, setModalShow1] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = () => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      setUserdata(userDetails || {});
    };

    fetchUserData();
    const intervalId = setInterval(fetchUserData, 300000); // 5 minutes interval

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (userdata?._id) {
      setUserid(String(userdata._id));
    }
  }, [userdata]);

  const getImageForPlatform = useCallback(() => {
    const images = {
      instagram: 'https://usr.dokan-cdn.com/instagram.png',
      tiktok: 'https://usr.dokan-cdn.com/tiktok.png',
      twitter: 'https://usr.dokan-cdn.com/twitter.png',
      steam: 'https://usr.dokan-cdn.com/steam.png',
      default: 'https://usr.dokan-cdn.com/default.png'
    };
    return images[social_type] || images.default;
  }, [social_type]);

  const handlePlatformChange = (e) => {
    setSocial_type(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSocial_dec(prev => checked ? `${prev ? `${prev}, ` : ''}${value}` : prev.replace(`, ${value}`, '').replace(value, ''));
  };

  const generateText = () => social_dec;

  const handleSubmit = async () => {
    if (!social_username || !social_amount || !social_dec) {
      Swal.fire({
        title: 'تنبيه',
        text: 'يرجى ملء جميع الحقول المطلوبة',
        icon: 'warning',
        confirmButtonText: 'موافق'
      });
      return;
    }

    try {
      const formData = {
        userid,
        social_code,
        social_username,
        social_type,
        social_amount,
        social_dec,
        sstatus: 'Pending'
      };

      const response = await axios.post('http://localhost:8000/soical', formData);

      if (response.status === 201) {
        Swal.fire({
          title: 'تأكيد الملكية',
          text: 'تم تأكيد الملكية بنجاح!',
          icon: 'success',
          confirmButtonText: 'موافق'
        });

        navigate('/'); // Redirect after successful submission
      } else {
        throw new Error('حدث خطأ أثناء إرسال البيانات');
      }
    } catch (error) {
      Swal.fire({
        title: 'خطأ',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'موافق'
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/soical');
        const userPosts = response.data.filter(item => item.userid === userdata?._id);
        setData(userPosts);
      } catch (error) {
        console.error('Error fetching job listings:', error);
        setError('Failed to fetch job listings.');
      } finally {
        setLoading(false);
      }
    };

    if (userdata) {
      fetchData();
    }
  }, [userdata]);

  return (
<>
  {loading && <p>Loading...</p>}
  {error && <p>{error}</p>}
  {data.some(item => item.sstatus === 'Pending') ? (
    <Container>
      <Row>
        <Col style={{ marginTop: '50px' }}>
          <Form className='sign__form'>
            <h1 className="page-404__title" style={{ fontFamily: 'Inter' }}>401</h1>
            <p className="page-404__text">لديك خدمة قيد المراجعة بالفعل, الرجاء الإنتظار لحين الإنتهاء من مراجعتها</p>
            <Button variant="primary" type="button" style={{ fontFamily: 'Noto Kufi Arabic' }}>العودة</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  ) : data.some(item => item.sstatus === 'Nextprocess') ? (
    <Container>
    <Row>
      <Col style={{backgroundColor:'#FFFFFF'}}>
      </Col>
    </Row>
    <Row>
      <Col>
        <div class="col d-flex align-items-center justify-content-center">
        <div className="">
        <div class="col-12">
        <h2 style={{textAlign:'center',fontFamily:'Noto Kufi Arabic',marginTop:'1.5rem'}}>تأكيد الملكية ومعلومات التسليم</h2>
        <div class="col-12">
        <div class="sign">
        <div class="sign__content">
        <Form  className='sign__form' onSubmit={handleSubmit}>
        <p>حرصاً منا على تقديم بيئة أمنة لبيع وشراء الحسابات يجب</p>
       <p>عليك إتمام الخطوات أدناه لكي تتمكن من إضافة الحساب</p>
       <p></p>
        <Form.Group className="mb-3" controlId="formGridAddress2" style={{width:'100%'}}>
            <Form.Control placeholder="الإسم الاول" className="hidden" name="userid"   />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formGridAddress2" style={{width:'100%'}}>
        <Form.Label>الإسم الاول</Form.Label>
            <Form.Control placeholder="الإسم الاول" className='sign__input' name="fname" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2" style={{width:'100%'}}>
        <Form.Label>الإسم الوسط</Form.Label>
            <Form.Control placeholder="الإسم الوسط" className='sign__input'  name="midname" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2" style={{width:'100%'}}>
        <Form.Label>الإسم الأخير</Form.Label>
            <Form.Control placeholder="الإسم الأخير" className='sign__input' name="lname"   />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2" style={{width:'100%'}}>
        <Form.Label>نوع الوثيقة</Form.Label>
        <Form.Select aria-label="Default select example" className='sign__input' name="documenttype">
        <option value="passport">جواز السفر</option>
        <option value="id">بطاقة الهوية</option>
        <option value="driving_license">رخصة القيادة</option>
        </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2" style={{width:'100%'}}>
        <Form.Label>رقم الوثيقة</Form.Label>
            <Form.Control placeholder="رقم وثيقة الإثبات" className='sign__input' name="documentnumber"  />
        </Form.Group>

        <Button variant="primary" type="submit" style={{fontFamily:'Noto Kufi Arabic',fontSize:'13px',background:'red'}}>
        مشاهدة إرشادات الوثيقة لإرسال الطلب 
        </Button>
    
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
  ) : (
    <Container>
      <Row>
        <Col xs={12}>
          <h2 className="text-center text-white bg-danger p-3" style={{ fontSize: '20px' }}>
            منصة يوزر لن تطلب منك بيانات الحساب خارج هذه الصفحة بشكل نهائي | ولن تطلب منك تسليم أي بيانات عبر الواتس اب او منصات أخرى
          </h2>
        </Col>
        <Col xs={12} md={8} className="bg-white">
          <h4>بيع حساب تواصل اجتماعي</h4>
          <Container>
            <Row className="bg-light p-4">
              <Col>
                <Form>
                  <Form.Group className="mb-3" controlId="formGridAddress2" style={{ width: '100%' }}>
                    <Form.Control placeholder="الإسم الاول" name="userid" className="hidden" value={userid} readOnly />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicUsername" style={{ width: '100%' }}>
                    <Form.Label>اسم المستخدم</Form.Label>
                    <Form.Control
                      type="text"
                      value={social_username}
                      onChange={e => setSocial_username(e.target.value)}
                      placeholder="أدخل اسم المستخدم"
                      aria-label="اسم المستخدم"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" style={{ width: '100%' }}>
                    <Form.Label>المنصة</Form.Label>
                    <Form.Select value={social_type} onChange={handlePlatformChange}>
                      <option value="instagram">انستقرام</option>
                      <option value="tiktok">تيك توك</option>
                      <option value="twitter">تويتر</option>
                      <option value="steam">ستيم</option>
                      <option value="snapchat" disabled>سناب شات - تتطلب إشتراك باقة لايت أو برو من متجر المنصة</option>
                      <option value="sony" disabled>سوني - تتطلب إشتراك باقة لايت أو برو من متجر المنصة</option>
                      <option value="xbox" disabled>إكس بوكس - تتطلب إشتراك باقة لايت أو برو من متجر المنصة</option>
                      <option value="tellonym" disabled>تيلونيوم - تتطلب إشتراك باقة لايت أو برو من متجر المنصة</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="descriptionTextarea" style={{ width: '100%' }}>
                    <Form.Label>وصف الحساب</Form.Label>
                    <Form.Control as="textarea" rows={3} value={generateText()} onChange={e => setSocial_dec(e.target.value)} />
                    <p>لا تقم بوضع أي طريقة تواصل خارج المنصة في الوصف بشكل نهائي لأنها تعرض حسابك للحظر!</p>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="promoTitle" style={{ width: '100%' }}>
                    <Form.Label>العنوان الترويجي (٢٥ حرف كحد أقصى) (غير إلزامي)</Form.Label>
                    <Form.Control type="text" disabled />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="price" style={{ width: '100%' }}>
                    <Form.Label>السعر (بالدولار)</Form.Label>
                    <Form.Control type="number" value={social_amount} onChange={e => setSocial_amount(e.target.value)} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="priceBeforeDiscount" style={{ width: '100%' }}>
                    <Form.Label>السعر قبل التخفيض (غير إلزامي) (بالدولار) (فقط شكل, لن يتم بيع الحساب بهذا السعر)</Form.Label>
                    <Form.Control type="text" disabled />
                  </Form.Group>

                  <Form.Group className="mb-3" style={{ color: 'red', width: '100%' }}>
                    <Form.Check type="checkbox" label="أتعهّد بخلو وصف المنتج من أي وسيلة تواصل خارج المنصة بأي طريقة كانت سواء مباشرة أو غير مباشرة" />
                  </Form.Group>
                  
                  <Form.Group className="mb-3" style={{ color: 'red', width: '100%' }}>
                    <Form.Check type="checkbox" label="أتعهّد بتحمل كامل المسؤولية القانونية بما مضى أو صدر من الحساب المعروض من تاريخ إنشائه أو شرائه إلى تاريخ بيعه بمنصة يوزر وأتعهد بخلوه من أي جرائم إلكترونية" />
                  </Form.Group>

                  <Form.Group className="mb-3" style={{ color: '#00fff7', width: '100%' }}>
                    <Form.Check type="checkbox" label="استقبال عروض" />
                  </Form.Group>
                  
                  <p>ستتمكن من استقبال عروض مالية على الحساب من المستخدمين الآخرين (سومات) وبإمكانك قبول عرض بسهولة تامة*</p>
                  <p className="text-center">المبلغ الذي سيتم إيداعه في حسابك في المنصة بعد البيع: ${social_amount}</p>
                 
                  <Button variant="primary" style={{ fontFamily: 'Noto Kufi Arabic', fontSize: '13px' }} onClick={() => setModalShow1(true)}>
                    تأكيد ملكية الحساب
                  </Button>
                  
                  <DescriptionModal1
                    show={modalShow1}
                    onHide={() => setModalShow1(false)}
                    social_code={social_code}
                    handleSubmit={handleSubmit}
                    social_username={social_username}
                  />
                </Form>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col xs={6} md={4}>
          <h4>معاينة</h4>
          <div>
            <Card style={{ backgroundColor: '#F2F3F4' }}>
              <Nav.Link href='/social-media-accounts-view' style={{ width: '100%' }}>
                <Card.Img variant="top" src={getImageForPlatform()} style={{ width: '100%' }} />
              </Nav.Link>
              <Card.Body>
                <Card.Title>{social_username || 'اسم الحساب غير متوفر'}</Card.Title>
                <Card.Text>
                  <div className="card__author card__author--verified">
                    <img
                      src={`http://localhost:8000/uploads/${social_username || "https://usr.dokan-cdn.com/img/avatars/default.jpg"}`}
                      alt="User Avatar"
                    />
                    <a href={`https://usr.gg/${social_username || 'unknown'}`}>
                      @{social_username || 'اسم المستخدم غير متوفر'}
                    </a>
                  </div>
                </Card.Text>
              </Card.Body>
              <Card.Body>
                <Card.Link href="#">
                  <div className='card__likes'>
                    <span className='card__likes1'>🚀بوست</span>
                  </div>
                </Card.Link>
                <Card.Link href="#">
                  <div className="card__price">
                    <span>السعر</span>
                    <span dir="rtl">
                      <span className="account_price_previe">${social_amount}</span>
                    </span>
                  </div>
                </Card.Link>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  )}
</>
  );
}

export default Sellsocial;
