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

const ServiceView = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    heading: '',
    feedback: ''
  });
  const [fetchedItem, setFetchedItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://localhost:8000/service/${id}`);
        if (!response.ok) throw new Error('Unable to fetch data');
        const data = await response.json();
        setItem(data);
        setFetchedItem(data); // Store the fetched item for additional fields
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
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
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
          userid: item?._id // Send user ID along with feedback if item exists
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
                    <h3 className="mb-0">Service Information Details</h3>
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
                          <label className="form-control-label" htmlFor="input-fname">Service Heading</label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={item.service_heading}
                            id="input-fname"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-mname">Service Type</label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={item.service_type}
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
                          <label className="form-control-label" htmlFor="input-lname">Service Amount</label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={item.service_Amount}
                            id="input-lname"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-country">Service Time Hour</label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={item.service_time_houre}
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
                          <label className="form-control-label" htmlFor="input-doc-type">Service Buy Amount</label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={item.service_buy_Amount}
                            id="input-doc-type"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-doc-number">Service Status</label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={item.service_Staus}
                            id="input-doc-number"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Add Paid Options */}
                  <h6 className="heading-small text-muted mb-4">Add Paid Options</h6>
                  <div className="pl-lg-4">
                    {Array.isArray(fetchedItem?.additionalFields1) && fetchedItem.additionalFields1.length > 0 && (
                      <>
                        {fetchedItem.additionalFields1.map((field, index) => (
                          <FormGroup key={index} className="mb-3" controlId={`formGridField${index}`}>
                            <label>{field.title}</label><br />
                            <label>{field.documentType}</label>
                          </FormGroup>
                        ))}
                      </>
                    )}
                  </div>
                  <hr className="my-4" />
                  {/* Description / Additional Options */}
                  <h6 className="heading-small text-muted mb-4">Additional Options</h6>
                  <div className="pl-lg-4">
                    {Array.isArray(fetchedItem?.additionalFields) && fetchedItem.additionalFields.map((field, index) => (
                      <FormGroup key={index} className="mb-3" controlId={`formGridAddress${index}`} style={{ width: '100%' }}>
                        <label>{field.title}</label>
                        <Input
                          type="select"
                          name={`documentCountry${index}`}
                          onChange={handleChange}
                          className='sign__input'
                        >
                          {Array.isArray(field.fields) && field.fields.length > 0 ? (
                            field.fields.map((optionField, i) => (
                              <option value={optionField.value} key={i}>
                                {optionField.title} + {optionField.amount}
                              </option>
                            ))
                          ) : (
                            <option disabled>No additional fields available</option>
                          )}
                        </Input>
                      </FormGroup>
                    ))}
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

export default ServiceView;
