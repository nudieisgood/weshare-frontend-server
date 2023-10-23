import {
  useLoaderData,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import customFetch from "../utilits/customFetch";
import { FirstPagePlacesContainer } from "../components";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const res = await customFetch.get("/places", { params });

    return { places: res.data.data, params };
  } catch (error) {
    return error;
  }
};

const Home = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { places, params } = useLoaderData();
  const handleClick = (p) => {
    searchParams.delete(p);
    setSearchParams(searchParams);
  };
  if (!places.length)
    return (
      <section className="text-center">
        <p className="font-bold text-xl mb-2">沒有完全相符的結果</p>
        <p className="text-gray-500 mb-4">
          試著變更或移除某些篩選條件，或調整搜尋地區。
        </p>
        <div className="flex gap-2 justify-center">
          {Object.keys(params).map((p) => {
            if (p === "sort") return;

            let sp;
            if (p === "roomType") sp = "房源類型";
            if (p === "surroundingEnv") sp = "周邊環境";
            if (p === "search") sp = "搜尋";

            return (
              <button
                key={p}
                onClick={() => {
                  handleClick(p);
                }}
                className="rounded-md px-4 py-2 border hover:bg-gray-100"
              >
                {`移除${sp}條件`}
              </button>
            );
          })}
        </div>
      </section>
    );
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 min-h-screen">
      {places.map((place) => (
        <FirstPagePlacesContainer place={place} key={place._id} />
      ))}
    </div>
  );
};
export default Home;
