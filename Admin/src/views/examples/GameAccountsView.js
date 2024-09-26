import React, { useEffect, useState } from "react";
import { Image } from 'antd';
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

const GameAccountsView = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://localhost:8000/gameaccount/${id}`);
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
                    <h3 className="mb-0">Social Media Information</h3>
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
                          <label className="form-control-label" htmlFor="input-fname">Game Username</label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={item.gameid}
                            id="input-fname"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-mname">Game Name</label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={item.gamename}
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
                          <label className="form-control-label" htmlFor="input-lname">Game Type</label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={item.gametype}
                            id="input-lname"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-country">Game Gmail</label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={item.gamegmail}
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
                          <label className="form-control-label" htmlFor="input-doc-type">Game Amount</label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={item.gameAmount}
                            id="input-fname"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-doc-number">Game Title</label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={item.gametitle}
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
                          <label className="form-control-label" htmlFor="input-doc-type">Game Description</label>
                          <Input
                            className="form-control-alternative"
                            id="feedback"
                            placeholder="A few words about you ..."
                            rows="4"
                            type="textarea"
                            defaultValue={item.gamedec}
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Social Media Account Username & Password Information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-city">Game Account Password</label>
                          <Input
                            className="form-control-alternative"
                            id="input-city"
                            defaultValue={item.gamepassword}
                            type="password"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-country">Game Value</label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={item.gamevalue}
                            id="input-country"
                            placeholder="Value"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">User Feedback</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Feedback</label>
                      <Input
                        className="form-control-alternative"
                        id="feedback"
                        placeholder="A few words about you ..."
                        rows="4"
                        type="textarea"
                        defaultValue={item.gamepurchasedec}
                        readOnly
                      />
                    </FormGroup>
                    <Row>
                      {item.userprofile && item.userprofile.length > 0 ? (
                        item.userprofile.map((profile, index) => (
                          <Col key={index} lg="3">
                            <Image
                              width={200}
                              src={`http://localhost:8000/useruploads/${profile}`}
                              alt={`User Profile ${index}`}
                              placeholder={<Image src="https://via.placeholder.com/200" />} // Placeholder while loading
                              onError={(e) => (e.target.src = 'https://via.placeholder.com/200')} // Placeholder on error
                            />
                          </Col>
                        ))
                      ) : (
                        <Col lg="3">
                          <Image
                            width={200}
                            src="https://via.placeholder.com/200" // Placeholder image URL
                            alt="No images available"
                          />
                        </Col>
                      )}
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

export default GameAccountsView;
