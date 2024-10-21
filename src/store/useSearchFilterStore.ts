import { create } from "zustand";

interface IFilters {
  filters: {
    keywords: string[];
    categories: string[];
    maxCorrectRate: number | undefined;
  };
}

interface ISearchFilterStore extends IFilters {
  setFilters: (newFilters: IFilters) => void;
}

export const useSearchFilterStore = create<ISearchFilterStore>((set) => ({
  filters: {
    keywords: [],
    categories: [],
    maxCorrectRate: undefined,
  },
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
}));
