import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AddCurrency from "./pages/admin/AddCurrency";
import ManageUsers from "./pages/admin/ManageUsers";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin/add-currency" element={<AddCurrency />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
