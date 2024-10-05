import { create } from "zustand";

interface ISearchFilterStore {
  selectedFilterList: string[];
  changeFilter: (filter: string) => void;
}

export const useSearchFilterStore = create<ISearchFilterStore>((set) => ({
  selectedFilterList: [],
  changeFilter: (filter: string) =>
    set((state) => {
      if (!state.selectedFilterList.includes(filter)) {
        return { selectedFilterList: [...state.selectedFilterList, filter] };
      } else {
        return {
          selectedFilterList: state.selectedFilterList.filter(
            (item) => item !== filter
          ),
        };
      }
    }),
}));
