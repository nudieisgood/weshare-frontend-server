import { BiLogInCircle } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { BsPersonGear } from "react-icons/bs";
import { MdOutlineAddHomeWork } from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";
import { MdOutlineCardTravel } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";

export const DropDownItems = {
  ifLogin: [
    {
      icon: <BsPersonGear className="text-xl" />,
      name: "管理帳戶",
      goTo: "/account",
    },
    {
      icon: <MdOutlineAddHomeWork className="text-xl" />,
      name: "管理房源",
      goTo: "/account/places",
    },
    {
      icon: <LuClipboardList className="text-xl" />,
      name: "我的訂單",
      goTo: "/account/orders",
    },
    {
      icon: <MdOutlineCardTravel className="text-xl" />,
      name: "我的旅程",
      goTo: "/account/bookings",
    },
    {
      icon: <AiOutlineHeart className="text-xl" />,
      name: "我的收藏",
      goTo: "/my-favs-page",
    },
  ],
  ifNotLogin: [
    {
      icon: <BiLogInCircle className="text-xl" />,
      name: "登入",
      goTo: "/login",
    },
    {
      icon: <FiEdit className="text-xl" />,
      name: "註冊",
      goTo: "/register",
    },
  ],
};
