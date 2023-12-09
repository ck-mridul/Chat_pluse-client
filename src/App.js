import React from "react";
import RegisterPage from "./Pages/RegisterPage"
import LoginPage from "./Pages/LoginPage"
import HomePage from "./Pages/HomePage";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import EmailVerification from "./Componets/EmailVerification";
import Adminuserlist from "./Pages/Adminuserlist";
import { ProtectedRoute } from "./Componets/ProtectedRout/ProtectedRout";
import { AdminProtect } from "./Componets/ProtectedRout/AdminProtect";
import RoomPage from "./Pages/RoomPage";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute><RoomPage/></ProtectedRoute>} path="/room/:room_id"/>
          <Route element={<EmailVerification/>} path="/verify/:token"/>
          <Route element={<ProtectedRoute><HomePage/></ProtectedRoute>} exact path="/" />
          <Route element={<LoginPage login={'Login to your Account'} register />} path="/login"/>
          <Route element={<LoginPage login={'Login to Admin'} admin />}  path="/adminlogin"/>
          <Route element={<RegisterPage/>} path="/register"/>
          <Route element={<AdminProtect><Adminuserlist/></AdminProtect>} path="/admin" />
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
