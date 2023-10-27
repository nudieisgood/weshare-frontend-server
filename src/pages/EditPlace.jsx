import { redirect, useActionData, useLoaderData } from "react-router-dom";
import { EditPlaceForm } from "../components";
import customFetch from "../utilits/customFetch";
import { perkOptions } from "../utilits/perkOptions";

export const loader = async ({ params }) => {
  const { id } = params;

  try {
    const res = await customFetch(`/places/${id}`);

    return res;
  } catch (error) {
    return redirect("/account/places");
  }
};

export const action = async ({ request, params }) => {
  const { id } = params;
  const formData = await request.formData();

  const data = Object.fromEntries(formData);

  const entries = Object.entries(data);

  const perks = [];
  const surroundingEnv = [];
  entries.forEach((entry) => {
    if (entry[1] === "on") {
      if (perkOptions.map((perk) => perk.type).includes(entry[0])) {
        perks.push(entry[0]);
      } else {
        surroundingEnv.push(entry[0]);
      }
    }
  });

  if (perks.length > 0) {
    for (const i in perks) {
      formData.append("perks[]", perks[i]);
    }
  }

  if (surroundingEnv.length > 0) {
    for (const i in surroundingEnv) {
      formData.append("surroundingEnv[]", surroundingEnv[i]);
    }
  }

  try {
    const res = await customFetch.patch(`/places/${id}`, formData);

    return redirect("/account/places");
  } catch (error) {
    return error.response.data.msg;
  }
};

const EditPlace = () => {
  const errorData = useActionData();
  const errorArr = errorData?.split(",");
  const loaderData = useLoaderData();
  const place = loaderData.data.data;

  return (
    <>
      <EditPlaceForm place={place} errorArr={errorArr} />
    </>
  );
};
export default EditPlace;
