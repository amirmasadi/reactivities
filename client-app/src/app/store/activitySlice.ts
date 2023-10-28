import { StateCreator } from "zustand";
import IActivity from "../Models/activity";
import agent from "../api/agent";

export interface ActivitySlice {
  activities: IActivity[];
  initialLoading: boolean;
  submitting: boolean;
  showForm: boolean;
  selectedActivity: IActivity | undefined;

  getActivities: () => void;
  getActivity: (id: string) => Promise<IActivity | undefined>;
  getActivitiesByDate: () => IActivity[];
  setSubmitting: (isSubmitting: boolean) => void;
  createActivity: (activity: IActivity) => Promise<IActivity | undefined>;
  updateActivity: (activity: IActivity) => Promise<IActivity | undefined>;
  deleteActivityHandler: (id: string) => void;
}

export const createActivitySlice: StateCreator<ActivitySlice> = (set, get) => ({
  activities: [],
  initialLoading: true,
  submitting: false,
  showForm: false,
  selectedActivity: undefined,

  getActivities: async () => {
    try {
      const response = await agent.Activities.list();
      set({ activities: response, initialLoading: false });
    } catch (error) {
      console.log("Something went wrong whene loading activities" + error);
      set({ initialLoading: false });
    }
  },

  getActivity: async (id) => {
    if (get().activities.length === 0) {
      try {
        const response = await agent.Activities.details(id);
        set({ selectedActivity: response, initialLoading: false });
        return response;
      } catch (error) {
        console.log(
          "Something went wrong whene loading activitie with id:" + id + error
        );
        set({ initialLoading: false });
      }
    } else {
      set((state) => ({
        selectedActivity: state.activities.find(
          (activity) => activity.id === id
        ),
      }));
      return get().activities.find((activity) => activity.id === id);
    }
  },

  getActivitiesByDate: () =>
    get().activities.sort(
      (a: IActivity, b: IActivity) => Date.parse(a.date) - Date.parse(b.date)
    ),

  setSubmitting: (isSubmitting: boolean) => set({ submitting: isSubmitting }),

  createActivity: async (activity: IActivity) => {
    get().setSubmitting(true);
    try {
      await agent.Activities.create(activity);
      set((state) => {
        state.setSubmitting(false);
        return {
          activities: [...state.activities, activity],
        };
      });
      return activity;
    } catch (error) {
      console.log(error);
      get().setSubmitting(false);
    }
  },

  updateActivity: async (activity: IActivity) => {
    try {
      get().setSubmitting(true);
      await agent.Activities.update(activity);
      set((state) => {
        state.setSubmitting(false);
        return {
          activities: [
            ...state.activities.filter((itm) => itm.id !== activity.id),
            activity,
          ],
        };
      });
      return activity;
    } catch (error) {
      console.log(error);
      get().setSubmitting(false);
    }
  },

  deleteActivityHandler: async (id: string) => {
    try {
      get().setSubmitting(true);
      await agent.Activities.delete(id);
      set((state) => {
        state.setSubmitting(false);
        return {
          activities: [...state.activities.filter((itm) => itm.id !== id)],
        };
      });
    } catch (error) {
      console.log(error);
    }
  },
});
