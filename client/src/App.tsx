import "./App.css";
import Login from "./pages/login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import UserList from "./pages/userList";
import Dashboard from "./pages/dashboard";
import NotFoundRoute from "./pages/404NotFound";
import { useEffect, useState } from "react";
import AuthCallBack from "./pages/authCallBack";
import { axiosInstance } from "./api/axiosConfig";
import Register from "./pages/register";

function App() {
  const [userInfo, setUserInfo] = useState<{ id: number }>();
  useEffect(() => {
    var token = localStorage.getItem("token");
    async function getInfo() {
      try {
        const req = await axiosInstance.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo(req.data.userId);
      } catch (error) {
        console.log(error);
      }
    }
    if (token) {
      getInfo();
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/admin" element={<UserList />} />
        <Route path="/auth" element={<AuthCallBack />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFoundRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
