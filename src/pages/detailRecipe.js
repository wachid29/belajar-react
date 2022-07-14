import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function DetailRecipe() {
  const [detailRecipe, setdetailRecipe] = React.useState([]);

  // Get the userId param from the URL.
  const { recipeId } = useParams();

  React.useEffect(() => {
    axios
      .get(`http://localhost:8001/commentbyrecipe?id=${recipeId}`)
      .then((res) => {
        console.log(res.data);
      });
  }, []);
  return (
    <>
      <h1>{recipeId}</h1>
    </>
  );
}

export default DetailRecipe;
