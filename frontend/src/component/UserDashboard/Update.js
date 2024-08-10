import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';  // Import SweetAlert2

const Update = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedFname, setUpdatedFname] = useState('');
  const [updatedFile, setUpdatedFile] = useState(null);

  // Fetch user data
  const getUserData = async () => {
    try {
      const res = await axios.get('http://localhost:8000/imageupload', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.data.status === 401 || !res.data) {
        console.error('Error fetching user data');
      } else {
        setData(res.data.getUser);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Delete user data
  const dltUser = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/imageupload/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.data.status === 401 || !res.data) {
        console.error('Error deleting user');
      } else {
        getUserData(); // Refresh data after deletion
        setShow(true);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Update user data
  const updateUserData = async () => {
    if (!selectedUser) return;

    try {
      const formData = new FormData();
      formData.append('fname', updatedFname);
      if (updatedFile) {
        formData.append('photo', updatedFile);
      }

      const res = await axios.put(`http://localhost:8000/imageupload/${selectedUser._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.status === 401 || !res.data) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error occurred while uploading data!',
          });
      } else {
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'User data uploaded successfully.',
          });
        getUserData(); // Refresh data after update
        setShowUpdateModal(false);
        setShow(true);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      {show && (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          Action completed
        </Alert>
      )}

      <div className="container mt-2">
        <h1 className="text-center mt-2">MERN Image Upload Projects</h1>
        <div className="text-end">
          <Button variant="primary">
            <NavLink to="/register" className="text-decoration-none text-light">
              Add User
            </NavLink>
          </Button>
        </div>

        <div className="row d-flex justify-content-between align-items-center mt-5">
          {data.length > 0 ? (
            data.map((el) => (
              <Card key={el._id} style={{ width: '22rem', height: '18rem' }} className="mb-3">
                <Card.Img
                  variant="top"
                  style={{ width: '100px', textAlign: 'center', margin: 'auto' }}
                  src={`/uploads/${el.imgpath}`}
                  className="mt-2"
                />
                <Card.Body className="text-center">
                  <Card.Title>User Name : {el.fname}</Card.Title>
                  <Card.Text>Date Added : {moment(el.date).format('L')}</Card.Text>
                  <Button
                    variant="danger"
                    className="col-lg-6 text-center"
                    onClick={() => dltUser(el._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="info"
                    className="col-lg-6 text-center mt-2"
                    onClick={() => {
                      setSelectedUser(el);
                      setUpdatedFname(el.fname);
                      setShowUpdateModal(true);
                    }}
                  >
                    Update
                  </Button>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </div>
      </div>

      {/* Update Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>UserName</Form.Label>
              <Form.Control
                type="text"
                value={updatedFname}
                onChange={(e) => setUpdatedFname(e.target.value)}
                placeholder="Enter new username"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Select Your Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setUpdatedFile(e.target.files[0])}
                placeholder=""
              />
            </Form.Group>
            <Button variant="primary" onClick={updateUserData}>
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Update;
