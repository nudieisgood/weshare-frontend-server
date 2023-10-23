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

const SharePlaceModal = () => {
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
export default SharePlaceModal;
