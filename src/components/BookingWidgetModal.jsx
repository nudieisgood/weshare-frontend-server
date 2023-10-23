import { Link } from "react-router-dom";
import { usePlacePageContext } from "../pages/PlacePage";

const BookingWidgetModal = ({
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  numOfGuest,
  setNumOfGuest,
  numOfNights,
  totalPrice,
  cleanPrice,
  finalPrice,
  servicePrice,
}) => {
  const { price, _id, title, maxGuests } = usePlacePageContext();

  return (
    <div>
      <div className="text-2xl text-center font-bold">
        價格: ${price} / 每晚
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex justify-center">
          <div className="py-3 px-4 border-1">
            <label htmlFor="checkInTime">入住日期</label>
            <input
              type="date"
              id="checkInTime"
              name="checkInTime"
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
              }}
            />
          </div>
          <div className="py-3 px-4 border-1">
            <label htmlFor="checkOutTime">離開日期</label>
            <input
              type="date"
              id="checkOutTime"
              name="checkOutTime"
              value={checkOut}
              onChange={(e) => {
                setCheckOut(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="py-3 px-4 border-t">
          <label htmlFor="numOfGuest">訂房人數</label>
          {numOfGuest > maxGuests && (
            <p className="text-primary text-xs py-1">超過可預訂人數</p>
          )}
          <input
            type="number"
            id="numOfGuest"
            name="numOfGuest"
            value={numOfGuest}
            onChange={(e) => {
              setNumOfGuest(e.target.value);
            }}
          />
        </div>
      </div>
      {numOfNights > 0 && (
        <>
          <Link
            state={{
              finalPrice,
              title,
              _id,
              checkOut,
              checkIn,
              numOfGuest,
              numOfNights,
            }}
            to={`/book/${_id}`}
          >
            <button
              disabled={numOfGuest > maxGuests}
              className={
                numOfGuest > maxGuests
                  ? "mt-4 w-full rounded-lg text-white py-1 bg-gray-500"
                  : "bg-primary mt-4 w-full rounded-lg text-white py-1 cursor-pointer"
              }
            >
              預訂
            </button>
          </Link>
          <p className="text-center mt-4 text-gray-500">你暫時不會被收費</p>
          <div className="mt-4 text-xl text-gray-600 flex flex-col gap-4">
            <div className="flex justify-between">
              <p>
                $ {price} TWD x {numOfNights} 晚
              </p>
              <p>${totalPrice}</p>
            </div>
            <div className="flex justify-between">
              <p>清潔費</p>
              <p>${cleanPrice}</p>
            </div>
            <div className="flex justify-between">
              <p>Airbnb 服務費</p>
              <p>${servicePrice}</p>
            </div>
            <div className="border-t">
              <div className="flex justify-between mt-4">
                <p className="font-bold">總價</p>
                <p>${finalPrice}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default BookingWidgetModal;
