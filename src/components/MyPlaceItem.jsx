import { Form, Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const MyPlaceItem = ({ title, _id, photos, description }) => {
  const shortTitle = title.length > 20 ? title.slice(0, 20) + "  ..." : title;

  const shortDescription =
    description.length > 70 ? description.slice(0, 70) + "  ..." : description;

  return (
    <div className="bg-gray-100 p-2 rounded-2xl hover">
      <div className="flex gap-4">
        <div className="flex w-40 h-40 bg-gray-300 shrink-0 rounded-2xl">
          {photos.length > 0 && (
            <img className="w-full rounded-2xl" src={photos[0]} alt="photo" />
          )}
        </div>
        <div className="flex flex-col w-full">
          <h2 className="mb-4 text-lg">{shortTitle}</h2>
          <p className="text-sm text-gray-700">{shortDescription}</p>
          <div className="flex justify-end grow items-end gap-2">
            <div className="flex gap-2 items-center">
              <Link
                className="px-2 py-1 rounded-lg btn-normal"
                to={`/account/places/edit/${_id}`}
              >
                <FiEdit className="text-2xl" />
              </Link>
              <Form method="post" action={`/account/delete-place/${_id}`}>
                <button type="submit" className="btn-normal">
                  <RiDeleteBin6Line className="text-2xl" />
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyPlaceItem;
{
  /* <Link to={`/account/places/edit/${_id}`}>Edit</Link>
<Link>Delete</Link> */
}
