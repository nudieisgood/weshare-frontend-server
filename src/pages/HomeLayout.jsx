import { Outlet } from "react-router-dom";
import { Header, Footer } from "../components";

const HomeLayout = () => {
  return (
    <>
      <div className="mx-4 sm:mx-8 lg:mx-20 md-12  py-4 flex flex-col min-h-screen">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};
export default HomeLayout;
