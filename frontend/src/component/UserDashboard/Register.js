import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Register = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(false); // Flag to check if it's edit mode
  const [user, setUser] = useState(null); // Store user data for editing

  const navigate = useNavigate();
  const { id } = useParams(); // Get user ID from URL params

  // Fetch user data if editing
  useEffect(() => {
    if (id) {
      setIsEdit(true);
      axios.get(`http://localhost:8000/getdata/${id}`)
        .then(res => {
          setUser(res.data.getUser);
        })
        .catch(error => {
          setError("Error fetching user data.");
          console.error("Error:", error);
        });
    }
  }, [id]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };

    try {
      let response;
      if (isEdit) {
        response = await axios.put(`http://localhost:8000/${id}`, formData, config);
      } else {
        response = await axios.post("http://localhost:8000/register", formData, config);
      }

      if (response.status === 401) {
        setError("Unauthorized access.");
      } else if (!response.data) {
        setError("Unexpected response format.");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError("An unexpected error occurred.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-3">
      <h1>{isEdit ? "Update Your Image Here" : "Upload Your Image Here"}</h1>
      {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}

      <Form className='mt-3' onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formFile">
          <Form.Label>Select Your Image</Form.Label>
          <Form.Control
            type="file"
            onChange={handleFileChange}
            name='photo'
            placeholder=""
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {isEdit ? "Update" : "Submit"}
        </Button>
      </Form>
    </div>
  );
};

export default Register;
