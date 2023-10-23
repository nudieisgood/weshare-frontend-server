import { Link, useLocation } from "react-router-dom";
import { IoEarth } from "react-icons/io5";
import { FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";
import { AiOutlineFacebook } from "react-icons/ai";

const Footer = () => {
  const location = useLocation();

  let footerBg;
  if (
    location.pathname.startsWith("/account/bookings") ||
    location.pathname.startsWith("/place")
  ) {
    footerBg = "bg-white";
  } else {
    footerBg = "bg-gray-100";
  }

  return (
    <section
      className={`${footerBg} pt-10 px-6 lg:px-14 mt-10 -mx-4 sm:-mx-8 lg:-mx-20`}
    >
      <div className="grid grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-1">
            <IoEarth className="text-primary text-4xl" />
            <div className="font-semibold text-primary text-2xl">WeShare</div>
          </Link>
          <div className="mt-4 ml-2 flex gap-2 text-gray-700 text-lg items-center">
            <a className="" href="">
              <FiInstagram />
            </a>
            <a className="" href="">
              <AiOutlineFacebook />
            </a>
            <a className="" href="">
              <FiTwitter />
            </a>
            <a className="" href="">
              <FiYoutube />
            </a>
          </div>
        </div>
        <div className="flex flex-col text-gray-600 text-sm gap-2">
          <p className="font-bold">出租房源和舉辦體驗</p>
          <Link className="hover:underline" to={"/account/places"}>
            出租房源
          </Link>
          <a className="hover:underline" href="/">
            出租和舉辦體驗的相關資源
          </a>
          <a className="hover:underline" href="/">
            社區論壇
          </a>
          <a className="hover:underline" href="/">
            房東及體驗達人義務
          </a>
        </div>
        <div className="flex flex-col text-gray-600 text-sm gap-2">
          <p className="font-bold">出租房源和舉辦體驗</p>
          <Link className="hover:underline" to={"/account/places"}>
            出租房源
          </Link>
          <a className="hover:underline" href="/">
            出租和舉辦體驗的相關資源
          </a>
          <a className="hover:underline" href="/">
            社區論壇
          </a>
          <a className="hover:underline" href="/">
            房東及體驗達人義務
          </a>
        </div>
        <div className="flex flex-col text-gray-600 text-sm gap-2">
          <p className="font-bold">聯絡我們</p>
          <p>
            地址 :
            <a
              className="ml-1"
              target="blank"
              href="http://maps.google.com/?q=台北市內湖區民權東路六段15巷39號3樓"
            >
              台北市內湖區民權東路六段15巷39號3樓
            </a>
          </p>
          <p>電話：+886-2-2792-7728</p>
          <p>服務時間：週一～週五 上午9:00~下午06:00</p>
          <p>週六, 日及國定假日休息</p>
        </div>
      </div>
      <div className="text-center border-t text-gray-400 py-2 mt-10">
        Copyright © 2023 by Jeremy Chan, Inc. All rights reserved.
      </div>
    </section>
  );
};
export default Footer;
