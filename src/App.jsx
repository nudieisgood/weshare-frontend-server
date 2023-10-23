import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/appContext";

import "./App.css";

import {
  Home,
  HomeLayout,
  Register,
  Login,
  AccountLayout,
  Profile,
  Bookings,
  MyPlaces,
  EditPlace,
  PlacePage,
  BookingProcessPage,
  BookingPage,
  Orders,
  DeletePlace,
  MyFavsPage,
} from "./pages";

//actions
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
import { action as myPlacesAction } from "./pages/MyPlaces";
import { action as editPlaceAction } from "./pages/EditPlace";
import { action as bookingPageAction } from "./pages/BookingPage";
import { action as deletePlaceAction } from "./pages/DeletePlace";
import { action as profileAction } from "./pages/Profile";
import { action as myFavsAction } from "./pages/MyFavsPage";

//loaders
import { loader as homeLoader } from "./pages/home";
import { loader as accountLayoutLoader } from "./pages/AccountLayout";
import { loader as myPlacesLoader } from "./pages/MyPlaces";
import { loader as editPlaceLoader } from "./pages/EditPlace";
import { loader as placePageLoader } from "./pages/PlacePage";
import { loader as bookingPageLoader } from "./pages/BookingPage";
import { loader as bookingsLoader } from "./pages/Bookings";
import { loader as ordersLoader } from "./pages/Orders";
import { loader as myFavsLoader } from "./pages/MyFavsPage";

const router = createBrowserRouter([
  {
    path: "/book/:id",
    element: <BookingProcessPage />,
  },
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, element: <Home />, loader: homeLoader },
      { path: "register", element: <Register />, action: registerAction },
      {
        path: "my-favs-page",
        element: <MyFavsPage />,
        loader: myFavsLoader,
        action: myFavsAction,
      },
      { path: "login", element: <Login />, action: loginAction },
      { path: "place/:id", element: <PlacePage />, loader: placePageLoader },
      {
        path: "account",
        element: <AccountLayout />,
        loader: accountLayoutLoader,
        children: [
          { index: true, element: <Profile />, action: profileAction },
          { path: "bookings", element: <Bookings />, loader: bookingsLoader },
          { path: "orders", element: <Orders />, loader: ordersLoader },
          {
            path: "bookings/:id",
            element: <BookingPage />,
            loader: bookingPageLoader,
            action: bookingPageAction,
          },
          {
            path: "places",
            element: <MyPlaces />,
            loader: myPlacesLoader,
          },
          {
            path: "delete-place/:id",
            element: <DeletePlace />,
            action: deletePlaceAction,
          },
          {
            path: "places/:action",
            element: <MyPlaces />,
            action: myPlacesAction,
            loader: myPlacesLoader,
          },
          {
            path: "places/edit/:id",
            element: <EditPlace />,
            action: editPlaceAction,
            loader: editPlaceLoader,
          },
          {
            path: "places/delete/:id",
            element: <MyPlaces />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  );
}

export default App;
