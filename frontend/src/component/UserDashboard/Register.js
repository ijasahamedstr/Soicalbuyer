import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import axios from "axios"
import toast from "react-hot-toast"


const Register = () => {
  const [username, setUserName] = useState("");
  const [files, setFiles] = useState([]);

  const handleChange = (event) => {
      setUserName(event.target.value)
  }

  const handeFilechange = (event) => {
      let finalFiles = [];

      for (let iteams of event.target.files) {
          finalFiles.push(iteams)
      }

      setFiles(finalFiles)
  }

  const handleSubmit = async (event) => {
      event.preventDefault()

      const config = {
          headers: {
              "Content-Type": "multipart/form-data"
          }
      }

      const formdata = new FormData();
      formdata.append("username", username);

      for (let filesdata of files) {
          formdata.append("userimg", filesdata)
      }

      const response = await axios.post("http://localhost:8000/user/api/register", formdata, config).then((res) => res).catch((error) => error);
      console.log("response", response)

      if (response.status === 200) {
          setUserName("")
          setFiles([]);
          toast.success("image sucessfully uploaded")
      } else {
          toast.error(response.response.data.error)
      }
  }
  return (
      <>
          <Container style={{ marginTop: "10px" }}>
              <h1 className='text-center'>Upload Multiple Image</h1>
              <div className='d-flex flex-direct-column justify-content-center'>
                  <Form className='w-50'>
                      <Form.Group className="mb-3" >
                          <Form.Label>User Name</Form.Label>
                          <Form.Control type="text" value={username} onChange={handleChange} placeholder="username" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Select Image</Form.Label>
                          <Form.Control type="file" onChange={handeFilechange} multiple={true} />
                      </Form.Group>

                      <Button variant="primary" type="submit" onClick={handleSubmit}>
                          Submit
                      </Button>
                  </Form>
              </div>

              {/* images preview */}
              {
                  files.length > 0 && (
                      <>
                          <Container className='mt-2 d-flex justify-content-center'>
                              {
                                  files.map((element) => {
                                      return (
                                          <>
                                              <Card style={{ width: '70px', height: "70px", marginLeft: "5px" }}>
                                                  <Card.Img variant="top" src={URL.createObjectURL(element)} />
                                              </Card>
                                          </>
                                      )
                                  })
                              }
                          </Container>
                      </>
                  )
              }
          </Container>
      </>
  )
};

export default Register;
