/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import {
    Badge,
    Button,
    Card,
    CardHeader,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Table,
    Container,
    Row,
  } from "reactstrap";
  // core components
  import Header from "components/Headers/Header.js";
  import { useEffect,useState } from "react";
  import axios from 'axios';

  const SocialMediaAccounts = ({ isAccountActive = false }) => {
    const [AccountUser,setAccountUser] = useState({});

    useEffect(() => {
      const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8000/soical');
            setAccountUser(response.data);
          } catch (error) {
              console.error('Error fetching data: ', error);
          }
      };

      fetchData();
  }, []); 

  const truncateText = (text, maxLength) => {
    if (typeof text !== 'string') return '';
    return text.length <= maxLength ? text : `${text.substring(0, maxLength)}...`;
  };

    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          {/* Dark table */}
          <Row className="mt-5">
            <div className="col">
              <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                  <h3 className="text-white mb-0">Social Media Accounts</h3>
                </CardHeader>
                <Table
                  className="align-items-center table-dark table-flush"
                  responsive
                >
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Account UserName</th>
                      <th scope="col">Account Type</th>
                      <th scope="col">Account description</th>
                      <th scope="col">social Amount</th>
                      <th scope="col">social Check code</th>
                      <th scope="col">Promotional_Title</th>
                      <th scope="col">discount</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {Array.isArray(AccountUser) && AccountUser.map(item => (
                    <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("../../assets/img/theme/bootstrap.jpg")}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                              {item.social_username}
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td> {item.social_type}</td>
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
                      <Button
                        color="success"
                        href="#pablo"
                        size="sm"
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
  
  export default SocialMediaAccounts;
  