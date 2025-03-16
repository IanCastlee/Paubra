import "./MessageToaster.scss";
import { motion } from "framer-motion";

const MessageToaster = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 300 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="message-toaster"
    >
      <p>{message}</p>
    </motion.div>
  );
};

export default MessageToaster;
