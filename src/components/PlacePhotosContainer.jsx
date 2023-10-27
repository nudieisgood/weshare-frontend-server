// import { usePlacePageContext } from "../pages/PlacePage";
import { TbPhotoSearch } from "react-icons/tb";
const PlacePhotosContainer = ({ photos, setShowMorePics, showMorePics }) => {
  if (photos.length > 0 && photos.length > 2)
    return (
      <div className="mt-4 -mr-4 sm:mr-0 overflow-hidden grid gap-2 sm:grid-cols-[2fr_1fr] -mx-6 sm:mx-0 sm:rounded-xl">
        <div className="flex">
          <img className="aspect-video object-cover" src={photos[0]} />
        </div>
        <div className="grid relative">
          <img className="aspect-video object-cover" src={photos?.[1]} />
          <div className="overflow-hidden hidden sm:block">
            <img
              className="relative top-2 aspect-video object-cover"
              src={photos?.[2]}
            />
          </div>
          {photos.length > 3 && (
            <button
              onClick={() => {
                setShowMorePics(true);
              }}
              className="absolute flex gap-1 items-center bottom-2 right-2 px-2 py-1 rounded-xl bg-white hover:text-white hover:bg-primary"
            >
              <TbPhotoSearch className="text-xl" /> 更多照片
            </button>
          )}
        </div>
      </div>
    );

  if (photos.length > 0 && photos.length === 2)
    return (
      <div className="mt-4 rounded-xl overflow-hidden grid gap-2 grid-cols-2">
        <div className="flex">
          <img className="aspect-video object-cover" src={photos[0]} />
        </div>
        <div className="flex">
          <img className="aspect-video object-cover" src={photos?.[1]} />
        </div>
      </div>
    );

  if (photos.length > 0)
    return (
      <div className="mt-4 rounded-xl overflow-hidden grid gap-2 grid-cols-2">
        <div className="flex">
          <img
            className="aspect-video object-cover rounded-xl"
            src={photos[0]}
          />
        </div>
      </div>
    );
};
export default PlacePhotosContainer;
