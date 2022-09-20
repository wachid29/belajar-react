import "../App.css";
import { Row, Col, Container, Form, Button, Alert } from "react-bootstrap";
import React from "react";
import axios from "axios";
import image from "../images/backround.png";

function Register() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone_number, setPhone_number] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm_pass, setConfirm_pass] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [isSucces, setisSucces] = React.useState(false);
  const [succesMsg, setSuccesMsg] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = "/";
    }
  });

  const handleRegister = () => {
    setIsLoading(true);
    axios
      .post(`${process.env.REACT_APP_URL_API}/userdata/add`, {
        name: name,
        email: email,
        phone_number: phone_number,
        password: password,
        confirm_pass: confirm_pass,
      })
      .then((res) => {
        setIsError(false);
        setisSucces(true);
        setSuccesMsg(res?.data);
        window.location.href = "/login";
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        setisSucces(false);
        setErrorMsg(error?.response?.data);
      });
  };
  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
            <div
              className="h-100 background-image"
              style={{
                backgroundImage: `url(${image})`,
              }}
            ></div>
          </Col>
          <Col xs={6}>
            <div className="flex-center-vertical flex-center-horizontal h-100">
              <div>
                {isError ? <Alert variant="danger">{errorMsg}</Alert> : null}
                {isSucces ? <Alert variant="warning">{succesMsg}</Alert> : null}
                <div className="flex-center-horizontal">
                  <h5 className="title">LET GET STARTED !</h5>
                </div>
                <div className="flex-center-horizontal border-bottom mt-3">
                  <p className="description">
                    Create new account to access all features
                  </p>
                </div>
                <div>
                  <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email address"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicPhoneNumber"
                    >
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="08xxxxxxxxxx"
                        onChange={(e) => setPhone_number(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Create New Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Create New Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicConfirmPassword"
                    >
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirm_pass(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check
                        type="checkbox"
                        label="I agree to terms & conditions"
                      />
                    </Form.Group>
                    <div className="d-grid gap-2">
                      <Button
                        variant="warning"
                        type="submit"
                        disabled={isLoading}
                        onClick={handleRegister}
                      >
                        {isLoading ? "Loading..." : "Register"}
                      </Button>
                    </div>
                  </Form>
                </div>
                <div className="flex-center-horizontal mt-4 ">
                  <p className="paragraph ">
                    Already have account?
                    <a href="http://localhost:3000/login" className="card-link">
                      Log in Here
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
