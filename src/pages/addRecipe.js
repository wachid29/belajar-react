import "../App.css";
import {
  Card,
  Row,
  Col,
  Container,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import React from "react";
import axios from "axios";
import iconPhoto from "../images/image.png";
import { ProfileContext } from "../context";

export default function AddRecipe() {
  const [title_recipe, setTitle_recipe] = React.useState("");
  const [image, setImage] = React.useState({});
  const [ingredients, setIngredients] = React.useState("");
  const [vidio_step, setVidio_step] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [isSucces, setisSucces] = React.useState(false);
  const [succesMsg, setSuccesMsg] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const UserConsumer = React.useContext(ProfileContext);

  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
  });

  const handleUpload = (e) => {
    let uploadedImage = e.target.files[0];
    if (uploadedImage) {
      setImage(uploadedImage);
    }
  };
  const handleAddRecipe = () => {
    setIsLoading(true);
    if (!image) {
      console.log("error here");
    } else {
      let bodyFormData = new FormData();
      bodyFormData.append("title_recipe", title_recipe);
      bodyFormData.append("image", image);
      bodyFormData.append("ingredients", ingredients);
      bodyFormData.append("vidio_step", vidio_step);
      bodyFormData.append("user_id", UserConsumer.id);
      axios({
        method: "post",
        url: "http://localhost:8001/recipe/add",
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          setIsError(false);
          setisSucces(true);

          setSuccesMsg(res?.data);
          window.location.href = "/";
        })
        .catch((error) => {
          setIsLoading(false);
          setIsError(true);
          setisSucces(false);
          console.log(UserConsumer);
          setErrorMsg(error?.response?.data);
        });
    }
  };
  return (
    <div className="App">
      <div className="mb-5">
        <Container fluid>
          <Row className="mb-4"></Row>
          <Row style={{ paddingLeft: 40 }}>
            <Col xs={1}>
              <a href="http://localhost:3000" className="pages-link">
                Home
              </a>
            </Col>
            <Col xs={1}>
              <a href="http://localhost:3000/addRecipe" className="pages-link">
                Add Recipe
              </a>
            </Col>
            <Col xs={1}>
              <a href="http://localhost:3000/profile" className="pages-link">
                Profile
              </a>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="padding-top">
        <Container>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <div>
                {isError ? <Alert variant="danger">{errorMsg}</Alert> : null}
                {isSucces ? <Alert variant="warning">{succesMsg}</Alert> : null}
              </div>
              <Form onSubmit={(e) => e.preventDefault()}>
                <Card className="mb-3">
                  <div className="flex-center-vertical flex-center-horizontal h-30 ">
                    <div>
                      <div className="flex-center-horizontal">
                        <img width={50} src={iconPhoto} alt="" />
                      </div>
                      <div className="flex-center-horizontal">
                        <p>Add Photo</p>
                      </div>
                      <div className="flex-center-horizontal">
                        <input type="file" onChange={handleUpload} />
                      </div>
                    </div>
                  </div>
                </Card>
                <Form.Group
                  className="mb-3 "
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    onChange={(e) => setTitle_recipe(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3 table-box"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Ingredient"
                    className="table-box"
                    onChange={(e) => setIngredients(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-5"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="text"
                    placeholder="Vidio"
                    onChange={(e) => setVidio_step(e.target.value)}
                  />
                </Form.Group>
                <Container>
                  <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                      <div className="d-grid gap-2">
                        <Button
                          variant="warning"
                          type="submit"
                          disabled={isLoading}
                          onClick={handleAddRecipe}
                        >
                          {isLoading ? "Loading..." : "POST"}
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="padding-top mt-5">
        <Card className=" footer">
          <Card.Body>
            <h1 className="flex-center-horizontal mt-5 mb-3">
              Eat, Cook, Repeat
            </h1>
            <p className="flex-center-horizontal paragraph mb-5">
              Share your best recipe by uploading here !
            </p>
            <div className="flex-center-vertical flex-center-horizontal mt-5 ">
              <p className="flex-center-horizontal little-paragraph padding-space">
                Product
              </p>
              <p className="flex-center-horizontal little-paragraph padding-space">
                Company
              </p>
              <p className="flex-center-horizontal little-paragraph padding-space">
                Learn more
              </p>
              <p className="flex-center-horizontal little-paragraph padding-space">
                Get in touch
              </p>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
