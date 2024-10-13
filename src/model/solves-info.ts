interface IQuiz {
  id: string;
  question: string;
  answer: string;
  collection: { imgUrl: string; name: string };
}

interface ISolveInfo {
  quiz: IQuiz;
  recentAnswerAt: string;
  totalAttempts: number;
  totalCorrectAttempts: number;
}

export interface ISolvesInfo {
  getQuizzesWithAttemptByCollectionId: ISolveInfo[];
}
