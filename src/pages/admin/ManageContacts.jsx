import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuthSlice } from "../../store/slices/auth-slice";
import "./ManageContacts.css";

const CONTACTS_STORAGE_KEY = "contact_submissions";

// Extended Contact type for local storage (includes status and id)
// Based on Contact from API but with additional fields for management
// The API Contact uses _id, but we use id for easier access
const createContactWithStatus = (contact) => {
  const id = contact._id?.toString() || contact.id || Date.now().toString();
  return {
    ...contact,
    _id: contact._id || id,
    id: id, // Also add id for easier access
    status: contact.status || "new",
  };
};

export default function ManageContacts() {
  const { user } = useAuthSlice();
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = () => {
    const stored = localStorage.getItem(CONTACTS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const contactsWithStatus = parsed.map(createContactWithStatus);
      setContacts(
        contactsWithStatus.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    }
  };

  const updateContactStatus = (id, status) => {
    const updated = contacts.map((contact) =>
      contact.id === id ? { ...contact, status } : contact
    );
    setContacts(updated);
    localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(updated));
    if (selectedContact?.id === id) {
      setSelectedContact({ ...selectedContact, status });
    }
  };

  const deleteContact = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      const updated = contacts.filter((contact) => contact.id !== id);
      setContacts(updated);
      localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(updated));
      if (selectedContact?.id === id) {
        setSelectedContact(null);
      }
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    filter === "all" ? true : contact.status === filter
  );

  if (user?.role !== "admin") {
    return (
      <div className="content-wrapper">
        <h2 style={{ color: "#ff4444" }}>Access Denied</h2>
        <p style={{ color: "#fff" }}>Admin access required.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="content-wrapper"
    >
      <div className="manage-contacts-container">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="title"
        >
          Manage Contact Submissions
        </motion.h2>

        <div className="contacts-layout">
          <div className="contacts-sidebar">
            <div className="filter-buttons">
              {["all", "new", "read", "replied"].map((status) => (
                <motion.button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`filter-btn ${filter === status ? "active" : ""}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                  {status !== "all" && (
                    <span className="badge">
                      {contacts.filter((c) => c.status === status).length}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>

            <div className="contacts-list">
              {filteredContacts.length === 0 ? (
                <p className="empty-state">No contacts found</p>
              ) : (
                filteredContacts.map((contact) => (
                  <motion.div
                    key={contact.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`contact-item ${
                      selectedContact?.id === contact.id ? "selected" : ""
                    } ${contact.status === "new" ? "new" : ""}`}
                    onClick={() => setSelectedContact(contact)}
                    whileHover={{ x: 5 }}
                  >
                    <div className="contact-item-header">
                      <h4>{contact.name}</h4>
                      <span className={`status-badge ${contact.status}`}>
                        {contact.status}
                      </span>
                    </div>
                    <p className="contact-subject">{contact.subject}</p>
                    <p className="contact-date">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </p>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          <div className="contact-details">
            {selectedContact ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="contact-detail-card"
              >
                <div className="contact-detail-header">
                  <h3>{selectedContact.subject}</h3>
                  <div className="contact-actions">
                    {selectedContact.status === "new" && (
                      <motion.button
                        onClick={() => updateContactStatus(selectedContact.id, "read")}
                        className="action-btn read"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Mark as Read
                      </motion.button>
                    )}
                    {selectedContact.status !== "replied" && (
                      <motion.button
                        onClick={() => updateContactStatus(selectedContact.id, "replied")}
                        className="action-btn replied"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Mark as Replied
                      </motion.button>
                    )}
                    <motion.button
                      onClick={() => deleteContact(selectedContact.id)}
                      className="action-btn delete"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Delete
                    </motion.button>
                  </div>
                </div>

                <div className="contact-info">
                  <div className="info-row">
                    <strong>Name:</strong>
                    <span>{selectedContact.name}</span>
                  </div>
                  <div className="info-row">
                    <strong>Email:</strong>
                    <a href={`mailto:${selectedContact.email}`}>
                      {selectedContact.email}
                    </a>
                  </div>
                  <div className="info-row">
                    <strong>Date:</strong>
                    <span>
                      {new Date(selectedContact.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="info-row">
                    <strong>Status:</strong>
                    <span className={`status-badge ${selectedContact.status}`}>
                      {selectedContact.status}
                    </span>
                  </div>
                </div>

                <div className="contact-message">
                  <strong>Message:</strong>
                  <p>{selectedContact.message}</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="empty-detail"
              >
                <p>Select a contact to view details</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

