export default interface IData {
  searchCollections: ISearchCollections;
}

interface ISearchCollections {
  collectionsWithAttempt: ICollectionInfo[];
  pageInfo: IPageInfo;
}

interface ICollectionInfo {
  quizCount: number;
  recentAttempts: number;
  recentCorrectAttempts: number;
  totalAttempts: number;
  totalCorrectAttempts: number;
  collection: ICollection;
}

interface ICollection {
  id: string;
  imgUrl: string;
  name: string;
  access: "PUBLIC" | "PRIVATE";
  description: string;
}

interface IPageInfo {
  currentPage: number;
  hasNextPage: boolean;
  totalPages: number;
}
