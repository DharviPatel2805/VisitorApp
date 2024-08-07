import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Input } from "reactstrap";
import axiosInstance from "../components/axiosInstance";
import { setGlobalToken, getGlobalToken } from '../components/Global'

const initialValues = {
  Name: "",
  MobileNo: "",
  Address: "",
};

const Login = () => {
  const [values, setValues] = useState(initialValues);

  const navigate = useNavigate();

  const { Name, MobileNo, Address, email, Password } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_COFFEE}/api/create/visitor`,
        values,
      );
      console.log("Response:", response);
      const token = response.data.token;
      if(response.data.token){
        setGlobalToken(token);
      // localStorage.setItem("token", token);
      localStorage.setItem("visitor", response.data.data._id);
      navigate("/visitor");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <React.Fragment>
      <div
        className="container"
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          height: "400px",
          width: "40%",
          padding: "2%",
          backgroundColor: "rgb(227, 243, 249)",
          border: "2px solid rgb(227, 243, 249)", 
          borderRadius: "10px",
        }}
      >
        <div className="d-flex justify-content-center">
          <Row>
            <h2 className="text-center" >Welcome</h2>
            <Row>
              <Col lg={6}>
                <Input
                  type="text"
                  name="Name"
                  value={Name}
                  style={{height: "60px"}}
                  onChange={(e) =>
                    setValues({ ...values, Name: e.target.value })
                  }
                  placeholder="Enter Your Name"
                />
              </Col>
              <Col lg={6}>
                <Input
                  type="number"
                  name="MobileNo"
                  value={MobileNo}
                  style={{height: "60px"}}
                  onChange={(e) =>
                    setValues({ ...values, MobileNo: e.target.value })
                  }
                  placeholder="Enter Your Mobile No."
                />
              </Col>
            </Row>

              {/* <Row>
              <Col lg={3}>
                <Input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                  placeholder="Enter Your email"
                />
              </Col>
              <Col lg={3}>
                <Input
                  type="text"
                  name="Password"
                  value={Password}
                  onChange={(e) =>
                    setValues({ ...values, Password: e.target.value })
                  }
                  placeholder="Enter Your Password"
                />
              </Col>
              </Row> */}
             

            <Row>
              <Col lg={12}>
                <Input
                  type="textarea"
                  name="Address"
                  style={{height: "120px"}}
                  value={Address}
                  onChange={(e) =>
                    setValues({ ...values, Address: e.target.value })
                  }
                  placeholder="Enter Your Address"
                />
              </Col>
            </Row>

            <Row>
              <div className="text-center">
                <button className="btn btn-lg btn-outline-info" style={{ width: "100%" }} onClick={handleSubmit}>
                  Login
                </button>
              </div>
            </Row>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
