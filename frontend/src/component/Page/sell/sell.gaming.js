import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const DescriptionModal = ({
  show,
  onHide,
  toggleVisibility,
  isVisible,
  handleSubmit,
  formData,
  setFormData,
}) => (
  <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">معلومات التسليم</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h6>حرصاً منا على تقديم بيئة أمنة لبيع وشراء الحسابات يجب عليك إتمام الخطوات أدناه لكي تتمكن من إضافة الحساب</h6>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>إيميل الحساب</Form.Label>
        <Form.Control
          type="email"
          value={formData.gamegmail}
          onChange={(e) => setFormData({ ...formData, gamegmail: e.target.value })}
          aria-label="Email of the account"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>كلمة مرور الحساب</Form.Label>
        <Form.Control
          type="password"
          value={formData.gamepassword}
          onChange={(e) => setFormData({ ...formData, gamepassword: e.target.value })}
          aria-label="Password of the account"
        />
      </Form.Group>

      <p style={{ color: 'red' }}>
        لاتقم بتكرار كلمة مرور في أكثر من حساب , ضع كلمة مرور صعبة يصعب تخمينها
      </p>

      <p>بيانات إضافية</p>

      {isVisible && (
        <>
          <Form.Group className="mb-3" controlId="supportCode1">
            <Form.Label>عنوان الحقل</Form.Label>
            <Form.Control
              type="text"
              value={formData.gametitle}
              onChange={(e) => setFormData({ ...formData, gametitle: e.target.value })}
              aria-label="Field title"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="supportCode2">
            <Form.Label>قيمة الحقل</Form.Label>
            <Form.Control
              type="text"
              value={formData.gamevalue}
              onChange={(e) => setFormData({ ...formData, gamevalue: e.target.value })}
              aria-label="Field value"
            />
          </Form.Group>
        </>
      )}

      <Button
        variant="primary"
        style={{ fontFamily: 'Noto Kufi Arabic', fontSize: '13px', width: '100%' }}
        onClick={toggleVisibility}
      >
        {isVisible ? 'حذف الحقل' : 'إضافة بيانات إضافية'}
      </Button>

      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>تعليمات الإستلام ستظهر للمشتري قبل الشراء وبعده</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          required
          value={formData.gamepurchasedec}
          onChange={(e) => setFormData({ ...formData, gamepurchasedec: e.target.value })}
          aria-label="Purchase instructions"
        />
      </Form.Group>

      <Button
        variant="primary"
        style={{ fontFamily: 'Noto Kufi Arabic', fontSize: '13px', width: '100%' }}
        onClick={handleSubmit}
      >
        تأكيد ملكية الحساب
      </Button>
    </Modal.Body>
  </Modal>
);

