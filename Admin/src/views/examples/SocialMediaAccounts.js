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


const SocialMediaAccounts = ({ isAccountActive = false }) => {
  const [accountUser, setAccountUser] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/soical'); // Fixed typo in endpoint
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

  const user = userInfo.find((user) => user._id === accountUser.userid);

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Social Media Accounts</h3>
              </CardHeader>
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>{error}</div>
              ) : (
                <Table className="align-items-center table-dark table-flush" responsive>
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Account UserName</th>
                      <th scope="col">Account Type</th>
                      <th scope="col">Account Description</th>
                      <th scope="col">Social Amount</th>
                      <th scope="col">Social Check Code</th>
                      <th scope="col">Promotional Title</th>
                      <th scope="col">Discount</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(accountUser) && accountUser.map(item => (
                      <tr key={item._id}>
                        <th scope="row">
                          <Media className="align-items-center">
                            <a className="avatar rounded-circle mr-3" href="#pablo" onClick={(e) => e.preventDefault()}>
                              {user && (
                                <img
                                  alt="User Avatar"
                                  src={`http://localhost:8000/uploads/${user.imgpath || "https://usr.dokan-cdn.com/img/avatars/default.jpg"}`}
                                  onError={(e) => {
                                    e.target.onerror = null; // prevents looping
                                    e.target.src = "https://usr.dokan-cdn.com/img/avatars/default.jpg"; // fallback image
                                  }}
                                />
                              )}
                            </a>
                            <Media>
                              <span className="mb-0 text-sm">
                                {item.social_username}
                              </span>
                            </Media>
                          </Media>
                        </th>
                        <td>{item.social_type}</td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <i className="bg-warning" />
                            {truncateText(item.social_dec, 50)}
                          </Badge>
                        </td>
                        <td>{item.social_amount}</td>
                        <td>{item.social_code}</td>
                        <td>{item.Promotional_Title}</td>
                        <td>{item.discount}</td>
                        <td className="text-right">

                            <Button color="success" size="sm"  to={`/admin/soicalAccountView/${item._id}`} tag={Link}>
                              View More
                            </Button>

                        </td>
                      </tr>
                    ))}
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

export default SocialMediaAccounts;
