import "../App.css";
import { Card, Row, Col, Container } from "react-bootstrap";
import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import * as Type from "../redux/auth/type";

function Profile() {
  const [user, setUser] = React.useState();
  const [recipe, setRecipe] = React.useState();
  const { token, profile } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_URL_API}/userdata/recipebyuser?id=${profile?.id}`,
        config
      )
      .then((res) => {
        setUser(res?.data?.user);
        setRecipe(res?.data?.recipe);
      })
      .catch((error) => {
        console.log("err", error);
      });
  }, []);

  const handleLogOut = () => {
    dispatch({
      type: Type.REMOVE_AUTH,
    });
    window.location.href = "/login";
  };

  React.useEffect(() => {
    if (token === null) {
      window.location.href = "/login";
    }
  });

  return (
    <div className="App">
      <div className="mb-5">
        <Container fluid>
          <Row className="mb-4"></Row>
          <Row style={{ paddingLeft: 40 }}>
            <Col xs={1}>
              <a href="/" className="pages-link">
                Home
              </a>
            </Col>
            <Col xs={1}>
              <a href="/addRecipe" className="pages-link">
                Add Recipe
              </a>
            </Col>
            <Col xs={1}>
              <a href="/profile" className="pages-link">
                Profile
              </a>
            </Col>
            <Col md={{ span: 3, offset: 6 }}>
              <h5
                className="pages-link"
                style={{ cursor: "pointer" }}
                onClick={handleLogOut}
              >
                LOG OUT
              </h5>
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
          {recipe?.lenght === 0 ? (
            <Col xs={3} className="mb-4">
              <div>recipe tidak ditemukan</div>
            </Col>
          ) : (
            recipe?.map((item) => (
              <Col xs={3}>
                <Card className="text-dark">
                  <Card.Img
                    src={item?.image}
                    alt="Card image"
                    className="photo-recipe"
                    style={{
                      objectFit: "cover",
                      boxShadow: "2px 2px 5px 1px rgba(0,0,0,0.12)",
                      width: "100%",
                    }}
                  />
                  <Card.ImgOverlay
                    className="flex-bottom-vertical"
                    style={{
                      color: "#FFFFFF",
                      textShadow: "1px 2px 3px rgba(0,0,0,0.42)",
                    }}
                  >
                    <Card.Title>{item?.title_recipe}</Card.Title>
                  </Card.ImgOverlay>
                </Card>
              </Col>
            ))
          )}
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
