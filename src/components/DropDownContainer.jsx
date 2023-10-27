import { motion } from "framer-motion";

const DropDownContainer = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        ease: "linear",
        duration: 0.2,
      }}
      className="absolute overflow-hidden top-12 right-0 border rounded-lg bg-white"
    >
      {children}
    </motion.div>
  );
};
export default DropDownContainer;
