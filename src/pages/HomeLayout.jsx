import { Outlet, useNavigation } from "react-router-dom";
import { Header, Footer, ScreenLoader } from "../components";

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  return (
    <>
      <div className="mx-4 sm:mx-8 lg:mx-20 md-12 py-4 flex flex-col min-h-screen">
        <Header />
        {isPageLoading ? <ScreenLoader /> : <Outlet />}
        <Footer />
      </div>
    </>
  );
};
export default HomeLayout;
