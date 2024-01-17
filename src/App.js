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
import Subscription from "./Pages/SubscriptionPage";
import Dashboard from "./Pages/DashboardPage";
import Home1Page from "./Pages/Home1Page";
function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute><RoomPage/></ProtectedRoute>} path="/videocall"/>
          <Route element={<EmailVerification/>} path="/verify/:token"/>
          <Route element={<ProtectedRoute><HomePage/></ProtectedRoute>} exact path="/" />
          <Route element={<ProtectedRoute><Home1Page/></ProtectedRoute>} exact path="/home" />
          <Route element={<LoginPage login={'Login to your Account'} register />} path="/login"/>
          <Route element={<LoginPage login={'Login to Admin'} admin />}  path="/adminlogin"/>
          <Route element={<RegisterPage/>} path="/register"/>
          <Route element={<AdminProtect><Adminuserlist/></AdminProtect>} path="/user" />
          <Route element={<AdminProtect><Dashboard/></AdminProtect>} path="/admin" />
          <Route element={<ProtectedRoute><Subscription/></ProtectedRoute>} path="/subscription" />
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
