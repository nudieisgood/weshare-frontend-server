import { useSearchParams } from "react-router-dom";
import customFetch from "../utilits/customFetch";
import { CardLoader, FirstAndFavPagePlaceCard } from "../components";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from "@mantine/hooks";
import { useEffect, useRef } from "react";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const originalParams = Object.fromEntries(searchParams);

  const { data, fetchNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["data", originalParams],
      queryFn: async ({ pageParam }) => {
        const queryParams = {
          ...originalParams,
          page: pageParam,
        };
        const res = await customFetch.get("/places", {
          params: queryParams,
        });
        return res.data.data;
      },
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialPageParam: 1,
    });

  const places = data?.pages?.flatMap((page) => page);

  let isEmpty;
  data?.pages?.forEach((page) => {
    if (!page.length) isEmpty = true;
  });

  const lastPlaceRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: lastPlaceRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting && !isEmpty) fetchNextPage();
  }, [entry]);

  const handleClick = (p) => {
    searchParams.delete(p);
    setSearchParams(searchParams);
  };

  if (!places?.length && isFetching)
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 min-h-screen">
        <div className="min-w-sm min-h-sm">
          <CardLoader />
        </div>
        <div className="min-w-sm min-h-sm">
          <CardLoader />
        </div>
        <div className="min-w-sm min-h-sm">
          <CardLoader />
        </div>
        <div className="min-w-sm min-h-sm">
          <CardLoader />
        </div>
        <div className="min-w-sm min-h-sm">
          <CardLoader />
        </div>
        <div className="min-w-sm min-h-sm">
          <CardLoader />
        </div>
        <div className="min-w-sm min-h-sm">
          <CardLoader />
        </div>
        <div className="min-w-sm min-h-sm">
          <CardLoader />
        </div>
      </div>
    );
  if (!places?.length && !isFetching && Object.entries(originalParams).length)
    return (
      <section className="text-center">
        <p className="font-bold text-xl mb-2">沒有完全相符的結果</p>
        <p className="text-gray-500 mb-4">
          試著變更或移除某些篩選條件，或調整搜尋地區。
        </p>
        <div className="flex gap-2 justify-center">
          {Object.keys(originalParams).map((p) => {
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

  if (places?.length)
    return (
      <>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 min-h-screen">
          {places.map((place, i) => {
            if (i === places.length - 1)
              return (
                <div key={place._id} ref={ref}>
                  <FirstAndFavPagePlaceCard place={place} />
                </div>
              );

            return (
              <div key={place._id}>
                <FirstAndFavPagePlaceCard place={place} />
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          {isFetchingNextPage ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 min-h-screen">
              <div className="min-w-sm min-h-sm">
                <CardLoader />
              </div>
              <div className="min-w-sm min-h-sm">
                <CardLoader />
              </div>
              <div className="min-w-sm min-h-sm">
                <CardLoader />
              </div>
              <div className="min-w-sm min-h-sm">
                <CardLoader />
              </div>
              <div className="min-w-sm min-h-sm">
                <CardLoader />
              </div>
              <div className="min-w-sm min-h-sm">
                <CardLoader />
              </div>
              <div className="min-w-sm min-h-sm">
                <CardLoader />
              </div>
              <div className="min-w-sm min-h-sm">
                <CardLoader />
              </div>
            </div>
          ) : isEmpty && places.length > 8 ? (
            <button className="border text-gray-500 btn-p-lg hover:bg-gray-100">
              <a href="#top">回到最頂端</a>
            </button>
          ) : (
            ""
          )}
        </div>
      </>
    );
};
export default Home;
