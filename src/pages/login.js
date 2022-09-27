import "../App.css";
import { Row, Col, Container, Form, Button, Alert } from "react-bootstrap";
import React from "react";
import axios from "axios";
import image from "../images/backround.png";
import { useDispatch } from "react-redux";
import * as Type from "../redux/auth/type";

function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = "/";
    }
  });
  const handlelogin = () => {
    setIsLoading(true);
    axios
      .post(`${process.env.REACT_APP_URL_API}/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        setIsError(false);
        dispatch({
          type: Type.SET_AUTH,
          payload: {
            token: res?.data?.token,
            user: res?.data?.user,
          },
        });
        window.location.href = "/";
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
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
          <Col>
            <div className="flex-center-vertical flex-center-horizontal h-100">
              <div>
                {isError ? <Alert variant="danger">{errorMsg}</Alert> : null}
                <div className="flex-center-horizontal  ">
                  <h5 className="title">WELCOME</h5>
                </div>
                <div className="flex-center-horizontal border-bottom mt-3">
                  <p className="description">
                    Log in into your exiting account
                  </p>
                </div>
                <div>
                  <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="examplexxx@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
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
                        onClick={handlelogin}
                      >
                        {isLoading ? "Loading..." : "Log In"}
                      </Button>
                    </div>
                  </Form>
                </div>
                <div className="flex-right-horizontal mt-3 border-bottom  ">
                  <p className="paragraph">Forgot Password?</p>
                </div>
                <div className="flex-center-horizontal mt-4 ">
                  <p className="paragraph">
                    Don't have an account?
                    <a href="/register" className="card-link">
                      Sign Up
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

export default Login;
