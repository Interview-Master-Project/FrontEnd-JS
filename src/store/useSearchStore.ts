import { create } from "zustand";

interface ISearchStore {
  keywords: string[];
  sort: "LATEST" | "LOWEST_ACCURACY";
  changeSearch: (search: string) => void;
}

export const useSearchStore = create<ISearchStore>((set) => ({
  keywords: [""],
  sort: "LATEST",
  changeSearch: (search: string) =>
    set(() => {
      console.log("changeSearch: ", search);
      return { keywords: [`${search}`] };
    }),
}));
