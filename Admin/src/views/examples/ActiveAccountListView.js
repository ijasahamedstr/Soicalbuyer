import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";
import { useParams } from "react-router-dom";

const ActiveAccountListView = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    heading: '',
    feedback: ''
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://localhost:8000/Accountactive/${id}`);
        if (!response.ok) throw new Error('Unable to fetch data');
        const data = await response.json();
        setItem(data);
      } catch (error) {
        setError('Error fetching data. Please try again later.');
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/adminfeedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userid: item._id // Send user ID along with feedback
        }),
      });

      if (!response.ok) throw new Error('Failed to submit feedback');

      await response.json();
      setFormData({ heading: '', feedback: '' }); // Reset form on success
      alert('Feedback submitted successfully!'); // Optional user feedback
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting feedback. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">User Accounts Active Request</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button color="primary" size="sm">Settings</Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">User Information</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-fname">First Name</label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={item.fname}
                            id="input-fname"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-mname">Middle Name</label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={item.midname}
                            id="input-mname"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-lname">Last Name</label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={item.lname}
                            id="input-lname"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-country">Country</label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={item.documentcountry}
                            id="input-country"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-doc-type">Document Type</label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={item.documenttype}
                            id="input-doc-type"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-doc-number">Document Number</label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={item.documentnumber}
                            id="input-doc-number"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <h6 className="heading-small text-muted mb-4">Document Verification Image</h6>
                        <div className="image-container">
                          <img
                            src={item.imgpath ? `http://localhost:8000/uploads/AccountActive/${item.imgpath}` : 'https://via.placeholder.com/200'}
                            alt="User Profile"
                            style={{ maxWidth: '50%', height: 'auto' }}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Admin Feedback</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="heading">Heading</label>
                          <Input
                            className="form-control-alternative"
                            id="heading"
                            type="text"
                            value={formData.heading}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <label>Feedback</label>
                      <Input
                        className="form-control-alternative"
                        id="feedback"
                        placeholder="A few words about you ..."
                        rows="4"
                        value={formData.feedback}
                        type="textarea"
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </div>
                  <Button color="primary" type="submit">Submit Feedback</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ActiveAccountListView;
