import { useEffect } from "react";
import { motion } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";

const items = [
  { icon: "ok", item: "複製此連結" },
  { icon: "ok", item: "電子郵件" },
  { icon: "ok", item: "Facebook" },
  { icon: "ok", item: "Instagram" },
  { icon: "ok", item: "Line" },
];

const modalContent = () => {
  return (
    <div>
      <h2 className="mb-4">分享此房源</h2>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => {
          return (
            <div
              key={item.item}
              className="py-6 px-8 border rounded-xl hover:bg-gray-100 cursor-pointer"
            >
              {item.item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Modal = ({ setShowModal }) => {
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
        className="max-w-xl mx-auto text-center bg-white p-8 relative rounded-xl"
      >
        {modalContent()}
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
export default Modal;
