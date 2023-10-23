import { Form, Link, useSearchParams, useNavigate } from "react-router-dom";
import FormSelect from "./FormSelect";
import { roomTypes, sortOptions } from "../utilits/options";
import { genNewSearchParamString } from "../utilits/helper";
import { useState } from "react";
import SearchBarItemsContainer from "./SearchBarItemsContainer";
import { GrPowerReset } from "react-icons/gr";
import {
  MdKeyboardDoubleArrowUp,
  MdKeyboardDoubleArrowDown,
} from "react-icons/md";

const SearchPlaceContainer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [price, setPrice] = useState(null);

  const handlePrice = (value) => {
    const goTo = genNewSearchParamString("sort", value, searchParams);

    navigate(`${goTo}`);
  };

  return (
    <div className="mt-8 mb-8 grid grid-cols-[5fr_1fr] gap-6">
      <SearchBarItemsContainer searchParams={searchParams} />
      <div className="flex items-center gap-2 justify-self-end">
        <div className="hidden md:block">
          <FormSelect
            labelClass="text-sm md:text-md"
            onChange={handlePrice}
            labelText="價格"
            name="sort"
            list={sortOptions}
          />
        </div>
        <div className="md:hidden flex items-center">
          <p className="text-sm md:text-md mr-1">價格</p>
          {price ? (
            <Link
              className="bg-gray-100 p-2 rounded-full hover:bg-gray-300 h-8 w-8 grid place-items-center"
              to={genNewSearchParamString(
                "sort",
                "costlyToCheapest",
                searchParams
              )}
              onClick={() => {
                setPrice(false);
              }}
            >
              <MdKeyboardDoubleArrowDown />
            </Link>
          ) : (
            <Link
              className="bg-gray-100 p-2 rounded-full hover:bg-gray-300 h-8 w-8 grid place-items-center"
              to={genNewSearchParamString(
                "sort",
                "cheapestToCostly",
                searchParams
              )}
              onClick={() => {
                setPrice(true);
              }}
            >
              <MdKeyboardDoubleArrowUp />
            </Link>
          )}
        </div>
        <Link
          className="text-sm md:text-lg bg-gray-100 p-2 rounded-full hover:bg-gray-300 h-8 w-8 grid place-items-center"
          to={"/"}
        >
          <GrPowerReset />
        </Link>
      </div>
      {/* <Form>
        <FormSelect labelText="價格" name="sort" list={sortOptions} />
        <button type="submit">sub</button>
      </Form> */}
    </div>
  );
};
export default SearchPlaceContainer;
