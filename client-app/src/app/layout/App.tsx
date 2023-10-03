import React, { useEffect, useState } from "react";
import TopMenu from "./topNavbar/TopMenu";
import IActivity from "../Models/activity";
import ActiviryDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";

function App() {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    IActivity | undefined
  >(undefined);
  const [showForm, setShowForm] = useState(false);
  const [loading, setloading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    agent.Activities.list().then((res) => {
      setActivities(res);
      setloading(false);
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
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((itm) => itm.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setShowForm(false);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setShowForm(false);
        setSubmitting(false);
      });
    }
  }

  function deleteActivityHandler(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((itm) => itm.id !== id)]);
      setSubmitting(false);
    });
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
        loading={loading}
        submitting={submitting}
      />
    </>
  );
}

export default App;
