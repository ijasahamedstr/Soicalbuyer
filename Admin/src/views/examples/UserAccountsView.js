import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
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

const UserAccountsView = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`http://localhost:8000/register/${id}`);
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

    const deleteAccount = async (id) => {
        const response = await fetch(`http://localhost:8000/register/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete account');
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <UserHeader />
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                        <Card className="card-profile shadow">
                            <Row className="justify-content-center">
                                <Col className="order-lg-2" lg="3">
                                    <div className="card-profile-image">
                                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                            <img
                                                alt="Profile"
                                                className="rounded-circle"
                                                src={`http://localhost:8000/uploads/${item.imgpath || "https://usr.dokan-cdn.com/img/avatars/default.jpg"}`}
                                            />
                                        </a>
                                    </div>
                                </Col>
                            </Row>
                            <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                <div className="d-flex justify-content-between">
                                    <Button className="mr-4" color="info" size="sm">Connect</Button>
                                    <Button className="float-right" color="default" size="sm">Message</Button>
                                </div>
                            </CardHeader>
                            <CardBody className="pt-0 pt-md-4">
                                <Row>
                                    <div className="col">
                                        <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                                            <div>
                                                <span className="heading">22</span>
                                                <span className="description">Sale</span>
                                            </div>
                                            <div>
                                                <span className="heading">10</span>
                                                <span className="description">Post</span>
                                            </div>
                                            <div>
                                                <span className="heading">89</span>
                                                <span className="description">Comments</span>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                                <div className="text-center">
                                    <h3>{item.displayName}</h3>
                                    <div className="h5 mt-4">
                                        <i className="ni business_briefcase-24 mr-2" />
                                        Technical Support Code
                                    </div>
                                    <div>
                                        <i className="ni education_hat mr-2" />
                                        {item.supportcode}
                                    </div>
                                    <hr className="my-4" />
                                    <p>{item.bio}</p>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    
                    <Col className="order-xl-1" xl="8">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8"><h3 className="mb-0">My account</h3></Col>
                                    <Col className="text-right" xs="4">
                                        <Button 
                                            color="danger" 
                                            size="sm" 
                                            onClick={async () => {
                                                const result = await Swal.fire({
                                                    title: 'Are you sure?',
                                                    text: "You won't be able to revert this!",
                                                    icon: 'warning',
                                                    showCancelButton: true,
                                                    confirmButtonColor: '#d33',
                                                    cancelButtonColor: '#3085d6',
                                                    confirmButtonText: 'Yes, delete it!',
                                                });

                                                if (result.isConfirmed) {
                                                    try {
                                                        await deleteAccount(id);
                                                        Swal.fire('Deleted!', 'Your account has been deleted.', 'success');
                                                    } catch (error) {
                                                        Swal.fire('Error!', 'There was an error deleting the account.', 'error');
                                                    }
                                                }
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <h6 className="heading-small text-muted mb-4">User information</h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label htmlFor="input-username">Username</label>
                                                    <Input id="input-username" placeholder="Username" type="text" defaultValue={item.username} readOnly />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label htmlFor="input-email">Email address</label>
                                                    <Input id="input-email" placeholder="jesse@example.com" type="email" defaultValue={item.email} readOnly />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label htmlFor="input-phone">Phone No</label>
                                                    <Input id="input-phone" placeholder="Phone No" type="text" defaultValue={item.Phone} readOnly />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label htmlFor="input-status">Account Status</label>
                                                    <Input id="input-status" placeholder="Account Status" type="text" defaultValue={item.Accountstatus} readOnly />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label htmlFor="input-balance">Current Balance</label>
                                                    <Input id="input-balance" placeholder="Current Balance" type="text" defaultValue={item.currentbalance} readOnly />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label htmlFor="input-package">Package Type</label>
                                                    <Input id="input-package" placeholder="Package Type" type="text" defaultValue={item.packagetype} readOnly />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className="my-4" />
                                    <h6 className="heading-small text-muted mb-4">About me</h6>
                                    <div className="pl-lg-4">
                                        <FormGroup>
                                            <label>About Me</label>
                                            <Input placeholder="A few words about you ..." rows="4" type="textarea" defaultValue={item.bio} readOnly />
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

export default UserAccountsView;
