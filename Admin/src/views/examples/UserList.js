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
import { useEffect, useState } from "react";

const UserList = ({ isAccountActive = false }) => {
  const [accountUsers, setAccountUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state
  const [newDataAvailable, setNewDataAvailable] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading state to true before fetching
      try {
        const response = await axios.get('http://localhost:8000/register');
        setAccountUsers(response.data);
        setNewDataAvailable(true);
        setTimeout(() => setNewDataAvailable(false), 3000);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setError('Error fetching user accounts. Please try again later.');
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };

    fetchData();
  }, []);

  const renderStatusButton = (status) => {
    return status === 'verified' ? (
      <Button color="success" size="sm" onClick={(e) => e.preventDefault()}>
        Verified
      </Button>
    ) : (
      <Button color="danger" size="sm" onClick={(e) => e.preventDefault()}>
        Not Verified
      </Button>
    );
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state message
  }

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        {error && <div className="alert alert-danger">{error}</div>}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">User Accounts</h3>
              </CardHeader>
              <Table className="align-items-center table-dark table-flush" responsive>
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Full Name</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone No</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {accountUsers.map(item => (
                    <tr key={item._id}>
                      <th scope="row">
                        <Media className="align-items-center">
                          {item.displayName}
                          <Media>
                            <span className="mb-0 text-sm">
                              {item.name}
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>{item.username}</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i className="bg-warning" />
                          {item.email}
                        </Badge>
                      </td>
                      <td>{item.Phone}</td>
                      <td>
                        {renderStatusButton(item.documentationstatus)}
                      </td>
                      <td>
                        <Button 
                          color="success" 
                          size="sm" 
                          to={`/admin/user/${item._id}`} 
                          tag={Link}
                          className={newDataAvailable ? 'blink' : ''}
                        >
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

export default UserList;
