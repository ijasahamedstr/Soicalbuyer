import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';  // Import SweetAlert2

const Register = () => {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [file, setFile] = useState("");
  const history = useNavigate();

  // Handle changes for first name
  const handleFNameChange = (e) => {
    setFName(e.target.value);
  };

  // Handle changes for document type
  const handleLNameChange = (e) => {
    setLName(e.target.value);
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("fname", fname);
    formData.append("lname", lname);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };

    try {
      const res = await axios.post("http://localhost:8000/imageupload", formData, config);
      
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
        history("/");
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error occurred while uploading data!',
      });
    }
  };

  return (
    <>
      <div className="container mt-3">
        <h1>Upload Your Img Here</h1>

        <Form className='mt-3' onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>UserName</Form.Label>
            <Form.Control type="text" name='fname' value={fname} onChange={handleFNameChange} placeholder="" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Document Type</Form.Label>
            <Form.Select aria-label="Default select example" className='sign__input' value={lname} onChange={handleLNameChange}>
              <option value="">Select document type</option>
              <option value="passport">Passport</option>
              <option value="id">ID Card</option>
              <option value="driving_license">Driving License</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Select Your Image</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} name='photo' placeholder="" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Register;
