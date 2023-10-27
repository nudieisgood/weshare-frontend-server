import { useState } from "react";
import { useEffect } from "react";
import customFetch from "../utilits/customFetch";

const ShowMapContainer = ({ address, city }) => {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const getmapData = async () => {
    const data = await customFetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyACQ_KonSkfzcMatergyAnqOeTCOJNtPM0`,
      { withCredentials: false }
    );

    const lat = data?.data?.results[0]?.geometry.location.lat;
    const lng = data?.data?.results[0]?.geometry.location.lng;
    setLat(lat);
    setLng(lng);
  };
  useEffect(() => {
    getmapData();
  }, []);
  return (
    <div className="border-t">
      <h1 className="text-2xl my-4 ">住宿地點</h1>
      <div>{lat}</div>
      <div>{lng}</div>
      <div className="text-xl mb-4">{city} 台灣</div>
      <iframe
        src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
        allowFullScreen=""
        className="w-full h-64 sm:h-72 md:h-96"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};
export default ShowMapContainer;
