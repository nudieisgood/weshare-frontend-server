import { useLocation, Link, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { IoEarth } from "react-icons/io5";
import { useState, useEffect } from "react";
import customFetch from "../utilits/customFetch";
import { useAppContext } from "../context/appContext";
import { FormInput, Spinner } from "../components";

const BookingProcessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorArr, setErrorArr] = useState(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [creditCardNum, setCreditCardNum] = useState("");
  const [payment, setPayment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isDisabledSubmitBtn = Boolean(
    fullName && phone && creditCardNum && payment
  );

  const { finalPrice, _id, checkIn, checkOut, numOfGuest, numOfNights } =
    location.state;

  const { user } = useAppContext();

  useEffect(() => {
    if (user) {
      setFullName(`${user?.lastName}${user?.name}`);
      setPhone(user.phone);
    }
  }, [user]);

  const submitOrder = async () => {
    const data = {
      price: finalPrice,
      name: fullName,
      phone,
      checkIn,
      checkOut,
      numOfGuest: +numOfGuest,
      numOfNights: +numOfNights,
      place: _id,
      payment,
      creditCardNum,
    };
    try {
      setIsLoading(true);
      const res = await customFetch.post("/booking", data);
      navigate(`/account/bookings/${res.data.data._id}`);
      // setRedirect(`/account/bookings/${res.data.data._id}`);
    } catch (error) {
      setIsLoading(false);
      const errors = error?.response?.data?.msg.split(",");
      setErrorArr(errors);
    }
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-4 flex flex-col min-h-screen">
      <div className="py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-1">
          <IoEarth className="text-primary text-4xl" />
          <div className="font-bold capitalize text-2xl">airbnb</div>
        </Link>
      </div>
      <div className="border-t -mx-8 mb-4 mt-2"></div>
      <Link to={`/place/${_id}`} className="flex items-center gap-1">
        <IoMdArrowBack className="text-4xl" />
      </Link>
      <div className="grid gap-8 md:grid-cols-3 md:gap-4 px-4 mt-4">
        <div className="grid gap-4">
          <div className="text-4xl">確認並付款</div>
          <FormInput
            type="text"
            name="name"
            labelText="房客姓名"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <FormInput
            type="number"
            name="phone"
            labelText="手機"
            des="請輸入台灣地區手機號碼。"
            value={phone}
            inputError={errorArr?.includes("invalid phone")}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errorArr?.includes("invalid phone") && (
            <p className="text-primary">手機格式有誤，請重新輸入</p>
          )}
          <FormInput
            type="number"
            name="creditCardNum"
            labelText="信用卡號碼"
            value={creditCardNum}
            des="請輸入 14 碼信用卡帳號。"
            inputError={errorArr?.includes("invalid card number")}
            onChange={(e) => setCreditCardNum(e.target.value)}
          />
          {errorArr?.includes("invalid phone") && (
            <p className="text-primary">信用卡格式有誤，請重新輸入</p>
          )}
          <button
            disabled={!isDisabledSubmitBtn || isLoading}
            onClick={submitOrder}
            className={
              isDisabledSubmitBtn || isLoading
                ? "primary rounded-md"
                : "bg-gray-300 rounded-md"
            }
          >
            {isLoading ? <Spinner /> : "確認訂單"}
          </button>
        </div>
        <div className="flex flex-col border-t md:border-none">
          <h2 className="text-4xl mt-4 mb-4 md:mt-0">付款方式</h2>
          <p className="text-sm">
            您的免費取消權限：截至入住日三天前。入住日三天內，若取消訂單，將收取部分費用。若您為入住，將會收取訂單全額費用。
          </p>
          <div className="grid gap-4 mt-4">
            <div>
              <p className="text-md mb-2">無需訂金 - 入住時付款</p>
              <button
                onClick={() => setPayment("入住時付款")}
                className={
                  payment === "入住時付款"
                    ? "py-2 px-6 border rounded-md  bg-gray-200"
                    : "py-2 px-6 border rounded-md bg-white hover:bg-gray-100"
                }
              >
                入住時付款
              </button>
            </div>
            <div>
              <p className="text-md mb-2">支付全額 - 信用卡一次付清</p>
              <button
                onClick={() => setPayment("信用卡付清")}
                className={
                  payment === "信用卡付清"
                    ? "py-2 px-6 border rounded-md  bg-gray-200"
                    : "py-2 px-6 border rounded-md bg-white hover:bg-gray-100"
                }
              >
                信用卡支付
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col border-t md:border-none">
          <h2 className="text-4xl mt-4 mb-4 md:mt-0">訂單資訊</h2>
          <div className="border rounded-lg p-4 text-lg bg-gray-100 grow">
            <p>
              <span>總金額：</span> $ {finalPrice} <span></span>
            </p>
            <p>
              <span>訂單日期：</span>
              {checkIn} 至 {checkOut}
            </p>
            <p>
              <span>入住人數：</span>
              {numOfGuest}
            </p>
            <p>
              <span>入住天數：</span>
              {numOfNights}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default BookingProcessPage;
{
  /* <div className="grid gap-4 mt-6"></div> */
}
