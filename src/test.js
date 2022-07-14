import "./App.css";

import React from "react";
import axios from "axios";

export default function App() {
  const [image, setImage] = React.useState(null);

  function handleUploadChange(e) {
    let uploadImage = e.target.files[0];
    setImage(uploadImage);
  }

  function uploadImage() {
    if (!image) {
      console.log("error here");
    } else {
      let bodyFormData = new FormData();
      bodyFormData.append("userName", "Fred");
      bodyFormData.append("image", image);
      axios({
        method: "post",
        url: "http://localhost:8001/recipe/add",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  console.log(image);
  return (
    <div className="App">
      <div
        style={{ height: "80vh" }}
        className=" d-flex justify-conten-center align-item-center"
      >
        <div className="w-25 mt-5 mx-auto">
          <div>
            <img
              src={"https://fakeimg.pl/350x200/"}
              className="img-thumbnail"
              alt=""
            />
          </div>
          <div className="my-3">
            <label htmlFor="formfile" className="form-label">
              Upload image here
            </label>
            <input
              type="file"
              className="form-control"
              id="formfile"
              accept="image/*"
              onChange={handleUploadChange}
            />
            <button
              onClick={uploadImage}
              className="btn btn-primary w-100 mt-2"
            >
              save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
