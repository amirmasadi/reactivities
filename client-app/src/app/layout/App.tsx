import React, { useEffect } from "react";
import TopMenu from "./topNavbar/TopMenu";
import ActiviryDashboard from "../../features/activities/dashboard/ActivityDashboard";
import useBoundStore from "../store/useBoundStore";

function App() {
  const { getActivities } = useBoundStore((state) => state);

  useEffect(() => {
    getActivities();
  }, [getActivities]);

  return (
    <>
      <TopMenu />
      <ActiviryDashboard />
    </>
  );
}

export default App;
