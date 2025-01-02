import { create } from "zustand";
import { QuizResultInput } from "@/__api__/types";

interface ISolveQuizLog {
  quizLog: QuizResultInput[];
  addLog: (newLog: QuizResultInput) => void;
  removeLog: (targetQuizId: QuizResultInput["quizId"]) => void;
  resetLog: () => void;
}

export const useSolveQuizLog = create<ISolveQuizLog>((set) => ({
  quizLog: [],
  addLog: (newLog) => {
    set((state) => {
      const isDuplicate = state.quizLog.some(
        ({ quizId }) => quizId === newLog.quizId
      );
      if (isDuplicate) {
        return state; // 중복이 있을 경우 상태 변경 없음
      }
      return { quizLog: [...state.quizLog, newLog] };
    });
  },
  removeLog: (targetQuizId) => {
    set((state) => ({
      quizLog: state.quizLog.filter(({ quizId }) => quizId !== targetQuizId),
    }));
  },
  resetLog: () => {
    set(() => ({ quizLog: [] }));
  },
}));
