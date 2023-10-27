import { FaCampground } from "react-icons/fa";
import { BiBuildingHouse, BiHomeCircle, BiBed } from "react-icons/bi";
import { BsHouse, BsHouses } from "react-icons/bs";
import { HiHome } from "react-icons/hi2";
import { GiFamilyHouse } from "react-icons/gi";
import { IoHomeOutline } from "react-icons/io5";

export const roomTypes = [
  { type: "獨立房間", icon: <BiBed /> },
  { type: "獨棟套房", icon: <BsHouses /> },
  { type: "整套房源", icon: <BsHouse /> },
  { type: "整套私有公寓", icon: <BiBuildingHouse /> },
  { type: "整套別墅", icon: <GiFamilyHouse /> },
  { type: "露營地", icon: <FaCampground /> },
  { type: "小木屋", icon: <HiHome /> },
  { type: "迷你屋", icon: <BiHomeCircle /> },
  { type: "家庭式旅館", icon: <IoHomeOutline /> },
];
