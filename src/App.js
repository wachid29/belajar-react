import "./App.css";

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import AddRecipe from "./pages/addRecipe";
import Profile from "./pages/profile";
import NotFound from "./pages/notFound";
import Detail from "./pages/detailRecipe";
import axios from "axios";
import Search from "./pages/searchRecipe";

export default function App() {
  const ProfileContext = React.createContext(null);

  axios.interceptors.request.use(
    function (config) {
      if (localStorage.getItem("token")) {
        config.headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  return (
    <ProfileContext.Provider value="dark">
      <BrowserRouter>
        <Routes>
          <Route path="/" />
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="addRecipe" element={<AddRecipe />} />
          <Route path="profile" element={<Profile />} />
          <Route path="detail/:recipeId" element={<Detail />} />
          <Route path="search/:recipeTitle" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </ProfileContext.Provider>
  );
}
