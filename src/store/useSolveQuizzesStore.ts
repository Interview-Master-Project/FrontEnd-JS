import { create } from "zustand";
import { MutationSolveQuizzesArgs, QuizResultInput } from "@/__api__/types";

interface ISyncSolvedStore {
  solveQuizzes: MutationSolveQuizzesArgs[] | [];
  addSolveQuizzes: (eachQuiz: MutationSolveQuizzesArgs) => void;
  deleteSolveQuizzes: (targetQuizId: QuizResultInput["quizId"]) => void;
}

export const useSyncSolvedStore = create<ISyncSolvedStore>((set) => ({
  solveQuizzes: [],
  addSolveQuizzes: (eachQuiz) => {
    set((state) => ({ solveQuizzes: [...state.solveQuizzes, eachQuiz] }));
  },
  deleteSolveQuizzes: (targetQuizId) => {},
}));
