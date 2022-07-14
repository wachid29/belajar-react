import "../App.css";
import { Card, Row, Col, Container } from "react-bootstrap";
import React from "react";
import axios from "axios";
import { ProfileContext } from "../context";

function Profile() {
  const [user, setUser] = React.useState([]);
  const [recipe, setRecipe] = React.useState([]);
  const UserConsumer = React.useContext(ProfileContext);

  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
  });

  React.useEffect(() => {
    axios
      .post("http://localhost:8001/recipebyuser", {
        id: UserConsumer.id,
      })
      .then((res) => {
        // setIsError(false);
        // localStorage.setItem("token", res?.data?.token);
        // localStorage.setItem("user", JSON.stringify(res?.data?.user));
        // window.location.href = "/";
        setUser(res.data.user);
        setRecipe(res.data.recipe);
      })
      .catch((error) => {
        // setIsLoading(false);
        // setIsError(true);
        // setErrorMsg(error?.response?.data);
        console.log("err", error);
      });
  });

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
        <Row>
          {user?.map((item) => (
            <Col md={{ span: 2, offset: 5 }} className="mb-4">
              <div className="flex-center-horizontal ">
                <Card className="content ">
                  <Card.Img
                    className="content"
                    src={item?.photo_profile}
                    alt="Card image"
                  />
                </Card>
              </div>
              <div className="flex-center-horizontal mt-3 border-bottom">
                <h5>{item?.name}</h5>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <div className="padding-top">
        <Container fluid className="border-bottom mt-4">
          <Row style={{ paddingLeft: 40 }}>
            <Col xs={2}>
              <h5>My Recipe</h5>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="mt-3">
        <Row style={{ paddingLeft: 40, paddingRight: 40 }}>
          {recipe?.map((item) => (
            <Col xs={3} className="mb-4">
              <Card className="text-dark content-recipe">
                <Card.Img
                  src={item?.image}
                  alt="Card image"
                  className="content-recipe"
                />
                <Card.ImgOverlay className="flex-bottom-vertical">
                  <Card.Title>{item?.title_recipe}</Card.Title>
                </Card.ImgOverlay>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <div className="mt-5">
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

export default Profile;
