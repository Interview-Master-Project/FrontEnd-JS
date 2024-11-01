import { create } from "zustand";

interface IQuizForm {
  question: string;
  answer: string;
  changeQuestion: (newQ: string) => void;
  changeAnswer: (newA: string) => void;
}

export const useQuizFormStore = create<IQuizForm>((set) => ({
  question: "",
  answer: "",
  changeQuestion: (newQ) => {
    set(() => ({ question: newQ }));
  },
  changeAnswer: (newA) => {
    set(() => ({ answer: newA }));
  },
}));
