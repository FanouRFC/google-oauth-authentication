import "./App.css";
import Login from "./pages/login";
import { BrowserRouter, Routes, Route } from "react-router";
import UserList from "./pages/userList";
import Dashboard from "./pages/dashboard";
import NotFoundRoute from "./pages/404NotFound";
import { useEffect, useState } from "react";
import AuthCallBack from "./pages/authCallBack";

function App() {
  const [userInfo, setUserInfo] = useState<{ id: number }>();
  useEffect(() => {
    var token = localStorage.getItem("token");
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<UserList />} />
        <Route path="/auth" element={<AuthCallBack />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFoundRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
