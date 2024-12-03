import { create } from "zustand";
import type { QuizResultInput } from "@/__api__/types";

interface State {
  quizResults: QuizResultInput[] | [];
}

interface Actions {
  add: (newQuizResult: QuizResultInput) => void;
  delete: (quizId: string) => void;
  reset: () => void;
}

// 상태 초기화
const initializeState: State = {
  quizResults: [],
};

export const useLatestQuizzesAttemptStore = create<State & Actions>()(
  (set, get) => ({
    ...initializeState,
    add: (newQuizResult) => {
      set({ quizResults: [...get().quizResults, newQuizResult] });
    },
    delete: (quizId) => {
      set({
        quizResults: get().quizResults.filter(
          (result) => result.quizId !== quizId
        ),
      });
    },
    reset: () => {
      set(initializeState);
    },
  })
);
