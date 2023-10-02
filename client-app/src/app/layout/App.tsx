import React, { useEffect, useState } from "react";
import axios from "axios";
import TopMenu from "./topNavbar/TopMenu";
import IActivity from "../Models/activity";
import ActiviryDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";

function App() {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    IActivity | undefined
  >(undefined);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/Activities")
      .then((res) => {
        setActivities(res.data);
      });
  }, []);

  function handleSelectedActivity(id: String): void {
    setSelectedActivity(activities.find((activity) => activity.id === id));
  }

  function handleCancelSelectActivity(): void {
    setSelectedActivity(undefined);
  }

  function handleOpenForm(id?: string): void {
    id ? handleSelectedActivity(id) : handleCancelSelectActivity();
    setShowForm(true);
  }

  function handleCloseForm(): void {
    setShowForm(false);
  }

  function crateAndEditActivityHandler(activity: IActivity): void {
    activity.id
      ? setActivities([
          ...activities.filter((itm) => itm.id !== activity.id),
          activity,
        ])
      : setActivities([...activities, { ...activity, id: uuid() }]);
    handleCloseForm();
    setSelectedActivity(activity);
  }

  function deleteActivityHandler(id: string) {
    setActivities([...activities.filter((itm) => itm.id !== id)]);
  }

  return (
    <>
      <TopMenu handleOpenForm={handleOpenForm} />
      <ActiviryDashboard
        activities={activities}
        selectedActivity={selectedActivity}
        handleSelectedActivity={handleSelectedActivity}
        handleCancelSelectActivity={handleCancelSelectActivity}
        showForm={showForm}
        handleOpenForm={handleOpenForm}
        handleCloseForm={handleCloseForm}
        crateAndEditActivityHandler={crateAndEditActivityHandler}
        deleteActivityHandler={deleteActivityHandler}
      />
    </>
  );
}

export default App;
