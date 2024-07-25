import { Name } from "ajv";
import Password from "antd/es/input/Password";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col, Input } from "reactstrap";
const initialValues = {
  Name: "",
  MobileNo: "",
  Address: "",
};

const Login = () => {
  const [values, setValues] = useState(initialValues);

  const { Name, MobileNo, Address, email, Password } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL_COFFEE}/api/auth/create/visitor`,
        values
      );
    //   console.log("Response:", response.data);
      const token = response.token;
      if(response.token){
      localStorage.setItem("token", token);
      localStorage.setItem("visitor", response.data._id);
      window.location.reload("/visitor");
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
          height: "300px",
          backgroundColor: "",
        }}
      >
        <div className="d-flex justify-content-center">
          <Row>
            <Row>
              <Col lg={6}>
                <Input
                  type="text"
                  name="Name"
                  value={Name}
                  onChange={(e) =>
                    setValues({ ...values, Name: e.target.value })
                  }
                  placeholder="Enter Your Name"
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
              <Col lg={6}>
                <Input
                  type="number"
                  name="MobileNo"
                  value={MobileNo}
                  onChange={(e) =>
                    setValues({ ...values, MobileNo: e.target.value })
                  }
                  placeholder="Enter Your Mobile No."
                />
              </Col>
            </Row>

            <Row>
              <Col lg={6}>
                <Input
                  type="textarea"
                  name="Address"
                  value={Address}
                  onChange={(e) =>
                    setValues({ ...values, Address: e.target.value })
                  }
                  placeholder="Enter Your Address"
                />
              </Col>
            </Row>

            <Row>
              <div className="">
                <button className="btn btn-info" onClick={handleSubmit}>
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
