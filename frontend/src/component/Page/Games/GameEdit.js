import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function GameEdit() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_HOST}/gameaccount/${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_HOST}/gameaccount/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      // Handle successful submission (e.g., show a success message)
      Swal.fire({
        icon: 'success',
        title: 'تم تحديث الحساب!',
        text: 'تم حفظ التعديلات بنجاح.',
        confirmButtonColor: '#6164ff'
      });
      navigate("/الألعاب");
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'حدث خطأ!',
        text: error.message,
        confirmButtonColor: '#6164ff'
      });
    }
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_HOST}/gameaccount/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Network response was not ok');

      Swal.fire(
        'تم الحذف!',
        'تم حذف الحساب بنجاح.',
        'success'
      );
      navigate("/الألعاب");
      // Handle successful deletion (e.g., redirect or show a success message)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'حدث خطأ!',
        text: error.message,
        confirmButtonColor: '#6164ff'
      });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
      <Row>
        <Col style={{ backgroundColor: '#FFFFFF' }}>
          <div className="col d-flex align-items-center justify-content-center">
            <div className="col-12">
              <div className="sign">
                <Form className='sign__form' style={{ maxWidth: '600px', margin: 'auto' }} onSubmit={handleSubmit}>
                  <h3 style={{ marginBottom: '30px', color: 'rgb(97, 100, 255)', fontSize: '23px', textAlign: 'center' }}>
                    {item?.gameid || ''}
                  </h3>

                  <Form.Group className="mb-3" controlId="formGridGameTitle" style={{width:'100%'}}>
                    <Form.Label>العنوان</Form.Label>
                    <Form.Control
                      className='sign__input'
                      name="gametitle"
                      placeholder="أدخل عنوانك هنا"
                      value={item?.gametitle || ''}
                      onChange={(e) => setItem(prevItem => ({
                        ...prevItem,
                        gametitle: e.target.value
                      }))}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridDocumentCountry" style={{width:'100%'}}>
                    <Form.Label>دولة إصدار الوثيقة</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      className='sign__input'
                      name="documentcountry"
                      value={item?.gamename || ''}
                      onChange={(e) => setItem(prevItem => ({
                        ...prevItem,
                        gamename: e.target.value
                      }))}
                    >
                      <option value="PUBG">PUBG Mobile</option>
                      <option value="Fortnite">Fortnite</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridDocumentType" style={{width:'100%'}}>
                    <Form.Label>نوع الوثيقة</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      className='sign__input'
                      name="gametype"
                      value={item?.gametype || ''}
                      onChange={(e) => setItem(prevItem => ({
                        ...prevItem,
                        gametype: e.target.value
                      }))}
                    >
                      <option value="PSN">PSN</option>
                      <option value="XBOX">XBOX</option>
                      <option value="Cross Platform">Cross Platform</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridDocumentNumber" style={{width:'100%'}}>
                    <Form.Label>رقم الوثيقة</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      className='sign__input'
                      name="gamedec"
                      placeholder="أدخل رقم الوثيقة هنا"
                      value={item?.gamedec || ''}
                      onChange={(e) => setItem(prevItem => ({
                        ...prevItem,
                        gamedec: e.target.value
                      }))}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridGameAmount" style={{width:'100%'}}>
                    <Form.Label>الكمية</Form.Label>
                    <Form.Control
                      className='sign__input'
                      name="gameAmount"
                      placeholder="أدخل الكمية هنا"
                      value={item?.gameAmount || ''}
                      onChange={(e) => setItem(prevItem => ({
                        ...prevItem,
                        gameAmount: e.target.value
                      }))}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicCheckbox1" style={{ color: 'red',width:'100%' }} >
                    <Form.Check
                      type="checkbox"
                      label="اتعهد بخلو وصف المنتج من أي وسيلة تواصل خارج المنصة بأي طريقة كانت سواء مباشرة أو غير مباشرة"
                      checked={item?.checkbox1 || false}
                      onChange={(e) => setItem(prevItem => ({
                        ...prevItem,
                        checkbox1: e.target.checked
                      }))}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicCheckbox2" style={{ color: 'red',width:'100%' }}>
                    <Form.Check
                      type="checkbox"
                      label="اتعهد بتحمل كامل المسؤوليه القانونية بما مضى او صدر من الحساب المعروض من تاريخ انشاءه او شراءه الى تاريخ بيعه بمنصة يوزر واتعهد بخلوه من اي جرائم إلكترونيه"
                      checked={item?.checkbox2 || false}
                      onChange={(e) => setItem(prevItem => ({
                        ...prevItem,
                        checkbox2: e.target.checked
                      }))}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="mb-2"
                    style={{
                      fontFamily: 'Noto Kufi Arabic',
                      fontSize: '13px',
                      backgroundColor: '#6164ff',
                      borderColor: '#6164ff'
                    }}
                  >
                    تحديث الحساب
                  </Button>
                  <Button
                    variant="danger"
                    type="button"
                    onClick={handleDelete}
                    style={{
                      fontFamily: 'Noto Kufi Arabic',
                      fontSize: '13px',
                    }}
                  >
                    حذف الحساب
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default GameEdit;
