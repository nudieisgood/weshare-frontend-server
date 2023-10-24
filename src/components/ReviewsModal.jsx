import { forMatDate } from "../utilits/helper";
import { AiFillStar } from "react-icons/ai";
import RenderAvatar from "./RenderAvatar";

const ReviewsModal = ({ reviews, totalRating }) => {
  return (
    <div className="text-start mt-4">
      <div className="text-4xl mb-4 flex gap-4 items-center">
        <div className="flex items-center gap-1">
          <AiFillStar className="text-yellow-300" /> {totalRating}
        </div>
        <p className="text-xl">共 {reviews.length} 則評價</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 gap-y-8 gap-x-10 p-6">
        {reviews.length > 0 &&
          reviews.map((review) => (
            <div key={review._id} className=" border-b pb-6">
              <div className="flex gap-4 items-center">
                <div className="flex overflow-hidden rounded-full w-14 h-14 bg-gray-300 ">
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

                  <p className="text-gray-400 text-start">
                    {forMatDate(review.createdAt)}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-start">{review.content}</p>
            </div>
          ))}
      </div>
    </div>
  );
};
export default ReviewsModal;
