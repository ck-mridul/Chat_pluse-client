import React from "react";
import RegisterPage from "./Pages/RegisterPage"
import LoginPage from "./Pages/LoginPage"
import { BrowserRouter,Route,Routes } from "react-router-dom";
import EmailVerification from "./Componets/EmailVerification";
import { ProtectedRoute } from "./Componets/ProtectedRout/ProtectedRout";
import RoomPage from "./Pages/RoomPage";
import Home1Page from "./Pages/Home1Page";
function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute><RoomPage/></ProtectedRoute>} path="/videocall"/>
          <Route element={<EmailVerification/>} path="/verify/:token"/>
          <Route element={<ProtectedRoute><Home1Page/></ProtectedRoute>} exact path="/" />
          <Route element={<LoginPage login={'Login to your Account'} register />} path="/login"/>
          <Route element={<RegisterPage/>} path="/register"/>
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
