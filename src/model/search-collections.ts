export default interface IData {
  searchCollections: ISearchCollections;
}

interface ISearchCollections {
  collectionWithAttempts: ICollectionInfo[];
  pageInfo: IPageInfo;
}

interface ICollectionInfo {
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
