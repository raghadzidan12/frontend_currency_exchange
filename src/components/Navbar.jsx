import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useAuthSlice } from "../store/slices/auth-slice";
import { AuthActions } from "../store/slices/auth-slice";
import "./Navbar.css";

export default function Navbar() {
  const { user, accessToken } = useAuthSlice();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = !!accessToken && !!user;
  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    dispatch(AuthActions.logout());
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="navbar"
    >
      <div className="navbar-content">
        <div className="navbar-links">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/contact" className="nav-link">
              Contact Us
            </Link>
          </motion.div>

          {isAuthenticated ? (
            <>
              {isAdmin && (
                <>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to="/admin/dashboard" className="nav-link">
                      Dashboard
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to="/admin/add-currency" className="nav-link">
                      Add Currency
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to="/admin/manage-users" className="nav-link">
                      Manage Users
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to="/admin/manage-contacts" className="nav-link">
                      Manage Contacts
                    </Link>
                  </motion.div>
                </>
              )}
              <motion.div
                className="user-info"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="user-name">
                  {user?.firstName} {user?.lastName}
                </span>
                <motion.button
                  onClick={handleLogout}
                  className="logout-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Logout
                </motion.button>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/signup" className="nav-link">
                  Sign Up
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
