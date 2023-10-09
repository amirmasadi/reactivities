import { create } from "zustand";
import { createActivitySlice, ActivitySlice } from "./activitySlice";

const useBoundStore = create<ActivitySlice>()((...a) => ({
  ...createActivitySlice(...a),
}));

export default useBoundStore;
