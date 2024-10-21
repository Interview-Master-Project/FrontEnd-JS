import { create } from "zustand";

interface IFilters {
  keywords: string[];
  categories: string[];
  maxCorrectRate: number | undefined;
}

interface ISearchFilterStore extends IFilters {
  setFilters: (newFilters: IFilters) => void;
}

export const useSearchFilterStore = create<ISearchFilterStore>((set) => ({
  keywords: [],
  categories: [],
  maxCorrectRate: undefined,
  setFilters: ({ keywords, categories, maxCorrectRate }) =>
    set(() => ({
      keywords,
      categories,
      maxCorrectRate,
    })),
}));
