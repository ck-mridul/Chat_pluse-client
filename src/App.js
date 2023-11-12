import React from "react";
import RegisterPage from "./Pages/RegisterPage"
import LoginPage from "./Pages/LoginPage"
import HomePage from "./Pages/HomePage";
import { BrowserRouter,Route,Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<HomePage/>} exact path="/" />
          <Route element={<LoginPage/>} path="/login"/>
          <Route element={<RegisterPage/>} path="/register"/>
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
