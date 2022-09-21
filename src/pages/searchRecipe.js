import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Alert, Card, Button } from "react-bootstrap";

function SearchRecipe() {
  const { recipeTitle } = useParams();
  const [listSearch, setListSearch] = React.useState([]);
  const [isError, setIsError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [filter, setFilter] = React.useState("DESC");

  function handleAddrTypeChange(e) {
    setFilter(e.target.value);
  }

  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_URL_API}/recipe/find?title_recipe=${recipeTitle}&filter=${filter}`
      )
      .then((res) => {
        setIsError(false);
        setListSearch(res.data.recipe);
      })
      .catch((error) => {
        setIsError(true);
        setErrorMsg(error?.response?.data);
      });
  }, [listSearch, recipeTitle]);

  return (
    <div className="App">
      <div className="mb-5 ">
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
            {/* <Col md={{ span: 3, offset: 6 }}>
              <h1 className="pages-link">{name} </h1>
            </Col> */}
          </Row>
        </Container>
      </div>
      <Container>
        {isError ? <Alert variant="danger">{errorMsg}</Alert> : null}
        <Row>
          <div className="d-flex justify-content-start mb-2">
            <span>
              <h5>Sort By:</h5>
            </span>
            <select
              defaultValue={filter}
              onChange={handleAddrTypeChange}
              className="Default select example "
              style={{
                borderRadius: "10px",
                marginLeft: "5px",
                paddingBottom: "5px",
              }}
            >
              <option selected value="DESC">
                Newest
              </option>
              <option value="ASC">Latest</option>
            </select>
          </div>
          {listSearch?.map((item) => (
            <Col xs={4} className="mb-4">
              <Card className="text-dark">
                <Card.Img
                  src={item?.image}
                  alt="Card image"
                  className="photo-recipe"
                />
                <Card.ImgOverlay className="flex-bottom-vertical">
                  <Card.Title>{item?.title_recipe}</Card.Title>
                </Card.ImgOverlay>
              </Card>
              <div className="mt-2 ">
                <a
                  href={"http://localhost:3000/detail/" + item?.id}
                  className="pages-link"
                >
                  <Button className="paragraph" variant="warning">
                    Learn More
                  </Button>
                </a>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default SearchRecipe;
