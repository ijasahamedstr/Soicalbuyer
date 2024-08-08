import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Alert from 'react-bootstrap/Alert';

const Home = () => {

    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);

    const getUserData = async () => {
        try {
            const res = await axios.get("/getdata", {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (res.data.status !== 401 && res.data) {
                setData(res.data.getUser);
            } else {
                console.error("Error fetching data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const dltUser = async (id) => {
        try {
            const res = await axios.delete(`/${id}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (res.data.status !== 401 && res.data) {
                getUserData();
                setShow(true);
            } else {
                console.error("Error deleting user");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <>
            {show && 
                <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                    User Deleted
                </Alert>
            }
            <div className='container mt-2'>
                <h1 className='text-center mt-2'>MERN Image Upload Projects</h1>
                <NavLink to="/register" className="text-decoration-none text-light mx-2">Register</NavLink>
                <div className='text-end'>
                    <Button variant="primary">
                        <NavLink to="/register" className="text-decoration-none text-light">Add User</NavLink>
                    </Button>
                </div>

                <div className='row d-flex justify-content-between align-items-center mt-5'>
                    {data.length > 0 ? data.map((el) => (
                        <Card key={el._id} style={{ width: '22rem', height: "18rem" }} className="mb-3">
                            <Card.Img variant="top" style={{ width: "100px", textAlign: "center", margin: "auto" }} src={`/uploads/${el.imgpath}`} className='mt-2' />
                            <Card.Body className='text-center'>
                                <Card.Title>User Name : {el.fname}</Card.Title>
                                <Card.Text>
                                    Date Added : {moment(el.date).format("L")}
                                </Card.Text>
                                <Button variant="danger" className='col-lg-6 text-center' onClick={() => dltUser(el._id)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    )) : <p>No users found</p>}
                </div>
            </div>
        </>
    );
}

export default Home;
