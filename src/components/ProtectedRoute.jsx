import { Navigate } from "react-router-dom";
import { useAuthSlice } from "../store/slices/auth-slice";
import { motion } from "framer-motion";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, accessToken } = useAuthSlice();

  // Check if user is authenticated
  if (!accessToken || !user) {
    return <Navigate to="/login" replace />;
  }

  // Check if admin is required
  if (requireAdmin && user.role !== "admin") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="content-wrapper"
        style={{ textAlign: "center", padding: "40px" }}
      >
        <h2 style={{ color: "#ff4444" }}>Access Denied</h2>
        <p style={{ color: "#fff" }}>You need admin privileges to access this page.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

