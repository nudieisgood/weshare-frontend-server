import {
  Form,
  Link,
  useLocation,
  useSubmit,
  useNavigate,
} from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { IoEarth } from "react-icons/io5";
import FormInput from "./FormInput";
import { useState, useRef, useEffect } from "react";
import ModalContainer from "./ModalContainer";
import SearchPlaceContainer from "./SearchPlaceContainer";
import RenderAvatar from "./RenderAvatar";
import DropDownContainer from "./DropDownContainer";
import DropDownLinkItem from "./DropDownLinkItem";
import { DropDownItems } from "../utilits/HeaderDropDownItems";

import { PiMagnifyingGlass } from "react-icons/pi";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { IoPersonCircleSharp } from "react-icons/io5";
import { BiLogOutCircle } from "react-icons/bi";

const Header = () => {
  const { user, logout, loginTestUser } = useAppContext();
  const submit = useSubmit();
  const [showModal, setShowModal] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const refEl = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = (e) => {
      if (!refEl.current.contains(e.target)) setShowDropDown(false);
    };
    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  return (
    <section className="-mx-4 sm:-mx-8 lg:-mx-20 px-2 sm:px-8 sticky top-0 bg-white z-20 bg-white">
      <div className="py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-1">
          <IoEarth className="text-primary text-4xl" />
          <div className="font-semibold text-primary text-2xl hidden sm:block">
            WeShare
          </div>
        </Link>

        {useLocation().pathname === "/" && (
          <div>
            <Form className="hidden sm:flex border border-gray-300 rounded-full  px-2 py-1 items-center divide-x divide-gray-300 shadow-md">
              <FormInput
                required={false}
                name="search"
                noTitle={true}
                placeHolder="輸入關鍵字"
              />
              <button type="submit" className="bg-primary rounded-full p-1">
                <PiMagnifyingGlass className="text-white" />
              </button>
            </Form>
            <div
              className="sm:hidden border rounded-full w-20 px-1 py-1 flex justify-end shadow-md hover:shadow-lg hover:cursor-pointer"
              type="button"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <div className="bg-primary rounded-full p-1">
                <PiMagnifyingGlass className="text-white" />
              </div>
            </div>

            {showModal && (
              <ModalContainer setShowModal={setShowModal}>
                <p className="mt-5 mb-2 text-gray-500">
                  請輸入可能與地點相關的關鍵字
                </p>
                <Form className="flex justify-between border border-gray-300 rounded-full px-2 py-1 items-center divide-x divide-gray-300 shadow-md">
                  <FormInput
                    required={false}
                    name="search"
                    noTitle={true}
                    placeHolder="輸入關鍵字"
                  />
                  <button
                    type="submit"
                    className="bg-primary rounded-full p-1"
                    onClick={() => {
                      submit();
                    }}
                  >
                    <PiMagnifyingGlass className="text-white" />
                  </button>
                </Form>
              </ModalContainer>
            )}
          </div>
        )}

        <div
          onClick={() => {
            setShowDropDown(!showDropDown);
          }}
          ref={refEl}
          className="flex items-center gap-6 relative"
        >
          {showDropDown && (
            <DropDownContainer>
              {user ? (
                <div className="flex flex-col w-40">
                  {DropDownItems.ifLogin.map((item) => (
                    <DropDownLinkItem
                      key={item.name}
                      icon={item.icon}
                      name={item.name}
                      goTo={item.goTo}
                    />
                  ))}

                  <div
                    className="flex w-full gap-2 items-center px-6 py-4 hover:bg-gray-200 hover:cursor-pointer"
                    onClick={async () => {
                      await logout();
                      navigate("/");
                    }}
                  >
                    <BiLogOutCircle className="text-xl" />
                    <p>登出</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col w-48">
                  {DropDownItems.ifNotLogin.map((item) => (
                    <DropDownLinkItem
                      key={item.name}
                      icon={item.icon}
                      name={item.name}
                      goTo={item.goTo}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={async () => {
                      await loginTestUser();

                      if (
                        location.pathname === "/login" ||
                        location.pathname === "/register"
                      )
                        navigate("/");
                    }}
                    className="flex w-full gap-2 items-center px-6 py-4 hover:bg-gray-200 hover:cursor-pointer"
                  >
                    <p>Demo 用帳號登入</p>
                  </button>
                </div>
              )}
            </DropDownContainer>
          )}
          <button className="border border-gray-300 rounded-full flex px-2 py-1 items-center gap-1 hover:shadow">
            <MdOutlineFormatListBulleted className="text-2xl" />
            {user?.avatar ? (
              <div className="flex overflow-hidden bg-gray-200 w-8 h-8 rounded-full">
                <RenderAvatar src={user?.avatar} />
              </div>
            ) : (
              <IoPersonCircleSharp className="text-3xl" />
            )}
            <div>{user?.nickName || user?.name}</div>
          </button>
        </div>
      </div>
      {useLocation().pathname === "/" && <SearchPlaceContainer />}
    </section>
  );
};
export default Header;

// to={user ? "/account" : "/login"}
