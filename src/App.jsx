



import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AddNewDoctor from "./components/AddNewDoctor";
import Messages from "./components/Messages";
import Doctors from "./components/Doctors";
import { Context } from "./main";
import axios from "axios";
import SideBar from "./components/sideBar"
import AddNewAdmin from "./components/AddNewAdmin";
import "./App.css";
import { contextX } from "./store/Xcontext";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, admin, setAdmin ,baseUrl} =
    useContext(Context);

    // const {baseUrl}=useContext(contextX);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://healthmaster-4r73.onrender.com/api/v1/user/admin/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
      }
    };
    fetchUser();
  }, []);
  
  return (
    <Router>
       <SideBar></SideBar>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/doctor/addnew" element={<AddNewDoctor />} />
        <Route path="/admin/addnew" element={<AddNewAdmin />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/doctors" element={<Doctors />} />
      </Routes>
     
    </Router>
  );
};

export default App;
