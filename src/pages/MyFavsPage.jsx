import { redirect, useLoaderData } from "react-router-dom";
import { FirstAndFavPagePlaceCard } from "../components";
import { useAppContext } from "../context/appContext";
import customFetch from "../utilits/customFetch";

export const loader = async () => {
  try {
    await customFetch.get("/user/get-current-user");
    const { data } = await customFetch.get("/places/my-favs");
    return data;
  } catch (error) {
    return redirect("/login");
  }
};

export const action = async () => {
  return null;
};

const MyFavsPage = () => {
  const { user } = useAppContext();
  const { data: favPlaces } = useLoaderData();

  const setFavPlacesCities = [...new Set(favPlaces.map((place) => place.city))];

  if (!user) return <p>Loading...</p>;

  return (
    <div className="mt-6">
      <p className="text-xl md:text-4xl mb-4">我的收藏</p>
      {setFavPlacesCities.length > 0 ? (
        setFavPlacesCities.map((setPlace) => (
          <div key={setPlace}>
            <div className="text-xl mt-4 border-t pt-4">{setPlace}</div>
            <div className="overflow-scroll no-scrollbar grid grid-row-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 pt-2 ">
              {favPlaces
                .filter((place) => place.city === setPlace)
                .map((place) => {
                  return (
                    <div key={place._id}>
                      <FirstAndFavPagePlaceCard place={place} />
                    </div>
                  );
                })}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-xl m-20">
          無任何收藏的房源，您可以在房源頁面點擊加入最愛。
        </div>
      )}
    </div>
  );
};
export default MyFavsPage;
