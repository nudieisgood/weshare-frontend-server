import { NavLink, Outlet, redirect, useLoaderData } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import customFetch from "../utilits/customFetch";
import { AccountNav } from "../components";

export const loader = async () => {
  try {
    const data = await customFetch.get("/user/get-current-user");
    return data.data.user;
  } catch (error) {
    return redirect("/login");
  }
};

const AccountLayout = () => {
  const { user } = useAppContext();
  const data = useLoaderData();

  if (!user) return <h1>loading...</h1>;

  return (
    <>
      <AccountNav />

      <section className="my-4 min-h-screen">
        <Outlet context={data} />
      </section>
    </>
  );
};
export default AccountLayout;
