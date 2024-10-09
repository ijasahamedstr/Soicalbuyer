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
    const [selectedUser, setSelectedUser] = useState(null);
    const [updatedUsername, setUpdatedUsername] = useState('');
    const [updatedFiles, setUpdatedFiles] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fetch all users data
    const fetchAllUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/user/api/getUser`);
            if (response.status === 200) {
                setUserData(response.data);
            } else {
                throw new Error(`Unexpected status code: ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error fetching user data!',
            });
        } finally {
            setLoading(false);
        }
    };

    // Update user data
    const updateUserData = async () => {
        if (!selectedUser) return;
    
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('username', updatedUsername);
            updatedFiles.forEach(file => formData.append('photos', file)); // Correctly append files
    
            const response = await axios.put(
                `${process.env.REACT_APP_API_HOST}/user/api/${selectedUser._id}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'User data updated successfully.',
                });
                fetchAllUsers(); // Refresh data after update
                setShowUpdateModal(false); // Close the update modal
                setUpdatedUsername(''); // Clear form fields
                setUpdatedFiles([]);
            } else {
                throw new Error('Update failed');
            }
        } catch (error) {
            console.error('Error updating user data:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error occurred while updating data!',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllUsers(); // Fetch all users on component mount
    }, []);

    const handleFileChange = (event) => {
        setUpdatedFiles(Array.from(event.target.files));
    };

    return (
        <>
            <Container>
                <h1 className='text-center'>User Data</h1>
                {loading ? (
                    <div className='text-center'>Loading...</div>
                ) : (
                    <div className='d-flex justify-content-between flex-wrap'>
                        {userdata.length > 0 ? (
                            userdata.map((element) => (
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
                                                src={`${process.env.REACT_APP_API_HOST}/uploads/${ele}`}
                                            />
                                        ))}
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <div className='text-center'>No user data available</div>
                        )}
                    </div>
                )}
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
                                onChange={handleFileChange}
                            />
                            {updatedFiles.length > 0 && (
                                <div className="mt-2">
                                    <p><strong>Selected Files:</strong></p>
                                    <ul>
                                        {updatedFiles.map((file, index) => (
                                            <li key={index}>{file.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Dashboard;
