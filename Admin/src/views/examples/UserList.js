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
  import {Link} from "react-router-dom";
  // core components
  import Header from "components/Headers/Header.js";

  import axios from "axios";
  import { useEffect,useState } from "react";

  
  
  const UserList = ({ isAccountActive = false }) => {

    const [AccountUser,setAccountUser] = useState({});

    useEffect(() => {
      const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8000/register');
            setAccountUser(response.data);
          } catch (error) {
              console.error('Error fetching data: ', error);
          }
      };

      fetchData();
  }, []); // Empty dependency array to run once on component mount
    
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
                  <h3 className="text-white mb-0"> User Accounts</h3>
                </CardHeader>
                <Table
                  className="align-items-center table-dark table-flush"
                  responsive
                >
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
                  {Array.isArray(AccountUser) && AccountUser.map(item => (
                     <tr key={item.id} >
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
                     {isAccountActive ? 
   
                     <Button
                     color="success"
                     href="#pablo"
                     onClick={(e) => e.preventDefault()}
                     size="sm"
                     >
                     Active
                     </Button>
   
                     :
                     <Button
                     color="danger"
                     href="#pablo"
                     onClick={(e) => e.preventDefault()}
                     size="sm"
                     >
                     Deactivate
                     </Button>
   
                     }
   
                     </td>
                     <td className="text-right">
                       <UncontrolledDropdown>
                         <DropdownToggle
                           className="btn-icon-only text-light"
                           href="#pablo"
                           role="button"
                           size="sm"
                           color=""
                           onClick={(e) => e.preventDefault()}
                         >
                           <i className="fas fa-ellipsis-v" />
                         </DropdownToggle>
                         <DropdownMenu className="dropdown-menu-arrow" right>
                         <Link to="/admin/View-Profile">
                         <DropdownItem
                             href="#pablo"
                             onClick={(e) => e.preventDefault()}
                             to="/admin/View-Profile" tag={Link}
                           >
                             View Profile
                           </DropdownItem>
                         </Link>
                           {isAccountActive ? 
                           
                           <DropdownItem
                           href="#pablo"
                           onClick={(e) => e.preventDefault()}
                         >
                           Deactivate Account
                         </DropdownItem>
                           
                           :
                           
                           <DropdownItem
                           href="#pablo"
                           onClick={(e) => e.preventDefault()}
                         >
                           Active Acoount
                         </DropdownItem>
                           
                           
                           }
                         </DropdownMenu>
                       </UncontrolledDropdown>
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
  