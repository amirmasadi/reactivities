import { StateCreator } from "zustand";
import IActivity from "../Models/activity";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";

export interface ActivitySlice {
  activities: IActivity[];
  initialLoading: boolean;
  submitting: boolean;
  showForm: boolean;
  selectedActivity: IActivity | undefined;

  getActivities: () => void;
  setSubmitting: (isSubmitting: boolean) => void;
  handleSelectedActivity: (id: string) => void;
  handleCancelSelectActivity: () => void;
  handleOpenForm: (id?: string) => void;
  handleCloseForm: () => void;
  crateAndEditActivityHandler: (activity: IActivity) => void;
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

  setSubmitting: (isSubmitting: boolean) => set({ submitting: isSubmitting }),

  handleSelectedActivity: (id: string) =>
    set((state) => ({
      selectedActivity: state.activities.find((activity) => activity.id === id),
    })),

  handleCancelSelectActivity: () => set({ selectedActivity: undefined }),

  handleOpenForm: (id?: string) =>
    set((state) => {
      id
        ? state.handleSelectedActivity(id)
        : state.handleCancelSelectActivity();
      return { showForm: true };
    }),

  handleCloseForm: () => set({ showForm: false }),

  crateAndEditActivityHandler: async (activity: IActivity) => {
    if (activity.id) {
      try {
        get().setSubmitting(true);
        await agent.Activities.update(activity);
        set((state) => {
          state.handleSelectedActivity(activity.id);
          state.handleCloseForm();
          state.setSubmitting(false);
          return {
            activities: [
              ...state.activities.filter((itm) => itm.id !== activity.id),
              activity,
            ],
          };
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      activity.id = uuid();
      get().setSubmitting(true);
      await agent.Activities.create(activity);
      set((state) => {
        state.handleSelectedActivity(activity.id);
        state.handleCloseForm();
        state.setSubmitting(false);
        return {
          activities: [...state.activities, activity],
        };
      });
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
