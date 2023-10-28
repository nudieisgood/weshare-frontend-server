import { BiError } from "react-icons/bi";
import { GoChecklist } from "react-icons/go";
import { useLocation } from "react-router-dom";

const ShowMapContainer = ({ address, city, geoLocation, isBookingConfirm }) => {
  console.log(isBookingConfirm);
  const location = useLocation();
  const isBookingPage = location.pathname.startsWith("/account/bookings");
  return (
    <div className="border-t">
      <h1 className="text-2xl my-4 ">住宿地點</h1>
      <div className="text-md mb-4">
        <p>
          {isBookingPage ? (isBookingConfirm ? `${address}` : "") : `${city}`}
        </p>
        <p className="mt-4">
          {isBookingPage ? (
            ""
          ) : (
            <div className="flex items-center gap-1">
              <GoChecklist className="text-xl" />
              預定確認後可以在訂單查看完整地址
            </div>
          )}
        </p>
      </div>
      {!geoLocation?.lat ? (
        <div className="p-8 items-center flex gap-2">
          <BiError className="text-2xl" />
          很抱歉，地圖載入失敗，待房主更新地址資料...
        </div>
      ) : (
        <iframe
          src={`https://maps.google.com/maps?q=${geoLocation?.lat},${geoLocation?.lng}&z=15&output=embed`}
          allowFullScreen=""
          className="w-full h-64 sm:h-72 md:h-96"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      )}
    </div>
  );
};
export default ShowMapContainer;
