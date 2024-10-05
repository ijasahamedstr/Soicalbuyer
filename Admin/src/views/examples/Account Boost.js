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
  import Header from "components/Headers/Header.js";
  import { useEffect, useState } from "react";
  import axios from 'axios';
  import { Link } from 'react-router-dom';
  
  const AccountBoost = () => {
    const [accountUser, setAccountUser] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchAccountData = async () => {
        try {
          const response = await axios.get('http://localhost:8000/boost');
          setAccountUser(response.data);
        } catch (err) {
          console.error('Error fetching account data: ', err);
          setError('Failed to fetch account data.');
        }
      };
      fetchAccountData();
    }, []);
  
    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          setLoading(true);
          const response = await axios.get('http://localhost:8000/register');
          setUserInfo(response.data);
        } catch (err) {
          console.error('Error fetching user info:', err);
          setError('Failed to fetch user info.');
        } finally {
          setLoading(false);
        }
      };
      fetchUserInfo();
    }, []);
  
    const truncateText = (text, maxLength) => {
      if (typeof text !== 'string') return '';
      return text.length <= maxLength ? text : `${text.substring(0, maxLength)}...`;
    };
  
    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <div className="col">
              <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                  <h3 className="text-white mb-0">Service Requests</h3>
                </CardHeader>
                {loading ? (
                  <div>Loading...</div>
                ) : error ? (
                  <div>{error}</div>
                ) : (
                  <Table className="align-items-center table-dark table-flush" responsive>
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">Service Request UserName</th>
                        <th scope="col">Service Request Name</th>
                        <th scope="col">Service Request total</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(accountUser) && accountUser.map(item => {
                        const user = userInfo.find(user => user._id === item.userid);
                        return (
                          <tr key={item._id}>
                            <th scope="row">
                              <Media className="align-items-center">
                                <Media>
                                  <span className="mb-0 text-sm">
                                    {user ? user.username : "Unknown User"}
                                  </span>
                                </Media>
                              </Media>
                            </th>
                            <td> {user ? user.displayName : "Unknown User"}</td>
                            <td>
                              <Badge color="" className="badge-dot mr-4">
                                <i className="bg-warning" />
                               {item.documentnumber}
                              </Badge>
                            </td>
                            <td className="text-right">
                              <Button color="success" size="sm" to={`/admin/servicerequestView/${item._id}`} tag={Link}>
                                View More
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                )}
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  };
  
  export default AccountBoost;
  