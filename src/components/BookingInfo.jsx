import { MdOutlineBedtime } from "react-icons/md";
import { BsPeople, BsPerson } from "react-icons/bs";
import { BiCalendarCheck } from "react-icons/bi";
import { forMatCheckOutDate, forMatCheckInDate } from "../utilits/helper";
import { useState } from "react";

const BookingInfo = ({ numOfNights, checkIn, checkOut, numOfGuest }) => {
  const [showDrop, setShowDrop] = useState(false);
  const showCalendarDays = (checkIn, checkOut) => {
    return (
      <div
        className="flex items-center gap-1 relative"
        onMouseEnter={() => {
          setShowDrop(!showDrop);
        }}
        onMouseLeave={() => {
          setShowDrop(!showDrop);
        }}
      >
        <BiCalendarCheck className="text-2xl" />
        <div className="hidden sm:block">
          {forMatCheckInDate(checkIn)} ~ {forMatCheckOutDate(checkOut)}
        </div>
        {showDrop && (
          <div className="absolute bottom-7 -right-8 bg-gray-300 py-2 rounded-lg sm:hidden w-56 text-center text-lg">
            {forMatCheckInDate(checkIn)} ~ {forMatCheckOutDate(checkOut)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex gap-4 text-gray-500 text-xs sm:text-sm">
      <div className="flex items-center gap-1">
        <MdOutlineBedtime className="text-2xl" />
        {numOfNights} <p>晚</p>
      </div>
      {showCalendarDays(checkIn, checkOut)}
      <div className="flex items-center gap-1">
        {numOfGuest > 1 ? (
          <BsPeople className="text-2xl" />
        ) : (
          <BsPerson className="text-2xl" />
        )}
        {numOfGuest} <p>人</p>
      </div>
    </div>
  );
};
export default BookingInfo;
