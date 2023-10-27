import {
  FaAccessibleIcon,
  FaKitchenSet,
  FaDog,
  FaFireExtinguisher,
} from "react-icons/fa6";
import {
  MdOutlineAir,
  MdOutlineLocalLaundryService,
  MdOutlineBreakfastDining,
  MdMonitor,
  MdOutlinePool,
  MdWifi,
  MdOutlineBatteryAlert,
  MdWash,
  MdOutlineYard,
  MdOutlineElevator,
  MdBalcony,
} from "react-icons/md";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import { AiFillAlert } from "react-icons/ai";
import { BiLock, BiLogoInternetExplorer } from "react-icons/bi";
import { GiTable } from "react-icons/gi";
import { LuUtensilsCrossed, LuMicrowave } from "react-icons/lu";
import { LiaHotTubSolid, LiaUtensilsSolid } from "react-icons/lia";
import { TbIroning, TbParking, TbTeapot } from "react-icons/tb";
import { BsPersonWorkspace, BsDoorClosed } from "react-icons/bs";
import { RiNetflixFill } from "react-icons/ri";
import { CgGym } from "react-icons/cg";

export const perkOptions = [
  {
    type: "Wifi",
    icon: <MdWifi />,
  },
  { type: "網路孔", icon: <BiLogoInternetExplorer /> },
  {
    type: "障礙者輔助設備",
    icon: <FaAccessibleIcon />,
  },
  {
    type: "空調設備",
    icon: <MdOutlineAir />,
  },
  {
    type: "電視機",
    icon: <MdMonitor />,
  },
  {
    type: "烘衣機",
    icon: <MdOutlineLocalLaundryService />,
  },
  {
    type: "吹風機",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
        />
      </svg>
    ),
  },
  {
    type: "早餐",
    icon: <MdOutlineBreakfastDining />,
  },
  { type: "洗衣機", icon: <CgSmartHomeWashMachine /> },
  { type: "熨斗", icon: <TbIroning /> },
  { type: "共用室外泳池：按季節開放", icon: <MdOutlinePool /> },
  { type: "浴缸", icon: <LiaHotTubSolid /> },
  { type: "可攜帶寵物", icon: <FaDog /> },
  { type: "戶外用餐區", icon: <LuUtensilsCrossed /> },
  { type: "盤子和餐具", icon: <LiaUtensilsSolid /> },
  { type: "餐桌", icon: <GiTable /> },
  { type: "專屬工作空間", icon: <BsPersonWorkspace /> },
  { type: "免費洗浴用品", icon: <MdWash /> },
  { type: "保險鎖", icon: <BiLock /> },
  { type: "Netflix", icon: <RiNetflixFill /> },
  { type: "一氧化碳警報器", icon: <MdOutlineBatteryAlert /> },
  { type: "煙霧警報器", icon: <AiFillAlert /> },
  { type: "滅火器", icon: <FaFireExtinguisher /> },
  { type: "微波爐", icon: <LuMicrowave /> },
  { type: "熱水壺", icon: <TbTeapot /> },
  { type: "獨立入口", icon: <BsDoorClosed /> },
  { type: "後院", icon: <MdOutlineYard /> },
  { type: "私人露台或陽台", icon: <MdBalcony /> },
  { type: "電梯", icon: <MdOutlineElevator /> },
  { type: "建築物內的的共用健身房", icon: <CgGym /> },

  {
    type: "免費停車",
    icon: <TbParking />,
  },
  {
    type: "廚房",
    icon: <FaKitchenSet />,
  },
];
