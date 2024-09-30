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

const ServiceRequestview = () => {
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
        const response = await fetch(`http://localhost:8000/servicerequest/${id}`);
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
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ServiceRequestview;
