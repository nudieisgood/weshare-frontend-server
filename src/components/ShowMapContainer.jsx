import { BiError } from "react-icons/bi";

const ShowMapContainer = ({ city, geoLocation }) => {
  return (
    <div className="border-t">
      <h1 className="text-2xl my-4 ">住宿地點</h1>
      <div className="text-md mb-4">{city} 台灣</div>
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
