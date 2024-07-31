import React, { useContext, useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../ContextProvider/Context.js';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';

const Test = () => {
    const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:8000/login/sucess", { withCredentials: true });
    
            console.log("response",response)
        } catch (error) {
          navigate("*")
        }
    }
    
    
    useEffect(() => {
      getUser()
    }, []);

  const { logindata, setLoginData } = useContext(LoginContext);

  const [data, setData] = useState(false);


  const navigate = useNavigate();

  const DashboardValid = async () => {
      let token = localStorage.getItem("usersdatatoken");

      const res = await fetch("/validuser", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": token
          }
      });

      const data = await res.json();

      if (data.status == 401 || !data) {
        navigate("*");
      } else {
          console.log("user verify");
          setLoginData(data)
          navigate("/Test");
      }
  }


  useEffect(() => {
      setTimeout(() => {
          DashboardValid();
          setData(true)
      }, 2000)

  }, [])

  return (
      <>
          {
              data ? <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <img src="./man.png" style={{ width: "200px", marginTop: 20 }} alt="" />
                  <h1>User Email:{logindata ? logindata.ValidUserOne.email : ""}</h1>
              </div> : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
                  Loading... &nbsp;
                  <CircularProgress />
              </Box>
          }

      </>

  )
}

export default Test;
