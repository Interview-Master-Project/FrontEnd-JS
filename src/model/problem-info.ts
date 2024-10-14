interface IQuizzes {
  quiz: {
    id: string;
    question: string;
  };
}

export interface IProblemInfo {
  getQuizzesWithAttemptByCollectionId: IQuizzes[];
}
