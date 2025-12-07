import { motion } from "framer-motion";
import CurrencyConverter from "../components/CurrencyConverter";

export default function Home() {
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
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <CurrencyConverter />
      </motion.div>
    </motion.div>
  );
}
