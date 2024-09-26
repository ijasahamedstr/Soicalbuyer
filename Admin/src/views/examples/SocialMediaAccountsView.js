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

const SocialMediaAccountsView = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://localhost:8000/soical/${id}`);
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
                    <h3 className="mb-0">Soical Media Information</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button color="primary" size="sm">Settings</Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={(e) => e.preventDefault()}>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-fname">Social Username</label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={item.social_username}
                            id="input-fname"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-mname">Social Platform</label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={item.social_type}
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
                          <label className="form-control-label" htmlFor="input-lname">Social Amount</label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={item.social_amount}
                            id="input-lname"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-country">Social Code</label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={item.social_code}
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
                          <label className="form-control-label" htmlFor="input-doc-type">Promotional Title</label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={item.Promotional_Title}
                            id="input-fname"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-doc-number">Promotional discount</label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={item.discount}
                            id="input-doc-number"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-doc-type">Social description</label>
                          <Input
                            className="form-control-alternative"
                            id="feedback"
                            placeholder="A few words about you ..."
                            rows="4"
                            type="textarea"
                            defaultValue={item.social_dec}
                            readOnly
                        />
                        </FormGroup>
                      </Col>
                    </Row>
                    
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Soical Media Account username & Password Information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                             Game Account Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-city"
                              defaultValue={item.accountpassword}
                              type="password"
                              readOnly
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Account gmail
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={item.accountgmail}
                              id="input-country"
                              placeholder="Country"
                              type="text"
                              readOnly
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Gmail Account Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-postal-code"
                              placeholder="Postal code"
                              defaultValue={item.accountgmailpassword}
                              type="password"
                              readOnly
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Admin Feedback</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Feedback</label>
                      <Input
                        className="form-control-alternative"
                        id="feedback"
                        placeholder="A few words about you ..."
                        rows="4"
                        type="textarea"
                        defaultValue={item.accountdec}
                      />
                    </FormGroup>
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

export default SocialMediaAccountsView;
