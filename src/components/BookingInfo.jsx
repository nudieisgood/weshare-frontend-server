import { MdOutlineBedtime } from "react-icons/md";
import { BsPeople, BsPerson } from "react-icons/bs";
import { BiCalendarCheck } from "react-icons/bi";
import { forMatCheckOutDate, forMatCheckInDate } from "../utilits/helper";

const BookingInfo = ({ numOfNights, checkIn, checkOut, numOfGuest }) => {
  const showCalendarDays = (checkIn, checkOut) => {
    return (
      <div className="flex items-center gap-1">
        <BiCalendarCheck className="sm:text-2xl" />
        {forMatCheckInDate(checkIn)} ~ {forMatCheckOutDate(checkOut)}
      </div>
    );
  };

  return (
    <div className="flex gap-4 text-gray-500 text-xs sm:text-sm">
      <div className="flex items-center gap-1">
        <MdOutlineBedtime className="sm:text-2xl" />
        {numOfNights} 晚
      </div>
      {showCalendarDays(checkIn, checkOut)}
      <div className="flex items-center gap-1">
        {numOfGuest > 1 ? (
          <BsPeople className="sm:text-2xl" />
        ) : (
          <BsPerson className="sm:text-2xl" />
        )}
        {numOfGuest} 人
      </div>
    </div>
  );
};
export default BookingInfo;
