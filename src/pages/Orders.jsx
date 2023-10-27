import customFetch from "../utilits/customFetch";
import { useLoaderData, Link } from "react-router-dom";
import { OrderItem } from "../components";

import { forMatDate, sortBookingsByCheckInDate } from "../utilits/helper";

export const loader = async () => {
  try {
    const res = await customFetch.get("/booking/orders");
    return res.data;
  } catch (error) {
    return error;
  }
};

const Orders = () => {
  const { data: orders } = useLoaderData();

  const checkInDates = orders.map((order) => order.checkIn);

  const setedCheckInDates = [...new Set(checkInDates)];

  if (orders.length === 0)
    return (
      <div className="text-center mt-5">
        <Link className="text-2xl hover:text-primary" to={"/"}>
          暫時無任何訂房產生。
        </Link>
      </div>
    );

  return (
    <section className="flex flex-col gap-4 max-w-6xl mx-auto">
      {setedCheckInDates.length > 0 &&
        setedCheckInDates.map((date) => (
          <div key={date}>
            <div className="text-2xl mb-2">{forMatDate(date)}</div>
            {sortBookingsByCheckInDate(orders)
              .filter((order) => order.checkIn === date)
              .map((order) => (
                <OrderItem key={order._id} order={order} />
              ))}
          </div>
        ))}
    </section>
  );
};
export default Orders;

// const todayToCheckOutDay = differenceInCalendarDays(
//   new Date(),
//   new Date(order.checkOut)
// );

// const isFinishedAccommodate = todayToCheckOutDay >= 0;

// const { bookingStatus } = order;
// let bookingStatusInCh;
// if (bookingStatus === "pending") bookingStatusInCh = "等待中";
// if (bookingStatus === "confirm") bookingStatusInCh = "已確認";
// if (bookingStatus === "cancel") bookingStatusInCh = "已取消";
// if (bookingStatus === "failed") bookingStatusInCh = "未完成";
// if (bookingStatus === "completed") bookingStatusInCh = "已完成";

{
  /* {bookingStatus === "pending" && (
                  <>
                    <div className="grid justify-items-end gap-1">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            confirmBooking("cancel", order._id);
                          }}
                          className="text-xs md:text-sm bg-gray-300 rounded-2xl px-3 py-1 hover:bg-primary"
                        >
                          <p>{bookingStatus === "pending" && "取消此訂單"}</p>
                        </button>
                        <button
                          onClick={() => {
                            confirmBooking("confirm", order._id);
                          }}
                          className="text-xs md:text-sm bg-yellow-200 rounded-2xl px-3 py-1 hover:bg-yellow-400"
                        >
                          <p>{bookingStatus === "pending" && "確認此訂單"}</p>
                        </button>
                      </div>
                      <p className="text-gray-500 text-xs md:text-sm">
                        若訂單無誤， 請立即確認，以利房客安排行程
                      </p>
                    </div>
                  </>
                )}
                {(bookingStatus === "confirm" || bookingStatus === "cancel") &&
                  !isFinishedAccommodate && (
                    <div className="text-xs md:text-sm bg-gray-500 text-white rounded-2xl px-3 py-1">
                      {bookingStatusInCh}
                    </div>
                  )}
                {bookingStatus === "confirm" && isFinishedAccommodate && (
                  <>
                    <div className="grid justify-items-end gap-1">
                      <div className="flex flex-col gap-2">
                        <p className="text-xs">
                          此入住已到完成時間，請確認入住狀態，以利完成訂單
                        </p>
                        <div className="text-end">
                          <button
                            onClick={() => {
                              confirmBooking("completed", order._id);
                            }}
                            className="mb-1 text-xs md:text-sm bg-yellow-200 rounded-2xl px-3 py-1 hover:bg-yellow-400"
                          >
                            <p>入住完成</p>
                          </button>
                        </div>
                        <div className="text-end">
                          <button
                            onClick={() => {
                              confirmBooking("failed", order._id);
                            }}
                            className="mb-1 text-xs md:text-sm bg-gray-300 rounded-2xl px-3 py-1 hover:bg-gray-400"
                          >
                            <p>入住未完成</p>
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {(bookingStatus === "completed" ||
                  bookingStatus === "failed") && (
                  <div className="text-xs md:text-sm bg-gray-500 text-white rounded-2xl px-3 py-1">
                    {bookingStatusInCh}
                  </div>
                )} */
}

// {orders.map((order) => {
//   return (
//     <div
//       key={order._id}
//       className="flex lg:gap-3 bg-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
//     >
//       <div className="w-32 sm:w-40 flex shrink-0 md:w-64">
//         <img
//           src={order.place.photos[0]}
//           className="object-cover aspect-video"
//         />
//       </div>
//       <div className="p-2 flex flex-col gap-2 grow">
//         <h2 className="text-md sm:text-lg mt-2">
//           預訂房源： {order.place.title}
//         </h2>
//         <tr className="border-t m-2"></tr>
//         <h2 className="text-sm sm:text-md">訂房姓名：{order.name}</h2>
//         <h2 className="text-sm sm:text-md">聯絡電話：{order.phone}</h2>
//         <h2 className="text-sm sm:text-md">信箱：{order.user.email}</h2>
//         <tr className="border-t m-2"></tr>
//         <BookingInfo
//           numOfNights={order.numOfNights}
//           checkIn={order.checkIn}
//           checkOut={order.checkOut}
//           numOfGuest={order.numOfGuest}
//         />
//         <tr className="border-t m-2"></tr>
//         <div className="flex justify-between items-end mt-2 text-md sm:text-lg md:text-xl">
//           <div className="flex gap-1 items-center">
//             ${order.price} TWD
//             {
//               <span className="ml-2 text-sm bg-gray-300 py-1 px-2 rounded-lg flex gap-1 items-center">
//                 {order.payment === "入住時付款" ? (
//                   <TbPigMoney className="text-xl" />
//                 ) : (
//                   <MdCreditCard className="text-xl" />
//                 )}
//                 {order.payment}
//               </span>
//             }
//           </div>
//           <OrderStatus {...order} confirmBooking={confirmBooking} />
//         </div>
//       </div>
//     </div>
//   );
// })}
