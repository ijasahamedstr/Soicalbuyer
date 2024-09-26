import React, { useEffect, useState } from "react";
import {
    Badge,
    Button,
    Card,
    CardHeader,
    Media,
    Table,
    Container,
    Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import Header from "components/Headers/Header.js";
import axios from "axios";

const ActiveAccountList = () => {
    const [accountUsers, setAccountUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/Accountactive');
                setAccountUsers(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
                setError('Failed to fetch accounts');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row className="mt-5">
                    <div className="col">
                        <Card className="bg-default shadow">
                            <CardHeader className="bg-transparent border-0">
                                <h3 className="text-white mb-0">User Accounts Active Request</h3>
                            </CardHeader>
                            <Table className="align-items-center table-dark table-flush" responsive>
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Full Name</th>
                                        <th scope="col">Document country</th>
                                        <th scope="col">Document Type</th>
                                        <th scope="col">Document Number</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(accountUsers.getUser) && accountUsers.getUser.map(item => (
                                        <tr key={item._id}>
                                            <th scope="row">
                                                <Media className="align-items-center">
                                                    <Media>
                                                        <span className="mb-0 text-sm">{item.fname}</span>
                                                    </Media>
                                                </Media>
                                            </th>
                                            <td>{item.documentcountry}</td>
                                            <td>
                                                <Badge color="" className="badge-dot mr-4">
                                                    <i className="bg-warning" />
                                                    {item.documenttype}
                                                </Badge>
                                            </td>
                                            <td>{item.documentnumber}</td>
                                            <td>
                                                <Button
                                                    color={item.documentationstatus === 'verified' ? "success" : "danger"}
                                                    href="#pablo"
                                                    onClick={(e) => e.preventDefault()}
                                                    size="sm"
                                                >
                                                    {item.documentationstatus === 'verified' ? 'Verified' : 'Not Verified'}
                                                </Button>
                                            </td>
                                            <td>
                                                <Button color="success" size="sm" to={`/admin/ActiveAccountList/${item._id}`} tag={Link}>
                                                    View More
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default ActiveAccountList;
