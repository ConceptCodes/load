import { create, type StateCreator } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Languages, Nullable } from "types";

interface State {
  currentTopic: Nullable<string>;
  currentLanguage: Languages;
  setCurrentTopic: (subTopic: Nullable<string>) => void;
  setLanguage: (language: Languages) => void;
  reset: () => void;
}

const store: StateCreator<State> = persist(
  (set) => ({
    currentTopic: "",
    currentLanguage: "en",
    setCurrentTopic: (currentTopic) => set({ currentTopic }),
    setLanguage: (currentLanguage) => set({ currentLanguage }),
    reset: () =>
      set({
        currentTopic: "",
        currentLanguage: "en",
      }),
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