function Sellgaming() {
  const [userid, setUserid] = useState("");
  const [gameid, setGameid] = useState("");
  const [gamename, setGamename] = useState("");
  const [gametype, setGametype] = useState("");
  const [gamedec, setGamedec] = useState("");
  const [gameAmount, setGameAmount] = useState("");
  const [files, setFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [userdata, setUserdata] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    gamegmail: "",
    gamepassword: "",
    gametitle: "",
    gamevalue: "",
    gamepurchasedec: ""
  });

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

  const handleSubmit1 = async () => {
    const formdata = new FormData();
    formdata.append("userid", String(userdata?._id));
    formdata.append("gameid", gameid);
    formdata.append("gamename", gamename);
    formdata.append("gametype", gametype);
    formdata.append("gamedec", gamedec);
    formdata.append("gameAmount", gameAmount);
    formdata.append("gamegmail", formData.gamegmail);
    formdata.append("gamepassword", formData.gamepassword);
    formdata.append("gametitle", formData.gametitle);
    formdata.append("gamevalue", formData.gamevalue);
    formdata.append("gamepurchasedec", formData.gamepurchasedec);

    files.forEach(file => formdata.append("userimg", file));

    try {
      const response = await axios.post("http://localhost:8000/gameaccount", formdata, {
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

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);

    const previews = selectedFiles.map(file => {
      const reader = new FileReader();
      return new Promise(resolve => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(previews).then(results => setImagePreviews(results));
  };

  const toggleVisibility = () => setIsVisible(prev => !prev);

  const resetForm = () => {
    setUserid("");
    setGameid("");
    setGamename("");
    setGametype("");
    setGamedec("");
    setGameAmount("");
    setFiles([]);
    setImagePreviews([]);
    setFormData({
      gamegmail: "",
      gamepassword: "",
      gametitle: "",
      gamevalue: "",
      gamepurchasedec: ""
    });
  };

  return (
    <>
      <Container>
        <Row>
          <div style={{ marginTop: '50px', marginBottom: '20px' }}>
            <h2 style={{ textAlign: 'center', fontSize: '20px', color: 'white', background: 'red', padding: '15px' }}>
              منصة يوزر لن تطلب منك بيانات الحساب خارج هذه الصفحة بشكل نهائي | ولن تطلب منك تسليم أي بيانات عبر الواتس اب او منصات أخرى
            </h2>
          </div>
          <Col style={{ backgroundColor: '#FFFFFF' }}>
            <h4>بيع حساب لعبة</h4>
            <Container>
              <Row>
                <Col style={{ backgroundColor: '#FFFFFF' }}></Col>
              </Row>
              <Row style={{ background: '#F7F9F9', padding: '30px' }}>
                <h5>تختلف رسوم بيع حساب الألعاب عن رسوم بيع حسابات التواصل الإجتماعي والخدمات | الرجاء مراجعة صفحة الشروط والأحكام</h5>
                <br />
                <Col>
                  <Form>
                    <Form.Group className="mb-3" controlId="formGridAddress2">
                      <Form.Control
                        placeholder="الإسم الاول"
                        value={userid}
                        onChange={e => setUserid(e.target.value)}
                        aria-label="First name"
                        className="hidden"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formTitle">
                      <Form.Label>العنوان</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        value={gameid}
                        onChange={e => setGameid(e.target.value)}
                        aria-label="Game ID"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGame">
                      <Form.Label>اللعبة</Form.Label>
                      <Form.Select
                        required
                        value={gamename}
                        onChange={e => setGamename(e.target.value)}
                        aria-label="Game name"
                      >
                        <option value="PUBG">PUBG Mobile</option>
                        <option value="Fortnite">Fortnite</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPlatform">
                      <Form.Label>المنصة</Form.Label>
                      <Form.Select
                        required
                        value={gametype}
                        onChange={e => setGametype(e.target.value)}
                        aria-label="Game platform"
                      >
                        <option value="PSN">PSN</option>
                        <option value="XBOX">XBOX</option>
                        <option value="Cross Platform">Cross Platform</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDescription">
                      <Form.Label>وصف الحساب</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        required
                        value={gamedec}
                        onChange={e => setGamedec(e.target.value)}
                        aria-label="Account description"
                      />
                      <p>لاتقم بوضع أي طريقة تواصل خارج المنصة في الوصف بشكل نهائي لأنها قد تعرض حسابك للحظر!</p>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPromoTitle">
                      <Form.Label>العنوان الترويجي (٢٥ حرف كحد أقصى) (غير إلزامي)</Form.Label>
                      <Form.Control
                        type="number"
                        value={gameAmount}
                        onChange={e => setGameAmount(e.target.value)}
                        aria-label="Promotional title"
                      />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>ملف الصورة</Form.Label>
                      <Form.Control
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        aria-label="Upload images"
                      />
                      {imagePreviews.length > 0 && (
                        <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                          {imagePreviews.map((preview, index) => (
                            <img
                              key={index}
                              src={preview}
                              alt={`Preview ${index}`}
                              style={{ maxWidth: '200px', height: 'auto', margin: '10px' }}
                            />
                          ))}
                        </div>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3" style={{ color: 'red' }}>
                      <Form.Check
                        type="checkbox"
                        label="اتعهد بخلو وصف المنتج من أي وسيلة تواصل خارج المنصة بأي طريقة كانت سواء مباشرة أو غير مباشرة"
                        required
                        aria-label="Commitment to no external contact"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" style={{ color: 'red' }}>
                      <Form.Check
                        type="checkbox"
                        label="اتعهد بتحمل كامل المسؤوليه القانونية بما مضى او صدر من الحساب المعروض من تاريخ انشاءه او شراءه الى تاريخ بيعه بمنصة يوزر واتعهد بخلوه من اي جرائم إلكترونيه"
                        required
                        aria-label="Legal responsibility commitment"
                      />
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="button"
                      style={{ fontFamily: 'Noto Kufi Arabic', fontSize: '13px' }}
                      onClick={() => setModalShow(true)}
                    >
                      عرض الحساب
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>

      <DescriptionModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        toggleVisibility={toggleVisibility}
        isVisible={isVisible}
        handleSubmit={handleSubmit1}
        formData={formData}
        setFormData={setFormData}
      />
    </>
  );
}

export default Sellgaming;
