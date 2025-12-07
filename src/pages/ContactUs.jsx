import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { contactSchema } from "../schemas/auth-schemas";
import "./ContactUs.css";

// In a real app, this would be an API call
// For now, we'll store in localStorage
const CONTACTS_STORAGE_KEY = "contact_submissions";

export default function ContactUs() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    try {
      // Get existing contacts from localStorage
      const existingContacts = JSON.parse(
        localStorage.getItem(CONTACTS_STORAGE_KEY) || "[]"
      );

      // Add new contact with timestamp
      // Format matches Contact type from API
      const newContact = {
        _id: Date.now().toString(),
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        createdAt: new Date().toISOString(),
        status: "new", // Additional field for local management
      };

      existingContacts.push(newContact);
      localStorage.setItem(
        CONTACTS_STORAGE_KEY,
        JSON.stringify(existingContacts)
      );

      setIsSubmitted(true);
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Failed to submit contact form:", error);
      alert("Failed to submit. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="content-wrapper"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="contact-container"
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="title"
        >
          Contact Us
        </motion.h2>

        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="success-message"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              ✓
            </motion.span>
            <p>Thank you! Your message has been sent successfully.</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="form-group"
          >
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className={errors.name ? "error" : ""}
            />
            {errors.name && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="error-message"
              >
                {errors.name.message}
              </motion.span>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="form-group"
          >
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={errors.email ? "error" : ""}
            />
            {errors.email && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="error-message"
              >
                {errors.email.message}
              </motion.span>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="form-group"
          >
            <label htmlFor="subject">Subject:</label>
            <input
              id="subject"
              type="text"
              {...register("subject")}
              className={errors.subject ? "error" : ""}
            />
            {errors.subject && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="error-message"
              >
                {errors.subject.message}
              </motion.span>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="form-group"
          >
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              rows={6}
              {...register("message")}
              className={errors.message ? "error" : ""}
            />
            {errors.message && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="error-message"
              >
                {errors.message.message}
              </motion.span>
            )}
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="submit-button"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

