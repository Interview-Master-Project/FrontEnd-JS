import { create } from "zustand";

interface ISearchGridStore {
  selectedSearchGrid: "card" | "list";
  changeGrid: (indicator: "card" | "list") => void;
}

export const useSearchGridStore = create<ISearchGridStore>((set) => ({
  selectedSearchGrid: "card",
  changeGrid: (indicator: "card" | "list") =>
    set(() => {
      return { selectedSearchGrid: indicator };
    }),
}));
