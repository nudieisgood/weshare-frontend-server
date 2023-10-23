import { useEffect } from "react";
import { motion } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";

const ModalContainer = ({ setShowModal, children }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  const clickOutside = (e) => {
    e.target.classList.contains("outside") && setShowModal(false);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        ease: "linear",
        duration: 0.2,
      }}
      onClick={clickOutside}
      className="flex fixed top-0 left-0 w-screen h-screen z-20 bg-gray-800/50 items-center outside"
    >
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: "0" }}
        exit={{ y: "-100%" }}
        transition={{
          ease: "linear",
          duration: 1,
          y: { duration: 0.4 },
        }}
        className="max-h-[95%] w-[90%] md:w-[60%] mx-auto text-center bg-white p-8 relative rounded-xl overflow-scroll no-scrollbar"
      >
        {children}
        <button
          className="absolute top-1 left-1 bg-white hover:text-primary text-2xl"
          onClick={() => {
            setShowModal(false);
          }}
        >
          <IoCloseOutline />
        </button>
      </motion.div>
    </motion.div>
  );
};
export default ModalContainer;
