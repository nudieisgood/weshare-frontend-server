import {
  useLoaderData,
  Link,
  useNavigate,
  Form,
  redirect,
  useNavigation,
  useActionData,
} from "react-router-dom";
import customFetch from "../utilits/customFetch";
import { MdCreditCard } from "react-icons/md";
import { RiCalendarCheckLine, RiCustomerService2Line } from "react-icons/ri";
import { FaRegQuestionCircle } from "react-icons/fa";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { Rating } from "react-simple-star-rating";

import { useState } from "react";
import {
  BookingInfo,
  PlacePhotosContainer,
  MorePics,
  Spinner,
  ShowMapContainer,
} from "../components";
import FormTextarea from "../components/FormTextarea";
import {
  isOkToCancelBooking,
  forMatCheckInDate,
  calDaysToCheckIn,
} from "../utilits/helper";

export const loader = async ({ params }) => {
  const { id } = params;
  try {
    const res = await customFetch.get(`/booking/${id}`);
    return res.data.data;
  } catch (error) {
    return error;
  }
};

export const action = async ({ params, request }) => {
  const { id: bookingId } = params;

  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post(`/booking/${bookingId}/reviews`, data);
    return redirect("");
  } catch (error) {
    return error.response.data.msg;
  }
};

const BookingPage = () => {
  const [showMorePics, setShowMorePics] = useState(false);
  const [rating, setRating] = useState(null);
  const bookingData = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const errorData = useActionData();

  const {
    checkIn,
    checkOut,
    name,
    numOfGuest,
    numOfNights,
    phone,
    place,
    price,
    user,
    _id,
    review,
    bookingStatus,
  } = bookingData;

  const { photos, title, _id: placeId } = place;

  const deleteBooking = async () => {
    try {
      await customFetch.delete(`/booking/${_id}`);
      navigate("/account/bookings/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  let bookingStatusInCh;
  let statusColor;
  let statusContent;
  if (bookingStatus === "pending") {
    bookingStatusInCh = "等待中";
    statusColor = "bg-yellow-500";
    statusContent = "等待訂單確認中";
  }
  if (bookingStatus === "confirm") {
    bookingStatusInCh = "已確認";
    statusColor = "bg-green-500";
    statusContent = "訂單已確認";
  }
  if (bookingStatus === "cancel") {
    bookingStatusInCh = "已取消";
    statusColor = "bg-primary";
    statusContent = "訂單已取消";
  }

  if (bookingStatus === "failed") {
    bookingStatusInCh = "未完成";
    statusColor = "bg-gray-500";
    statusContent = "訂單未完成";
  }

  if (bookingStatus === "completed") {
    bookingStatusInCh = "已完成";
    statusColor = "bg-gray-500";
    statusContent = review
      ? "訂單完成。"
      : "訂單完成，別忘了給予此住宿體驗評價。";
  }

  if (showMorePics)
    return <MorePics photos={photos} setShowMorePics={setShowMorePics} />;

  return (
    <div className="bg-gray-100 mt-4 -mx-4 sm:-mx-8 lg:-mx-20 px-4 sm:px-8 lg:px-20 py-8">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <div
            className={`text-white text-md rounded-lg py-1 px-2 ${statusColor}`}
          >
            {bookingStatusInCh}
          </div>
          <p className="text-gray-400 text-sm">{statusContent}</p>
        </div>
      </div>

      <Link
        to={`/place/${placeId}`}
        className="text-md sm:text-xl md:text-2xl mb-2 hover:underline"
      >
        {title}
      </Link>

      <div className="flex items-center justify-between">
        <BookingInfo
          checkIn={checkIn}
          numOfGuest={numOfGuest}
          checkOut={checkOut}
          numOfNights={numOfNights}
        />
      </div>
      <PlacePhotosContainer photos={photos} setShowMorePics={setShowMorePics} />

      <div className="grid gap-10 md:grid-cols-[4fr_2fr] mt-6">
        <div>
          <div className="flex gap-2">
            <RiCalendarCheckLine className="text-md sm:text-lg md:text-xl" />
            <div>
              <p>入住時間</p>
              <p className="font-bold tracking-widest">
                {forMatCheckInDate(checkIn)}
              </p>
              <p>{place.checkInTime}:00 起</p>
            </div>
            <div className="border-l mx-4"></div>
            <div>
              <p>退房時間</p>
              <p className="font-bold tracking-widest">
                {forMatCheckInDate(checkOut)}
              </p>
              <p>{place.checkOutTime}:00 前</p>
            </div>
          </div>
          <div className="border-t my-4"></div>
          <div className="flex gap-2">
            <HiOutlineClipboardDocumentList className="text-md sm:text-lg md:text-xl" />
            <div className="flex flex-col">
              <p className="font-bold mb-1">預定資料</p>
              <div className="grid grid-cols-2 gap-y-2 gap-x-10">
                <p>訂房者姓名</p>
                <p>{name}</p>
                <p>訂房者電話</p>
                <p>{phone}</p>
                <p>入住天數</p>
                <p>{numOfNights}</p>
                <p>入住人數</p>
                <p>{numOfGuest}</p>
              </div>
            </div>
          </div>
          <div className="border-t my-4"></div>
          <div className="flex gap-1 items-center text-md sm:text-lg md:text-xl">
            <MdCreditCard />
            總金額：{price}
          </div>
          <div className="border-t my-4"></div>
          <div>
            <p className="font-bold">顯示價格即為您需支付給住宿的總價</p>
            我們不會向顧客收取任何訂房手續費、行政費或其它費用。
            發卡單位可能會酌收海外消費手續費
          </div>
          <div className="border-t my-4"></div>
          <div className="mb-4">
            <p className="font-bold">其他資訊</p>
            額外服務（如加床）不包含在總價內。
            如果您未如期入住或取消訂單，住宿方可能仍會向您收取相關稅費。
            提醒您閱讀下方的重要資訊，內含更多其他重要內容
          </div>

          <div>
            <ShowMapContainer address={place.address} city={place.city} />
          </div>
          <div className="border-t my-4"></div>
          <div className="">
            <div className="flex gap-2">
              <FaRegQuestionCircle className="text-md sm:text-lg md:text-xl" />
              <p className="font-bold">需要協助嗎？</p>
            </div>
            <div className="px-4 py-2">
              <p>我們在此協助您找到答案及管理訂單</p>
              <Link className="text-primary flex gap-1 items-center" to={"/"}>
                <RiCustomerService2Line />
                聯繫客服人員
              </Link>
            </div>
          </div>
        </div>

        <div className="border rounded-xl p-4 sticky top-16 self-start bg-gray-200">
          {bookingStatus === "completed" && !review && (
            <Form className="mb-4" method="post">
              <div className="mb-2">
                <div className="flex gap-4 items-center">
                  <div className="text-2xl">滿意度</div>
                  {errorData?.split(",")?.includes("rating is required.") && (
                    <p className="text-primary">別忘了給予滿意度分數</p>
                  )}
                </div>

                <Rating
                  SVGstyle={{ display: "inline" }}
                  onClick={handleRating}
                  initialValue={rating}
                />
                <input
                  type="number"
                  value={rating}
                  name="rating"
                  className="hidden"
                  readOnly
                />
              </div>
              <FormTextarea labelText="請給予住宿體驗評價" name="content" />
              <button disabled={isSubmitting} className="primary" type="submit">
                {isSubmitting ? <Spinner /> : "提交"}
              </button>
            </Form>
          )}
          {bookingStatus === "completed" && review && (
            <div className="flex flex-col gap-2">
              <p className="font-bold">您對此次住宿的評價</p>
              <div className="w-12 h-12 rounded-lg bg-primary grid place-items-center">
                <p className="text-2xl text-white">{review.rating}</p>
              </div>

              <p className="font-bold">滿意這次住宿體驗嗎？</p>
              <Link className="underline" to={`/place/${placeId}`}>
                再次預約
              </Link>
              <Link className="underline" to={"/"}>
                查看更多住宿
              </Link>
            </div>
          )}

          {(bookingStatus === "cancel" || bookingStatus === "failed") && (
            <div className="flex flex-col gap-2">
              <p className="font-bold">還沒安排您的旅程嗎？</p>
              <Link className="underline" to={`/place/${placeId}`}>
                再次預約
              </Link>
              <Link className="underline" to={"/"}>
                查看更多住宿
              </Link>
            </div>
          )}
          {bookingStatus === "pending" && (
            <div>
              <p className="mb-2">
                訂單尚未確認，您現在可以<span className="font-bold">免費</span>
                取消訂單
              </p>
              <button onClick={deleteBooking} className="primary">
                取消此訂單
              </button>
            </div>
          )}
          {bookingStatus === "confirm" && isOkToCancelBooking(checkIn) && (
            <div>
              <p className="mb-1">
                訂單已確認，此訂單將於
                <span className="font-bold">{forMatCheckInDate(checkIn)}</span>
                開始入住，您現在可以
                <span className="font-bold">免費</span>
                取消訂單
              </p>
              <p className="font-bold my-2">{calDaysToCheckIn(checkIn)}</p>
              <p className="mb-2 text-gray-500">
                您的免費取消權限：截至入住日三天前。入住日三天內，則無法取消訂單，將收取訂單全額費用。若您未入住，將會收取訂單全額費用。
              </p>
              <button onClick={deleteBooking} className="primary">
                取消此訂單
              </button>
            </div>
          )}
          {bookingStatus === "confirm" && !isOkToCancelBooking(checkIn) && (
            <div>
              <p className="mb-1">
                訂單已確認，此訂單將於
                <span className="font-bold">{forMatCheckInDate(checkIn)}</span>
                開始入住
              </p>
              <p className="font-bold my-2">{calDaysToCheckIn(checkIn)}</p>
              <p className="mb-2 text-gray-500">
                您的免費取消權限：截至入住日三天前。入住日三天內，若取消訂單，將收取部分費用。若您為入住，將會收取訂單全額費用。
              </p>
            </div>
          )}

          <div className="border-t my-4 border-gray-300"></div>
          <div>
            <p className="font-bold">聯絡住宿</p>
            <p>電話 {place?.owner?.phone}</p>
            <a className="underline" href={`mailto:${place?.owner?.email}`}>
              發送電子郵件
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookingPage;
