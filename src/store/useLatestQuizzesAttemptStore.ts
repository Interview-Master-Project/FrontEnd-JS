import { create } from "zustand";
import { IQuizzesAttempts } from "@/graphql/query/get-latest-quizzes-attempt";

interface ILatestQuizzesAttempt {
  quizzes: IQuizzesAttempts[] | [];
  setQuizzes: (getData: IQuizzesAttempts[]) => void;
  addQuizzes: (solved: IQuizzesAttempts) => void;
}

// quizzes의 상태는 배열
// 예) [
// { quiz: { id: "12" }, isCorrect: false },
// { quiz: { id: "123" }, isCorrect: true },
// ]
export const useLatestQuizzesAttemptStore = create<ILatestQuizzesAttempt>(
  (set) => ({
    quizzes: [],
    setQuizzes: (newData) => {
      set(() => ({ quizzes: newData }));
    },
    addQuizzes: (solved) => {
      set((state) => ({ quizzes: [...state.quizzes, solved] }));
    },
  })
);
