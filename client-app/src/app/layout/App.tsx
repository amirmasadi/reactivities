import React, { useEffect } from "react";
import TopMenu from "./topNavbar/TopMenu";
import useBoundStore from "../store/useBoundStore";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "../pages/home";
import Activities from "../pages/activities";
import CreateForm from "../pages/createForm";
import ErrorPage from "../pages/error";
import ActivityDetail from "../../features/activities/details/ActivityDetail";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { path: "/", Component: Home },
      { path: "/activities", Component: Activities },
      { path: "/activities/:activityId", Component: ActivityDetail },
      { path: "/form", Component: CreateForm },
      { path: "/edit/:activityId", Component: CreateForm },
    ],
    errorElement: <ErrorPage />,
  },
]);

function App() {
  const { getActivities } = useBoundStore((state) => state);

  useEffect(() => {
    getActivities();
  }, [getActivities]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
function Layout() {
  return (
    <>
      <TopMenu />
      <Outlet />
    </>
  );
}

export default App;
