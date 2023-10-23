import { Link, NavLink } from "react-router-dom";
import { envOptions } from "../utilits/SurroundingEnv";
import { genNewSearchParamString } from "../utilits/helper";
import { roomTypes } from "../utilits/RoomTypes";
import { useState } from "react";
// genNewSearchParamString("surroundingEnv", "海邊", searchParams)
const SearchBarItemsContainer = ({ searchParams }) => {
  const [active, setActive] = useState(null);
  return (
    <div className="flex gap-5 md:gap-10 overflow-scroll no-scrollbar">
      {envOptions.map((env) => {
        return (
          <Link
            onClick={() => {
              setActive(env.type);
            }}
            className={`${
              active === env.type && "active"
            } searchBarItem flex shrink-0 flex-col items-center justify-center text-gray-500 hover:text-black hover:underline hover:underline-offset-8`}
            // to={`?surroundingEnv=${env.type}`}
            to={genNewSearchParamString(
              "surroundingEnv",
              env.type,
              searchParams
            )}
            key={env.type}
          >
            <div className="text-lg md:text-2xl">{env.icon}</div>
            <p className="text-sm md:text-md">{env.type}</p>
          </Link>
        );
      })}
      {roomTypes.map((env) => {
        return (
          <Link
            onClick={() => {
              setActive(env.type);
            }}
            className={`${
              active === env.type && "active"
            } flex shrink-0 flex-col items-center justify-center searchBarItem text-gray-500 hover:text-black hover:underline hover:underline-offset-8`}
            // to={`?roomType=${env.type}`}
            to={genNewSearchParamString("roomType", env.type, searchParams)}
            key={env.type}
          >
            <div className="text-lg md:text-2xl">{env.icon}</div>
            <p className="text-sm md:text-md">{env.type}</p>
          </Link>
        );
      })}
    </div>
  );
};
export default SearchBarItemsContainer;
