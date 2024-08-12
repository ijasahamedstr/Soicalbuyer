import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [userdata, setUserData] = useState([]);

    const handlegetUserdata = async () => {
        const response = await axios.get("http://localhost:8000/user/api/getUser").then((res) => res).catch((error) => error);
     

        if (response.status === 200) {
            setUserData(response.data)
        }
    }

    useEffect(() => {
        handlegetUserdata()
    }, [])
    return (
        <>
            <Container>
                <h1 className='text-center'>User Data</h1>
                <Link to="/register" className="text-light text-decoration-none">Register</Link>
                <div className='d-flex justify-content-between flex-wrap'>
                    {
                        userdata.length > 0 && userdata.map((element) => {
                            return (
                                <>
                                    <Card style={{ width: "20rem", marginBottom: "5px" }}>
                                        <Card.Body>
                                            <Card.Title style={{ fontWeight: "bold" }}>{element.username}</Card.Title>
                                        </Card.Body>
                                        <div className='d-flex justify-content-start p-3'>
                                            {
                                                element.userprofile.length > 0 && element.userprofile.map((ele) => {
                                                    return (
                                                        <>
                                                            <Card.Img style={{ width: "50px", height: "50px", borderRadius: "50%", marginTop: "3px" }} src={`http://localhost:4006/uploads/${ele}`} />
                                                        </>
                                                    )
                                                })
                                            }
                                        </div>
                                    </Card>
                                </>
                            )
                        })
                    }

                </div>
            </Container>
        </>
    )

}

export default Dashboard