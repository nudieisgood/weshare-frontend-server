import { BsFacebook } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";

import { FaLine } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import { RxTwitterLogo } from "react-icons/rx";
import { FiCopy } from "react-icons/fi";
import { GoMail } from "react-icons/go";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useAppContext } from "../context/appContext";
import { useState } from "react";

const SharePlaceModal = () => {
  const [copied, setCopied] = useState(false);
  const { user } = useAppContext();
  const url = window.location.href;

  const items = [
    {
      id: 1,
      icon: "ok",
      item: (
        <a
          target="blank"
          className="flex items-center gap-2 justify-center"
          href={`mailto:${user?.email}`}
        >
          <GoMail /> <p>電子郵件</p>
        </a>
      ),
    },
    {
      id: 2,
      icon: "ok",
      item: (
        <a
          target="blank"
          className="flex items-center gap-2 justify-center"
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        >
          <BsFacebook />
          <p>Facebook</p>
        </a>
      ),
    },
    {
      id: 3,
      icon: "ok",
      item: (
        <a
          target="blank"
          className="flex items-center gap-2 justify-center"
          href={`https://www.instagram.com`}
        >
          <BsInstagram />
          <p>Instagram</p>
        </a>
      ),
    },
    {
      icon: "ok",
      item: (
        <a
          target="blank"
          className="flex items-center gap-2 justify-center"
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        >
          <FaLine />
          <p>Line</p>
        </a>
      ),
    },
    {
      id: 4,
      icon: "ok",
      item: (
        <a
          target="blank"
          className="flex items-center gap-2 justify-center"
          href={`https://twitter.com/intent/tweet?text=${url}`}
        >
          <RxTwitterLogo />
          <p>Twitter</p>
        </a>
      ),
    },
  ];

  return (
    <div>
      <h2 className="mb-4">分享此房源</h2>
      <div className="grid grid-cols-2 gap-2">
        <CopyToClipboard text={url}>
          <button
            onClick={() => {
              setCopied(true);
            }}
            className="py-6 px-8 border rounded-xl hover:bg-gray-100 cursor-pointer"
          >
            {copied ? (
              <div className="flex items-center gap-2 justify-center">
                <AiOutlineCheck className="text-green-600" /> <p>已複製</p>
              </div>
            ) : (
              <div className="flex items-center gap-2 justify-center">
                <FiCopy /> <p>複製此連結</p>
              </div>
            )}
          </button>
        </CopyToClipboard>
        {items.map((item) => {
          return (
            <button
              key={item.id}
              className="py-6 px-8 border rounded-xl hover:bg-gray-100 cursor-pointer"
            >
              {item.item}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default SharePlaceModal;
