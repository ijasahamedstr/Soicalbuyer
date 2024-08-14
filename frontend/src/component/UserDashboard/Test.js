import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Swal from 'sweetalert2';

const Dashboard = () => {
    const [userdata, setUserData] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [updatedUsername, setUpdatedUsername] = useState('');
    const [updatedFiles, setUpdatedFiles] = useState([]);

    // Fetch user data
    const handlegetUserdata = async () => {
        try {
            const response = await axios.get("http://localhost:8000/user/api/getUser");
            if (response.status === 200) {
                setUserData(response.data);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    // Update user data
    const updateUserData = async () => {
        if (!selectedUser) return;

        try {
            const formData = new FormData();
            formData.append('username', updatedUsername);
            for (let i = 0; i < updatedFiles.length; i++) {
                formData.append('photos', updatedFiles[i]);
            }

            const res = await axios.put(`http://localhost:8000/user/api/${selectedUser._id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (res.data.status === 401 || !res.data) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error occurred while updating data!',
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'User data updated successfully.',
                });
                handlegetUserdata(); // Refresh data after update
                setShowUpdateModal(false);
            }
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    useEffect(() => {
        handlegetUserdata();
    }, []);

    return (
        <>
            <Container>
                <h1 className='text-center'>User Data</h1>
                <div className='d-flex justify-content-between flex-wrap'>
                    {userdata.length > 0 && userdata.map((element) => (
                        <Card key={element._id} style={{ width: "20rem", marginBottom: "5px" }}>
                            <Card.Body>
                                <Card.Title style={{ fontWeight: "bold" }}>{element.username}</Card.Title>
                                <Button
                                    variant="info"
                                    className="col-lg-6 text-center mt-2"
                                    onClick={() => {
                                        setSelectedUser(element);
                                        setUpdatedUsername(element.username);
                                        setUpdatedFiles([]); // Clear file input
                                        setShowUpdateModal(true);
                                    }}
                                >
                                    Update
                                </Button>
                            </Card.Body>
                            <div className='d-flex justify-content-start p-3'>
                                {element.userprofile.length > 0 && element.userprofile.map((ele) => (
                                    <Card.Img
                                        key={ele}
                                        style={{ width: "50px", height: "50px", borderRadius: "50%", marginTop: "3px" }}
                                        src={`http://localhost:8000/uploads/${ele}`}
                                    />
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            </Container>

            {/* Update Modal */}
            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => { e.preventDefault(); updateUserData(); }}>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={updatedUsername}
                                onChange={(e) => setUpdatedUsername(e.target.value)}
                                placeholder="Enter new username"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formFiles">
                            <Form.Label>Upload Images</Form.Label>
                            <Form.Control
                                type="file"
                                multiple
                                onChange={(e) => setUpdatedFiles([...e.target.files])}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Dashboard;
