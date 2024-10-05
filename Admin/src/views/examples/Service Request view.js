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
import axios from 'axios';

const ServiceRequestview = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://localhost:8000/servicerequest/${id}`);
        if (!response.ok) throw new Error('Unable to fetch service request data');
        const data = await response.json();
        setItem(data);
      } catch (error) {
        setError('Error fetching service request data. Please try again later.');
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8000/register');
        setUserInfo(response.data);
      } catch (err) {
        console.error('Error fetching user info:', err);
        setError('Failed to fetch user info.');
      }
    };

    fetchItem();
    fetchUserInfo();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!item) {
    return <div>Item not found</div>;
  }

  // Find the associated user info for the current service request
  const user = userInfo.find(user => user._id === item.userid);

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
                    <h3 className="mb-0">Service Request</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button color="primary" size="sm">Settings</Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">User Information</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-fname">Service Request Name</label>
                          <Input
                            className="form-control-alternative"
                            id="input-fname"
                            type="text"
                            defaultValue={user ? user.displayName : ''}
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-mname">Service Request UserName</label>
                          <Input
                            className="form-control-alternative"
                            id="input-mname"
                            type="text"
                            defaultValue={user ? user.username: ''}
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-lname">Service Request total</label>
                          <Input
                            className="form-control-alternative"
                            id="input-lname"
                            type="text"
                            defaultValue={item.documentnumber}
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                    {Array.isArray(fetchedItem?.additionalFields) && fetchedItem.additionalFields.length > 0 && (
                          <>
                            <h3 style={{ marginBottom: '30px', color: 'rgb(97, 100, 255)', fontSize: '23px', textAlign: 'center' }}>
                              خيارات إضافية مدفوعة
                            </h3>
                            <p>
                              العروض مستمرة الى نهاية الشهر 😍 لا تشمل عروض الاضعاف ، لا تشمل عرض دبل المتابعين ، لا تشمل عرض زيادة المتابعين
                            </p>
                            {fetchedItem.additionalFields.map((field, index) => (
                              <Form.Group key={index} className="mb-3" controlId={`formGridAddress${index}`} style={{ width: '100%' }}>
                                <Form.Label>{field.documentcountry0}</Form.Label>
                                <Form.Select
                                  aria-label="Default select example"
                                  className='sign__input'
                                  name={`documentcountry${index}`}
                                  onChange={handleChange}
                                >
                                  {Array.isArray(field?.fields) && field.fields.length > 0 ? (
                                    field.fields.map((optionField, i) => (
                                      <option value={optionField.value} key={i}>{optionField.documentcountry0} + {optionField.amount}</option>
                                    ))
                                  ) : (
                                    <option disabled>No additional fields available</option>
                                  )}
                                </Form.Select>
                              </Form.Group>
                            ))}
                          </>
                        )}
                    </Row>
                    <Row>
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
