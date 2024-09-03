import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col, Button, Form, Modal, Card, Nav } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

// Modal for description configuration
const DescriptionModal = ({ show, onHide, onSelectOption }) => (
  <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">تكوين وصف</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h4>
        حرصاً منا على تسهيل عملية البيع يمكنك اختيار مواصفات الحساب بشكل تلقائي وسيتم إضافتها إلى الوصف بشكل مرتب.
      </h4>
      <p style={{ color: 'red' }}>
        هذه الميزة تجريبية ولاتغنيك عن كتابة الوصف. الرجاء كتابة وصف دقيق لتجنب المشاكل.
      </p>
      {["الحساب مع الأيميل الأساسي", "الحساب بدون الأيميل الأساسي", "الحساب مربوط برقم هاتف", "الحساب غير مربوط برقم هاتف"].map(option => (
        <Form.Check
          key={option}
          type="checkbox"
          id={`switch-${option}`}
          label={option}
          value={option}
          onChange={onSelectOption}
        />
      ))}
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={onHide}>إغلاق</Button>
    </Modal.Footer>
  </Modal>
);

// Modal for ownership confirmation
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
  const [userid, setUserid] = useState("");
  const [social_username, setSocial_username] = useState("");
  const [social_type, setSocial_type] = useState("instagram");
  const [social_dec, setSocial_dec] = useState("");
  const [social_amount, setSocial_amount] = useState("");
  const [userdata, setUserdata] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [social_code, setSocial_code] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setSocial_code(generateReferenceNumber());
  }, []);

  useEffect(() => {
    const fetchUserData = () => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      setUserdata(userDetails || {});
      setUserid(userDetails?._id || "");
    };

    fetchUserData();
    const intervalId = setInterval(fetchUserData, 300000); // Fetch every 5 minutes

    return () => clearInterval(intervalId);
  }, []);

  const handleCheckboxChange = useCallback((event) => {
    const value = event.target.value;
    setSelectedOptions(prevSelected =>
      prevSelected.includes(value)
        ? prevSelected.filter(item => item !== value)
        : [...prevSelected, value]
    );
  }, []);

  const handlePlatformChange = useCallback((event) => {
    setSocial_type(event.target.value);
  }, []);

  const generateText = useCallback(() => (
    selectedOptions.length === 0 ? 'No options selected.' : `${selectedOptions.join(', ')}`
  ), [selectedOptions]);

  const handleSubmit1 = async () => {
    const formData = new FormData();
    formData.append("userid", userid);
    formData.append("social_username", social_username);
    formData.append("social_type", social_type);
    formData.append("social_dec", social_dec);
    formData.append("social_amount", social_amount);
    formData.append("social_code", social_code);

    try {
      const response = await axios.post("http://localhost:8000/soical", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (response.status === 200) {
        resetForm();
        Swal.fire({
          title: 'Success!',
          text: 'Your operation was successful.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response?.data.error || "An error occurred",
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const resetForm = () => {
    setUserid("");
    setSocial_username("");
    setSocial_type("instagram");
    setSocial_dec("");
    setSocial_amount("");
    setSocial_code(generateReferenceNumber());
  };

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

  return (
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
                  <p>(التيك توك) : يمنع منعاً باتاً عرض الحسابات (المكررة, الأرقام, العربية, المزخرفة, المنسوخة, القلم الأحمر والتي لا رابط لها).</p>
                  <p>(إنستقرام) : يمنع منعاً باتاً عرض الحسابات (العربية, المزخرفة, المنسوخة, التي لا رابط لها).</p>
                  <p>(سناب شات) : يمنع منعاً باتاً عرض الحسابات (العربية). يُحظر عرض حسابات سناب شات التي تتضمن مشاكل. في حالة اكتشاف مشكلة في الحساب، يُمنح المستخدم مهلة لا تتجاوز 24 ساعة لإصلاح المشكلة. في حال عدم حل المشكلة خلال المهلة المحددة، سيتم إلغاء الطلب.</p>
                  <p>وضح في الوصف نوع الأيميل الأساسي أيضاً قم بتوضيح إن كان الحساب مربوط برقم هاتف أم لا.</p>
                  <p>*الرجاء كتابة وصف دقيق يذكر جميع مميزات وعيوب الحساب لتجنب حدوث أي مشاكل*</p>

                  <Form.Group className="mb-3" controlId="formGridAddress2" style={{ width: '100%' }}>
                    <Form.Control
                      placeholder="الإسم الاول"
                      value={userid}
                      onChange={e => setUserid(e.target.value)}
                      aria-label="First name"
                      className="hidden"
                    />
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
                    <Form.Control as="textarea" rows={3} value={generateText()} onChange={e => setSocial_dec(e.target.value)} readOnly />
                    <p>لا تقم بوضع أي طريقة تواصل خارج المنصة في الوصف بشكل نهائي لأنها تعرض حسابك للحظر!</p>
                  </Form.Group>

                  <Button variant="primary" style={{ fontFamily: 'Noto Kufi Arabic', fontSize: '13px' }} onClick={() => setModalShow(true)}>
                    تكوين وصف
                  </Button>

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
                  
                  <DescriptionModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onSelectOption={handleCheckboxChange}
                  />
                  <DescriptionModal1
                    show={modalShow1}
                    onHide={() => setModalShow1(false)}
                    social_code={social_code}
                    handleSubmit={handleSubmit1}
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
                <Card.Title>{userdata?.displayName || 'اسم غير متوفر'}</Card.Title>
                <Card.Text>
                  <div className="card__author card__author--verified">
                    <img
                      src={`http://localhost:8000/uploads/${userdata?.imgpath || "https://usr.dokan-cdn.com/img/avatars/default.jpg"}`}
                      alt="User Avatar"
                    />
                    <a href={`https://usr.gg/${userdata?.username || 'unknown'}`}>
                      @{userdata?.username || 'اسم المستخدم غير متوفر'}
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
  );
}

export default Sellsocial;
