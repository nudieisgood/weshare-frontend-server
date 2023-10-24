import { isFinishedAccommodate } from "../utilits/helper";

const OrderStatus = ({ bookingStatus, _id, confirmBooking, checkOut }) => {
  let bookingStatusInCh;
  if (bookingStatus === "pending") bookingStatusInCh = "等待中";
  if (bookingStatus === "confirm") bookingStatusInCh = "已確認";
  if (bookingStatus === "cancel") bookingStatusInCh = "已取消";
  if (bookingStatus === "failed") bookingStatusInCh = "未完成";
  if (bookingStatus === "completed") bookingStatusInCh = "已完成";

  if (bookingStatus === "pending")
    return (
      <>
        <div className="grid justify-items-end gap-1">
          <div className="flex flex-col gap-2">
            <p className="text-gray-500 text-xs md:text-sm">
              若訂單無誤， 請立即確認，以利房客安排行程
            </p>
            <div className="text-end">
              <button
                onClick={() => {
                  confirmBooking("confirm", _id);
                }}
                className="text-xs md:text-sm bg-yellow-200 rounded-2xl px-3 py-1 hover:bg-yellow-400"
              >
                <p>{bookingStatus === "pending" && "確認"}</p>
              </button>
            </div>
            <div className="text-end">
              <button
                onClick={() => {
                  confirmBooking("cancel", _id);
                }}
                className="text-xs md:text-sm bg-gray-300 rounded-2xl px-3 py-1 hover:bg-primary"
              >
                <p>{bookingStatus === "pending" && "取消"}</p>
              </button>
            </div>
          </div>
        </div>
      </>
    );

  if (bookingStatus === "confirm" && !isFinishedAccommodate(checkOut))
    return (
      <div className="text-xs md:text-sm bg-gray-500 text-white rounded-2xl px-3 py-1">
        {bookingStatusInCh}
      </div>
    );

  if (bookingStatus === "cancel")
    return (
      <div className="text-xs md:text-sm bg-gray-500 text-white rounded-2xl px-3 py-1">
        {bookingStatusInCh}
      </div>
    );

  if (bookingStatus === "confirm" && isFinishedAccommodate(checkOut))
    return (
      <>
        <div className="grid justify-items-end gap-1">
          <div className="flex flex-col gap-2">
            <p className="text-gray-500  text-xs md:text-sm">
              此入住已到完成時間，請確認入住是否完成。
            </p>
            <div className="text-end">
              <button
                onClick={() => {
                  confirmBooking("completed", _id);
                }}
                className="mb-1 text-xs md:text-sm bg-yellow-200 rounded-2xl px-3 py-1 hover:bg-yellow-400"
              >
                <p>完成</p>
              </button>
            </div>
            <div className="text-end">
              <button
                onClick={() => {
                  confirmBooking("failed", _id);
                }}
                className="mb-1 text-xs md:text-sm bg-gray-300 rounded-2xl px-3 py-1 hover:bg-gray-400"
              >
                <p>未完成</p>
              </button>
            </div>
          </div>
        </div>
      </>
    );

  if (bookingStatus === "completed" || bookingStatus === "failed")
    return (
      <div className="text-xs md:text-sm bg-gray-500 text-white rounded-2xl px-3 py-1">
        {bookingStatusInCh}
      </div>
    );
};
export default OrderStatus;
