import { create } from "zustand";
import { IQuizzesAttempts } from "@/graphql/query/get-latest-quizzes-attempt";

interface ILatestQuizzesAttempt {
  quizzes: IQuizzesAttempts[] | [];
  setQuizzes: (getData: IQuizzesAttempts[]) => void;
}

export const useLatestQuizzesAttemptStore = create<ILatestQuizzesAttempt>(
  (set) => ({
    quizzes: [],
    setQuizzes: (newData) => {
      set(() => ({ quizzes: newData }));
    },
  })
);
