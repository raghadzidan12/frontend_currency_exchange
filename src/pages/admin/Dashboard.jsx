import { motion } from "framer-motion";
import { useAuthSlice } from "../../store/slices/auth-slice";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuthSlice();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="content-wrapper"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="title">Admin Dashboard</h2>
        <div style={{ color: "#fff", marginTop: "20px" }}>
          <p>Welcome, {user?.firstName} {user?.lastName}!</p>
          <p>Email: {user?.email}</p>
          <p>Role: {user?.role}</p>
        </div>

        {user?.role === "admin" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ marginTop: "30px", display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/admin/add-currency"
                style={{
                  display: "block",
                  padding: "15px",
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                ➕ Add Currency
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/admin/manage-users"
                style={{
                  display: "block",
                  padding: "15px",
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                👥 Manage Users
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/admin/manage-contacts"
                style={{
                  display: "block",
                  padding: "15px",
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                📧 Manage Contacts
              </Link>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

