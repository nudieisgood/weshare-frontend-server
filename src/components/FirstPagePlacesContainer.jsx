import { Await, Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { AiOutlineHeart, AiFillHeart, AiFillStar } from "react-icons/ai";
import { useState } from "react";

const FirstPagePlacesContainer = ({ place }) => {
  const [loading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { addToLove, removeLove, checkIsMyFav, user } = useAppContext();

  const { title, photos, address, price, _id, reviews } = place;

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

  return (
    <Link className="relative " to={`/place/${_id}`} key={place._id}>
      <div className="rounded-2xl bg-gray-500">
        {checkIsMyFav(_id) ? (
          <button
            disabled={loading}
            className="absolute sm:top-3 sm:left-3 text-white text-4xl"
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!user) return navigate("/login");
              setIsLoading(true);
              await removeLove(_id);
              setIsLoading(false);
            }}
          >
            <AiFillHeart />
          </button>
        ) : (
          <button
            disabled={loading}
            className="absolute sm:top-3 sm:left-3 text-white text-4xl"
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!user) return navigate("/login");
              setIsLoading(true);
              await addToLove(_id);
              setIsLoading(false);
            }}
          >
            <AiOutlineHeart />
          </button>
        )}
        {photos.length > 0 && (
          <img
            className="min-w-sm min-h-40 rounded-2xl object-cover aspect-square"
            src={photos[0]}
          />
        )}
      </div>
      <div className="flex justify-between">
        <h2 className="text-sm mt-3 font-bold">{address}</h2>
        <div className="flex gap-1 items-center">
          <AiFillStar className="text-yellow-400" />{" "}
          <p>{avarageRating(reviews)}</p>
        </div>
      </div>

      <p className="text-sm text-gray-500 truncate"> {title}</p>
      <p className="text-sm mt-2 font-bold">$ {price} TWD / 晚</p>
    </Link>
  );
};
export default FirstPagePlacesContainer;
