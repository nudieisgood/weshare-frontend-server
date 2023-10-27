import { redirect } from "react-router-dom";
import customFetch from "../utilits/customFetch";

export const action = async ({ params }) => {
  const { id } = params;

  try {
    await customFetch.delete(`/places/${id}`);
  } catch (error) {
    return error;
  }

  return redirect("/account/places");
};

const DeletePlace = () => {
  return null;
};
export default DeletePlace;
