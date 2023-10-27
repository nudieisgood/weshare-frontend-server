import { HiOutlineDocumentPlus } from "react-icons/hi2";
import {
  Link,
  useParams,
  redirect,
  useLoaderData,
  useActionData,
} from "react-router-dom";
import { AddPlaceForm, MyPlacesContainer } from "../components";
import customFetch from "../utilits/customFetch";

import { perkOptions } from "../utilits/perkOptions";

export const action = async ({ request }) => {
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

  //重要:必須用set得方式新增在formData，不要建立新的{}來post,
  //會導致Form post到此的formdata 錯誤
  //1, 原本Form有註明encType="multipart/form-data" 會失效
  //2, files會只剩下一個

  //無法直接append / set array to an formData
  // perks.length > 0 && formData.append("perks", perks);

  for (const i in perks) {
    formData.append("perks[]", perks[i]);
  }

  for (const i in surroundingEnv) {
    formData.append("surroundingEnv[]", surroundingEnv[i]);
  }

  try {
    const data = await customFetch.post("/places", formData);
    return null;
  } catch (error) {
    return error.response.data.msg;
  }
};

export const loader = async () => {
  try {
    const res = await customFetch.get("/places/get-places-by-user");
    return res.data.data;
  } catch (error) {
    return redirect("/");
  }
};

const Places = () => {
  const errorData = useActionData();
  const errorArr = errorData?.split(",");

  const { action } = useParams();
  const placesData = useLoaderData();

  return (
    <div className="w-full grid">
      {action === "new" ? (
        <AddPlaceForm errorArr={errorArr} />
      ) : (
        <div className="w-48 justify-self-center">
          <Link
            to="/account/places/new"
            className="flex justify-center items-center gap-2 bg-gray-400 hover:bg-primary rounded-full text-white btn-p-lg"
          >
            <HiOutlineDocumentPlus className="text-lg" />
            新增房源
          </Link>
        </div>
      )}
      <div className="mt-5 gap-5 grid lg:grid-cols-2">
        <MyPlacesContainer placesList={placesData} />
      </div>
    </div>
  );
};
export default Places;
