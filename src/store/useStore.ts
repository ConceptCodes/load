import { create, type StateCreator } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { persist, createJSONStorage } from "zustand/middleware";

interface State {
  currentTopic: string | null;
  topics: string[];
  setCurrentTopic: (topic: string | null) => void;
  setTopics: (topics: string[]) => void;
  showConfetti: boolean | null;
  setShowConfetti: (showConfetti: boolean | null) => void;
}

const store: StateCreator<State> = persist(
  (set) => ({
    currentTopic: "",
    topics: [],
    setCurrentTopic: (topic) => set({ currentTopic: topic as string  }),
    setTopics: (topics) => set({ topics }),
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
