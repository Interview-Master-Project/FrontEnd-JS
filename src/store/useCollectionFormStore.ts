import { create } from "zustand";

interface ICollectionFormData {
  name: string;
  image: File | null;
  description: string;
  access: "PUBLIC" | "PRIVATE";
  categoryId: string | null;
  changeName: (newName: string) => void;
  changeImage: (newImage: File | null | undefined) => void;
  changeCategoryId: (newId: string | null) => void;
  changeDescription: (newDescription: string) => void;
  changeAccess: (newAccess: "PUBLIC" | "PRIVATE") => void;
}

export const useCollectionFormStore = create<ICollectionFormData>((set) => ({
  name: "",
  image: null,
  description: "",
  access: "PUBLIC",
  categoryId: null,
  changeName: (newName) => {
    set(() => ({ name: newName }));
  },
  changeImage: (file) => {
    set(() => ({ image: file || null }));
  },
  changeCategoryId: (newId) => {
    set(() => ({ categoryId: newId }));
  },
  changeDescription: (newDescription) => {
    set(() => ({ description: newDescription }));
  },
  changeAccess: (newAccess) => {
    set(() => ({ access: newAccess }));
  },
}));
