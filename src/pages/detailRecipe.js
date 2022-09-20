import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
  Alert,
} from "react-bootstrap";
import vector from "../images/Vector.png";
import { useSelector } from "react-redux";

function DetailRecipe() {
  const [detailRecipe, setdetailRecipe] = React.useState([]);
  const [comment, setcomment] = React.useState([]);
  const [addComment, setAddComment] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [isSucces, setisSucces] = React.useState(false);
  const [succesMsg, setSuccesMsg] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const { token, profile } = useSelector((state) => state?.auth);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Get the userId param from the URL.
  const { recipeId } = useParams();

  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_URL_API}/commentbyrecipe?id=${recipeId}`,
        config
      )
      .then((res) => {
        console.log(res?.data);
        setdetailRecipe(res?.data?.recipe);
        setcomment(res?.data?.comment);
      });
  }, []);

  const handleComment = () => {
    setIsLoading(true);
    axios
      .post(`${process.env.REACT_APP_URL_API}/comment/add`, {
        comment: addComment,
        user_id: profile?.id,
        recipe_id: recipeId,
      })
      .then((res) => {
        setIsError(false);
        setisSucces(true);
        setSuccesMsg(res?.data);
        window.location.reload(false);
      })
      .catch((error) => {
        setIsError(true);
        setisSucces(false);
        setErrorMsg(error?.response?.data);
      });
  };
  return (
    <div className="App">
      <div>
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
        <Container className="padding-top">
          {detailRecipe?.map((item) => (
            <div className="mt-4">
              <div className="flex-center-horizontal mb-4">
                <h2 className="title-recipe">{item?.title_recipe}</h2>
              </div>
              <Row
                className="flex-center-horizontal mb-4"
                style={{ paddingLeft: 10, paddingRight: 10 }}
              >
                <Col className="mb-5 flex-center-horizontal">
                  <Card className="text-dark detail-recipe ">
                    <Card.Img
                      src={item?.image}
                      alt="Card image"
                      className="detail-recipe"
                    />
                  </Card>
                </Col>
              </Row>
              <Row
                className="flex-center-horizontal "
                style={{ paddingLeft: 40, paddingRight: 40 }}
              >
                <Col xs={10} className="mb-3 ">
                  <Card className="text-dark no-border">
                    <Card.Body className="sub-title">Ingredient</Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row
                className="mb-5"
                style={{ paddingLeft: 50, paddingRight: 40 }}
              >
                <Col md={{ span: 2, offset: 1 }} className="mb-5">
                  <Card className="text-dark ">
                    <Card.Body>
                      <p
                        className="d-grid gap-5"
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {item?.ingredients}
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row
                className="flex-center-horizontal "
                style={{ paddingLeft: 40, paddingRight: 40 }}
              >
                <Col xs={10} className="mb-3 ">
                  <Card className="text-dark no-border">
                    <Card.Body className="sub-title">Vidio Step</Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row
                className="mb-4 "
                style={{ paddingLeft: 60, paddingRight: 40 }}
              >
                <Col md={{ span: 2, offset: 1 }} className="mb-5">
                  <Card className="mb-3 vidio-button  flex-center-horizontal  flex-center-vertical">
                    <Card.Img
                      src={vector}
                      alt="Card image"
                      className="vidio-image flex-center-horizontal  "
                    />
                  </Card>
                  <Card className="mb-3 vidio-button  flex-center-horizontal  flex-center-vertical">
                    <Card.Img
                      src={vector}
                      alt="Card image"
                      className="vidio-image flex-center-horizontal  "
                    />
                  </Card>
                  <Card className="mb-3 vidio-button  flex-center-horizontal  flex-center-vertical">
                    <Card.Img
                      src={vector}
                      alt="Card image"
                      className="vidio-image flex-center-horizontal  "
                    />
                  </Card>
                  <Card className="mb-3 vidio-button  flex-center-horizontal  flex-center-vertical">
                    <Card.Img
                      src={vector}
                      alt="Card image"
                      className="vidio-image flex-center-horizontal  "
                    />
                  </Card>
                </Col>
              </Row>
              <Row
                className="flex-center-horizontal "
                style={{ paddingLeft: 60, paddingRight: 60 }}
              >
                <Col xs={10}>
                  {isError ? <Alert variant="danger">{errorMsg}</Alert> : null}
                  {isSucces ? (
                    <Alert variant="warning">{succesMsg}</Alert>
                  ) : null}
                  <Form
                    onSubmit={(e) => e.preventDefault()}
                    className="mb-4 table-box"
                  >
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Comment :"
                        className="table-box"
                        onChange={(e) => setAddComment(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                </Col>
                <div className="flex-center-horizontal mb-5">
                  <Col xs={3}>
                    <div className="d-grid gap-2">
                      <Button
                        variant="warning"
                        type="submit"
                        onClick={handleComment}
                        disabled={!addComment}
                      >
                        {isLoading ? "Loading..." : "SENT"}
                      </Button>
                    </div>
                  </Col>
                </div>
              </Row>
            </div>
          ))}
        </Container>
        <Container>
          <Row
            className="flex-center-horizontal  "
            style={{ paddingLeft: 40, paddingRight: 40 }}
          >
            <Col xs={10} className="mb-3 ">
              <Card className="text-dark no-border">
                <Card.Body className="sub-title">Comment</Card.Body>
              </Card>
            </Col>
          </Row>
          {comment?.map((item) => (
            <Row style={{ paddingLeft: 60 }} className=" flex-center-vertical">
              <Col md={{ span: 1, offset: 1 }}>
                <Card className="comment-user-photo ">
                  <Card.Img
                    src={item?.photo_profile}
                    alt="Card image"
                    className="comment-user-photo"
                  />
                </Card>
              </Col>
              <Col xs={2}>
                <Card className="text-dark no-border">
                  <Card.Body>
                    <p className=" mb-1">{item?.name}</p>
                    <p className=" mb-1">{item?.comment}</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ))}
        </Container>
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
    </div>
  );
}

export default DetailRecipe;
