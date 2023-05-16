import { create, type StateCreator } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Topics } from "@prisma/client";

interface State {
  currentTopic: Topics | null;
  setCurrentTopic: (topic: Topics | null) => void;
  showConfetti: boolean | null;
  setShowConfetti: (showConfetti: boolean | null) => void;
}

const store: StateCreator<State> = persist(
  (set) => ({
    currentTopic: "CALCULUS",
    setCurrentTopic: (topic) => set({ currentTopic: topic }),
    showConfetti: false,
    setShowConfetti: (showConfetti) => set({ showConfetti }),
  }),
  {
    name: "load-store",
    storage: createJSONStorage(() => localStorage),
  }
) as StateCreator<State>;

const useStore = create<State>(store);

export default useStore;

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useStore);
}
