import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/admin/Dashboard";
import AddCurrency from "./pages/admin/AddCurrency";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageContacts from "./pages/admin/ManageContacts";
import "./App.css";
import { StoreProvider } from "./api/store";

function App() {
  return (
    <StoreProvider>
      <Router>
        <Navbar />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/contact" element={<ContactUs />} />
            
            {/* Protected Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Admin Only Routes */}
            <Route
              path="/admin/add-currency"
              element={
                <AdminRoute>
                  <AddCurrency />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/manage-users"
              element={
                <AdminRoute>
                  <ManageUsers />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/manage-contacts"
              element={
                <AdminRoute>
                  <ManageContacts />
                </AdminRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
