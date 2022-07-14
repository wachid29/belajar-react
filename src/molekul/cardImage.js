import Card from "react-bootstrap/Card";

function ImgOverlayExample(props) {
  const { image, title } = props;
  return (
    <Card className="bg-dark text-dark">
      <Card.Img src={image} alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title>{title}</Card.Title>
      </Card.ImgOverlay>
    </Card>
  );
}

export default ImgOverlayExample;
