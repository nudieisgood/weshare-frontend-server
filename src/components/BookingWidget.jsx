import { usePlacePageContext } from "../pages/PlacePage";
import { differenceInCalendarDays } from "date-fns";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ModalContainer from "./ModalContainer";
import BookingWidgetModal from "./BookingWidgetModal";
import { useAppContext } from "../context/appContext";

const BookingWidget = () => {
  const { user } = useAppContext();
  const { price, _id, title, owner } = usePlacePageContext();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numOfGuest, setNumOfGuest] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const x = window.matchMedia("(max-width: 770px)");

    function hideModal() {
      if (showModal) setShowModal(false);
    }

    x.addListener(hideModal);

    return () => x.removeListener(hideModal);
  });

  let numOfNights = 0;
  let formatCheckInDate = "";
  let formatCheckOutDate = "";
  if (checkIn && checkOut) {
    numOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );

    const checkOutDay = new Date(checkOut).getDate();
    const checkOutMon = new Date(checkOut).getMonth() + 1;
    const checkInDay = new Date(checkIn).getDate();
    const checkInMon = new Date(checkIn).getMonth() + 1;

    formatCheckInDate = `${checkInMon}月${checkInDay}日`;
    formatCheckOutDate = `${checkOutMon}月${checkOutDay}日`;
  }

  const totalPrice = numOfNights * price * numOfGuest;
  const cleanPrice = Math.round(numOfNights * price * 0.1);
  const servicePrice = Math.round((totalPrice + cleanPrice * 0.1) * 0.1);
  const finalPrice = totalPrice + cleanPrice + servicePrice;

  if (!user) {
    return (
      <>
        <div className="bg-gray-200 rounded-xl self-start p-4 text-center md:grid gap-4 hidden sticky top-20">
          <div className="text-2xl text-center font-bold">
            價格: ${price} / 每晚
          </div>
          <h2>立刻登入預訂，享住房最低價格</h2>
          <Link to="/login">
            <button className="bg-primary rounded-lg text-white w-6/12">
              登入
            </button>
          </Link>
        </div>
        <div className="fixed bottom-0 left-0 w-full md:hidden bg-white py-2 text-center">
          <div className="text-xl text-center font-bold">${price} / 每晚</div>
          <p className="text-sm text-gray-400">立刻登入預訂，享住房最低價格</p>
          <Link to="/login">
            <button className="bg-primary w-6/12 rounded-lg text-white">
              登入
            </button>
          </Link>
        </div>
      </>
    );
  }

  if (user._id === owner._id) {
    return (
      <>
        <div className="bg-gray-200 rounded-xl self-start p-4 text-center md:grid gap-4 hidden sticky top-20">
          <div className="text-2xl text-center font-bold">很抱歉。</div>
          <h2>您無法對自己持有的住所下訂單，請使用其它帳戶預訂。</h2>
          <button className="primary w-6/12">登入其它帳戶</button>
        </div>
        <div className="fixed bottom-0 left-0 w-full md:hidden bg-white py-2 text-center">
          <p className="text-sm text-gray-400">
            您無法對自己持有的住所下訂單，請使用其它帳戶預訂。
          </p>
          <button className="bg-primary w-6/12 rounded-lg text-white">
            登入其它帳戶
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      {showModal && (
        <ModalContainer setShowModal={setShowModal} classNames="md:hidden">
          <BookingWidgetModal
            title={title}
            checkIn={checkIn}
            setCheckIn={setCheckIn}
            checkOut={checkOut}
            setCheckOut={setCheckOut}
            numOfGuest={numOfGuest}
            setNumOfGuest={setNumOfGuest}
            numOfNights={numOfNights}
            price={price}
            servicePrice={servicePrice}
            totalPrice={totalPrice}
            finalPrice={finalPrice}
            cleanPrice={cleanPrice}
            _id={_id}
          />
        </ModalContainer>
      )}
      <div className="hidden md:block sticky top-20 justify-self-end self-start bg-white shadow p-5 rounded-2xl max-w-lg">
        <BookingWidgetModal
          title={title}
          checkIn={checkIn}
          setCheckIn={setCheckIn}
          checkOut={checkOut}
          setCheckOut={setCheckOut}
          numOfGuest={numOfGuest}
          setNumOfGuest={setNumOfGuest}
          numOfNights={numOfNights}
          price={price}
          servicePrice={servicePrice}
          totalPrice={totalPrice}
          finalPrice={finalPrice}
          cleanPrice={cleanPrice}
          _id={_id}
        />
      </div>

      <div className="fixed left-0 bottom-0 w-full md:hidden bg-white px-6 py-4 shadow-2xl shadow-black">
        {numOfNights > 0 ? (
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <p className="font-bold">總價</p>
                <p>${finalPrice} TWD</p>
              </div>
              <div className="flex gap-2">
                <p>
                  {formatCheckInDate}至{formatCheckOutDate}
                </p>
                <p>{numOfNights} 晚</p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowModal(true);
              }}
              className="bg-primary rounded-lg text-white text-sm p-2"
            >
              更改 / 預定
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p>${price} / 晚</p>
            <button
              onClick={() => {
                setShowModal(true);
              }}
              className="bg-primary rounded-lg text-white text-sm p-2"
            >
              立刻預定
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default BookingWidget;
