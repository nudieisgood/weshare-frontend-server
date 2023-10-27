import { createContext, useContext, useState } from "react";
import {
  AiFillStar,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { HiOutlineBarsArrowDown } from "react-icons/hi2";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import customFetch from "../utilits/customFetch";
import {
  MorePics,
  PlacePhotosContainer,
  BookingWidget,
  ModalContainer,
  SharePlaceModal,
  RenderAvatar,
  PerksModal,
  ShowMapContainer,
} from "../components";
import { perkOptions } from "../utilits/perkOptions";
import { forMatDate } from "../utilits/helper";
import { useAppContext } from "../context/appContext";
import ReviewsModal from "../components/ReviewsModal";

export const loader = async ({ params }) => {
  const { id } = params;
  const res = await customFetch(`/places/${id}`);

  return res.data.data;
};

const placePageContext = createContext();

const PlacePage = () => {
  const navigate = useNavigate();
  const { user, addToLove, removeLove, checkIsMyFav } = useAppContext();

  const {
    _id,
    title,
    address,
    checkInTime,
    checkOutTime,
    description,
    extraInfo,
    maxGuests,
    owner,
    perks,
    photos,
    price,
    roomType,
    reviews,
    city,
    geoLocation,
  } = useLoaderData();

  const [showMorePics, setShowMorePics] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [showPerksModal, setShowPerksModal] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [showRefoundModal, setShowRefoundModal] = useState(false);

  const contextValue = {
    _id,
    title,
    address,
    checkInTime,
    checkOutTime,
    description,
    extraInfo,
    maxGuests,
    owner,
    perks,
    photos,
    price,
    showMorePics,
    reviews,
    setShowMorePics,
  };

  const { name, nickName } = owner;

  const totalRating =
    reviews.length &&
    Math.round(
      (reviews
        .map((review) => review.rating)
        .reduce((acc, cur) => acc + cur, 0) /
        reviews.length) *
        100
    ) / 100;

  if (showMorePics)
    return <MorePics photos={photos} setShowMorePics={setShowMorePics} />;

  return (
    <placePageContext.Provider value={contextValue}>
      {showShareModal && (
        <ModalContainer setShowModal={setShowShareModal}>
          <SharePlaceModal />
        </ModalContainer>
      )}
      {showIntroModal && (
        <ModalContainer setShowModal={setShowIntroModal}>
          <div className="text-start p-5">
            <h1 className="text-2xl mb-4">房源介紹</h1>
            <div>{description}</div>
            <h2 className="text-2xl mb-2 mt-8">其他注意事項</h2>
            <div>{extraInfo}</div>
          </div>
        </ModalContainer>
      )}
      {showPerksModal && (
        <ModalContainer setShowModal={setShowPerksModal}>
          <PerksModal perks={perks} />
        </ModalContainer>
      )}
      {showReviewsModal && (
        <ModalContainer setShowModal={setShowReviewsModal}>
          <ReviewsModal reviews={reviews} totalRating={totalRating} />
        </ModalContainer>
      )}
      {showRefoundModal && (
        <ModalContainer setShowModal={setShowRefoundModal}>
          <div className="p-3 text-start">
            <h1 className="text-3xl mb-2">退訂政策</h1>
            <p className="text-sm text-gray-500 mb-4">
              預訂之前，請確認你同意遵守房東的《退訂政策》。請注意，
              《特殊情況政策》不適用感染新冠肺炎或因新冠疫情影響而取消的預訂。
            </p>
            <p className="text-xl nb-2">取消截止時間</p>
            <p className="border-b pb-4">
              在入住日前 72 小時內取消預訂，即可拿回
              全額退款：你將拿回已支付的全部款項。
            </p>
            <p className="mt-4">
              在入住日後 72 小時內不可取消預定，無法退款 /
              若未如入住日入住將會收取全額。
            </p>
          </div>
        </ModalContainer>
      )}
      <div className="bg-gray-100 mt-4 -mx-4 sm:-mx-8 lg:-mx-20 px-4 sm:px-8 lg:px-20 py-8">
        <Link to={`/place/${_id}`} className="text-2xl">
          {title}
        </Link>
        <div className="relative text-sm flex space-around justify-between">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1 text-lg">
              <AiFillStar />
              {totalRating}
            </div>
            <a
              target="blank"
              className="text-gray-500 underline hover:text-black"
              href={`http://maps.google.com/?q=${address}`}
            >
              {address}
            </a>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                setShowShareModal(true);
              }}
              className="flex items-center gap-2 underline hover:bg-gray-200"
            >
              <AiOutlineShareAlt />
              <p className="hidden sm:block">分享</p>
            </button>
            {checkIsMyFav(_id) ? (
              <button
                onClick={() => {
                  removeLove(_id);
                }}
                className="flex items-center gap-2 underline hover:bg-gray-200"
              >
                <AiFillHeart />
                <p className="hidden sm:block">移除最愛</p>
              </button>
            ) : (
              <button
                onClick={() => {
                  if (!user) return navigate("/login");
                  addToLove(_id);
                }}
                className="flex items-center gap-2 underline hover:bg-gray-200"
              >
                <AiOutlineHeart />
                <p className="hidden sm:block">加到最愛</p>
              </button>
            )}
          </div>
        </div>
        <PlacePhotosContainer
          photos={photos}
          showMorePics={showMorePics}
          setShowMorePics={setShowMorePics}
        />
        <div className="mt-8 grid md:grid-cols-[3fr_2fr] gap-8">
          <div className="py-2">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl">
                {address}的{roomType}
              </h2>
              <p className="text-gray-400 text-lg">{maxGuests}位</p>
              <p className="text-lg flex items-center gap-1">
                <AiFillStar />
                {totalRating}
                <p className="hover:underline cursor-pointer ml-4">
                  {reviews.length}則評價
                </p>
              </p>
            </div>

            <div className="flex gap-5 py-5 mt-5 border-t">
              <div className="flex overflow-hidden rounded-full w-16 h-16 bg-gray-300">
                {owner?.avatar && <RenderAvatar src={owner?.avatar} />}
              </div>
              <div>
                <div className="flex text-lg gap-2">
                  <p>房東</p>
                  <p>{nickName || name}</p>
                </div>
                <div className="flex gap-2">
                  <p className="text-md text-gray-500">擁有 6 年的待客經驗</p>
                </div>
              </div>
            </div>
            <div className="border-t py-5">
              <h1 className="text-2xl mb-3">房源介紹</h1>
              <div>
                {description.length > 110 ? (
                  <p>{description.slice(0, 110) + "  ..."}</p>
                ) : (
                  <p>description</p>
                )}
              </div>
              {description.length > 50 && (
                <button
                  className="hover:underline font-bold mt-4 btn-p-no flex  items-center border border-black btn-p-lg hover:bg-gray-200"
                  onClick={() => setShowIntroModal(true)}
                >
                  <p>顯示更多內容</p>
                  <HiOutlineBarsArrowDown className="text-2xl" />
                </button>
              )}
            </div>

            <div className="border-t py-5">
              <h1 className="text-2xl mb-3">有提供的設備與服務</h1>
              <div className="grid grid-cols-1 gap-4">
                {perks.map((perk, i) => {
                  if (i > 4) return;
                  const perkIcon = perkOptions.find(
                    (item) => item.type === perk
                  ).icon;
                  return (
                    <div
                      className="flex items-center gap-2 text-lg
          "
                      key={perk}
                    >
                      {perkIcon}
                      <div>{perk}</div>
                    </div>
                  );
                })}
              </div>
              {perks.length > 4 && (
                <button
                  className="hover:underline font-bold mt-4 btn-p-no flex  items-center border border-black btn-p-lg hover:bg-gray-200"
                  onClick={() => setShowPerksModal(true)}
                >
                  <p>顯示全部 {perks.length} 種設備與服務</p>
                  <HiOutlineBarsArrowDown className="text-2xl" />
                </button>
              )}
            </div>

            <div className="border-t py-5">
              <h1 className="text-2xl mb-3 flex gap-2 items-center">
                <AiFillStar />
                {totalRating}
                <p className="underline ml-4 text-lg">{reviews.length}則評價</p>
              </h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 gap-y-8 gap-x-10">
                {reviews.length > 0 &&
                  reviews.map((review, i) => {
                    if (i > 3) return;
                    return (
                      <div key={review._id}>
                        <div className="flex gap-4 items-center">
                          <div className="flex overflow-hidden rounded-full w-14 h-14 bg-gray-300">
                            {review.author?.avatar && (
                              <RenderAvatar src={review.author.avatar} />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center">
                              <p className="mr-4">
                                {review.author.nickName || review.author.name}
                              </p>
                              <AiFillStar />
                              <p>{review.rating}</p>
                            </div>

                            <p className="text-gray-400">
                              {forMatDate(review.createdAt)}
                            </p>
                          </div>
                        </div>
                        <p className="mt-3">{review.content}</p>
                      </div>
                    );
                  })}
              </div>
              {reviews.length > 4 && (
                <button
                  className="hover:underline font-bold mt-4 btn-p-no flex  items-center border border-black btn-p-lg hover:bg-gray-200"
                  onClick={() => setShowReviewsModal(true)}
                >
                  <p>顯示全部 {reviews.length} 則評論</p>
                  <HiOutlineBarsArrowDown className="text-2xl" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 border-t py-5">
              <div className="border-b pb-4 lg:border-none">
                <h1 className="text-2xl mb-3">注意事項</h1>
                <div className="grid gap-4">
                  <div className="flex gap-2">
                    <h2>入住時間 :</h2>
                    <p>{`${checkInTime}:00`}</p>
                  </div>
                  <div className="flex gap-2">
                    <h2>退房時間 :</h2>
                    <p>{`${checkOutTime}:00`}</p>
                  </div>
                  <div className="flex gap-2">
                    <h2>最大訂房人數:</h2>
                    <p>{`${maxGuests} 人`}</p>
                  </div>
                </div>
              </div>
              <div className="border-b pb-4 lg:border-none">
                <h1 className="text-2xl mb-3">安全設備</h1>
                <div className="grid gap-4">
                  <div>
                    {perks?.includes("障礙者輔助設備") ? (
                      <p>障礙者輔助設備</p>
                    ) : (
                      <p className="line-through">障礙者輔助設備</p>
                    )}
                  </div>
                  <div>
                    {perks?.includes("一氧化碳警報器") ? (
                      <p>一氧化碳警報器</p>
                    ) : (
                      <p className="line-through">一氧化碳警報器</p>
                    )}
                  </div>
                  <div>
                    {perks?.includes("煙霧警報器") ? (
                      <p>煙霧警報器</p>
                    ) : (
                      <p className="line-through">煙霧警報器</p>
                    )}
                  </div>
                  <div>
                    {perks?.includes("滅火器") ? (
                      <p>滅火器</p>
                    ) : (
                      <p className="line-through">滅火器</p>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl mb-3">退訂政策</h1>
                <div className="grid gap-4">
                  <div className="flex gap-2">
                    48 小時內可免費取消。
                    請查看房東完整的《退訂政策》；即便是因為感染新冠肺炎而取消，或新冠疫情導致旅程中斷，這些政策依然適用。
                  </div>
                </div>
                <button
                  className="hover:underline font-bold mt-4 btn-p-no flex  items-center border border-black btn-p-lg hover:bg-gray-200"
                  onClick={() => setShowRefoundModal(true)}
                >
                  <p>顯示更多內容</p>
                  <HiOutlineBarsArrowDown className="text-2xl" />
                </button>
              </div>
            </div>
          </div>
          <BookingWidget />
        </div>
        <ShowMapContainer
          address={address}
          city={city}
          geoLocation={geoLocation}
        />
      </div>
    </placePageContext.Provider>
  );
};

export const usePlacePageContext = () => useContext(placePageContext);
export default PlacePage;
