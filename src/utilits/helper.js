import { differenceInCalendarDays, format } from "date-fns";

const isFinishedAccommodate = (checkOut) => {
  return differenceInCalendarDays(new Date(), new Date(checkOut)) >= 0;
};
const isOkToCancelBooking = (checkIn) => {
  return differenceInCalendarDays(new Date(checkIn), new Date()) > 3;
};

const forMatDate = (date) => {
  return format(new Date(date), "yyyy-MM-dd");
};

const forMatCheckInDate = (checkIn) => {
  return format(new Date(checkIn), "yyyy-MM-dd");
};

const forMatCheckOutDate = (checkOut) => {
  return format(new Date(checkOut), "yyyy-MM-dd");
};

const sortBookingsByCheckInDate = (bookings) => {
  return bookings.sort(
    (date1, date2) => new Date(date2.checkIn) - new Date(date1.checkIn)
  );
};

const calDaysToCheckIn = (checkIn, checkInTime) => {
  const toCheckIn = differenceInCalendarDays(new Date(checkIn), new Date());
  if (toCheckIn > 30) return "距離入住日大於一個月以上";
  if (toCheckIn > 7) return "距離入住日大於七日以上";
  if (toCheckIn > 3) return "距離入住日大於三日以上";
  if (toCheckIn > 0) return "距離入住日小於三日";
  if (toCheckIn === 0) return `今日${checkInTime}:00開始入住`;
};

const genNewSearchParamString = (key, value, searchParams) => {
  const sp = new URLSearchParams(searchParams);
  if (value === null) {
    sp.delete(key);
  } else {
    sp.set(key, value);
  }
  return `?${sp.toString()}`;
};

const avarageRating = (reviews) => {
  if (!reviews.length) return "-";
  return (
    Math.round(
      (reviews
        .map((review) => review.rating)
        .reduce((acc, cur) => acc + cur, 0) /
        reviews.length) *
        100
    ) / 100
  );
};

export {
  forMatDate,
  isFinishedAccommodate,
  isOkToCancelBooking,
  forMatCheckInDate,
  forMatCheckOutDate,
  calDaysToCheckIn,
  genNewSearchParamString,
  sortBookingsByCheckInDate,
  avarageRating,
};
