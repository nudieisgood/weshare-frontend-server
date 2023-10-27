import { TbBeach } from "react-icons/tb";
import { BiLandscape, BiSolidCity } from "react-icons/bi";
import { PiParkDuotone } from "react-icons/pi";
import { LiaCampgroundSolid } from "react-icons/lia";
import { GiSeaCreature, GiMeditation, GiIsland, GiSheep } from "react-icons/gi";
import { MdOutlineSurfing } from "react-icons/md";

export const envOptions = [
  { type: "海邊", icon: <TbBeach /> },
  { type: "絕美景致", icon: <BiLandscape /> },
  { type: "國家公園", icon: <PiParkDuotone /> },
  { type: "鄉村", icon: <LiaCampgroundSolid /> },
  { type: "城市", icon: <BiSolidCity /> },
  { type: "湖景", icon: <GiSeaCreature /> },
  { type: "衝浪", icon: <MdOutlineSurfing /> },
  { type: "遠離塵囂", icon: <GiMeditation /> },
  { type: "休閒農場", icon: <GiSheep /> },
  { type: "島嶼", icon: <GiIsland /> },
];
