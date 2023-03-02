import { ITag } from "./ITag";

export interface IPost{
  postId: number,
  userId: number,
  postDetail: string;
  createdDate: string;
  createdTime: string;
  lastUpdateDate: string;
  lastUpdateTime: string;
  username: string;
  tagList: ITag[];
  movieId: number;
  isReccommend: boolean;
}

export interface IPostsFeed{
  postId:number
}