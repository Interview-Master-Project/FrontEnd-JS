interface IQuiz {
  id: string;
  question: string;
  answer: string;
  access: "PRIVATE" | "PUBLIC";
  collection: { imgUrl: string; name: string; category: { name: string } };
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
