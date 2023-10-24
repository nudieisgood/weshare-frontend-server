import BookingInfo from "./BookingInfo";
import OrderStatus from "./OrderStatus";
import { MdCreditCard } from "react-icons/md";
import { TbPigMoney } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import customFetch from "../utilits/customFetch";

const OrderItem = ({ order }) => {
  const [showDrop, setShowDrop] = useState(false);

  const navigate = useNavigate();

  const confirmBooking = async (status, bookingId) => {
    try {
      await customFetch.patch(`/booking/${bookingId}`, {
        bookingStatus: status,
      });
      navigate("");
    } catch (error) {
      console.log(error);
    }
  };

  const shortTitle =
    order.place.title.length > 10
      ? order.place.title.slice(0, 10) + "  ..."
      : order.place.title;

  return (
    <div
      key={order._id}
      className="flex lg:gap-3 bg-gray-100 rounded-xl overflow-hidden shadow-md transition-all mb-4"
    >
      <div className="flex shrink-0 p-4">
        <img
          src={order.place.photos[0]}
          className=" w-32 h-32  sm:w-40 sm:h-40 md:h-56 md:w-56 object-cover aspect-video rounded-xl"
        />
      </div>
      <div className="p-2 flex flex-col gap-2 grow">
        <h2 className="text-md sm:text-lg mt-2 md:hidden">
          預訂房源： {shortTitle}
        </h2>
        <h2 className="text-md sm:text-lg mt-2 hidden md:block">
          預訂房源： {order.place.title}
        </h2>
        <tr className="border-t m-2"></tr>
        <h2 className="text-sm sm:text-md">訂房姓名：{order.name}</h2>
        <h2 className="text-sm sm:text-md">聯絡電話：{order.phone}</h2>
        <h2 className="text-sm sm:text-md">信箱：{order.user.email}</h2>
        <tr className="border-t m-2"></tr>
        <BookingInfo
          numOfNights={order.numOfNights}
          checkIn={order.checkIn}
          checkOut={order.checkOut}
          numOfGuest={order.numOfGuest}
        />
        <tr className="border-t m-2"></tr>
        <div className="flex justify-between items-end mt-2 text-md sm:text-lg md:text-xl">
          <div className="flex gap-1 items-center">
            ${order.price} <p className="hidden sm:block">TWD</p>
            {
              <div
                onMouseEnter={() => {
                  setShowDrop(!showDrop);
                }}
                onMouseLeave={() => {
                  setShowDrop(!showDrop);
                }}
                className="relative ml-2 text-sm bg-gray-300 py-1 px-2 rounded-lg flex gap-1 items-center"
              >
                {showDrop && (
                  <div className="absolute bottom-8 bg-gray-300 py-2 rounded-lg sm:hidden w-24 text-center">
                    <p>{order.payment}</p>
                  </div>
                )}
                {order.payment === "入住時付款" ? (
                  <TbPigMoney className="text-xl" />
                ) : (
                  <MdCreditCard className="text-xl" />
                )}
                <div className="hidden sm:block">{order.payment}</div>
              </div>
            }
          </div>
          <OrderStatus {...order} confirmBooking={confirmBooking} />
        </div>
      </div>
    </div>
  );
};
export default OrderItem;
