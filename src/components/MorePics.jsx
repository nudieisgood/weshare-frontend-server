import { IoMdArrowBack } from "react-icons/io";
import { motion } from "framer-motion";

const MorePics = ({ photos, setShowMorePics }) => {
  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: "0" }}
      exit={{ x: "-100%" }}
      transition={{
        ease: "linear",
        duration: 1,
        x: { duration: 0.4 },
      }}
      className="z-50 absolute inset-0 bg-white min-w-full min-h-screen overflow"
    >
      <button
        onClick={() => {
          setShowMorePics(false);
        }}
        className="z-50 sticky top-0 left-0 bg-transparent text-4xl hover:text-primary text-primary md:text-black"
      >
        <IoMdArrowBack />
      </button>
      <div className="grid gap-3 relative -top-2 px-2 mt-2 md:mt-0">
        {photos?.map((photo) => (
          <div className="flex justify-center max-w-2xl mx-auto" key={photo}>
            <img className="aspect-video object-cover" src={photo} />
          </div>
        ))}
      </div>
    </motion.div>
  );
};
export default MorePics;

// {
//   showMorePics
//     ? "z-50 absolute bg-white min-w-full min-h-screen translate-none transition-all"
//     : "absolute bg-white min-w-full min-h-screen translate-x-full transition-all"
// }
