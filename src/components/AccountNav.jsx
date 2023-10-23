import { NavLink, useLocation } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import { PiBookOpenTextLight } from "react-icons/pi";
import { useState } from "react";
import { LuClipboardList } from "react-icons/lu";
import { MdOutlineCardTravel } from "react-icons/md";

const AccountNav = () => {
  const [showDrop, setShowDrop] = useState(false);

  const activeMyBooking =
    useLocation()?.pathname === "/account/bookings" ||
    useLocation()?.pathname === "/account/orders";

  return (
    <nav className="w-full flex justify-center items-center mt-8 gap-4">
      <NavLink
        end
        className="flex gap-1 account py-2 px-6 rounded-full transition ease-in-out delay-100 hover:border"
        to="."
      >
        <BsPerson className="text-2xl" />
        <p className="hidden sm:block">個人檔案</p>
      </NavLink>
      <div
        onMouseEnter={() => {
          setShowDrop(!showDrop);
        }}
        onMouseLeave={() => {
          setShowDrop(!showDrop);
        }}
        className={`${
          activeMyBooking && "active"
        } relative flex gap-1 account py-2 px-6 rounded-full transition ease-in-out delay-100 hover:border cursor-pointer`}
      >
        <PiBookOpenTextLight className="text-2xl" />
        <p className="hidden sm:block">預約資訊</p>
        <div
          className={`w-40 absolute top-10 right-0 z-20 bg-white shadow rounded-xl px-4 py-2 ${
            !showDrop && "hidden"
          }`}
        >
          <div className="grid gap-2">
            <NavLink
              className="flex gap-2 items-center hover:text-primary text-black"
              to="bookings"
            >
              <MdOutlineCardTravel />
              <p>我的旅程</p>
            </NavLink>

            <NavLink
              className="flex gap-2 items-center hover:text-primary text-black"
              to="orders"
            >
              <LuClipboardList />
              <p>我的房源訂單</p>
            </NavLink>
          </div>
        </div>
      </div>
      <NavLink
        className="flex gap-1 account py-2 px-6 rounded-full transition ease-in-out delay-100 hover:border"
        to="places"
      >
        <IoHomeOutline className="text-2xl" />
        <p className="hidden sm:block">我的空間</p>
      </NavLink>
    </nav>
  );
};
export default AccountNav;
