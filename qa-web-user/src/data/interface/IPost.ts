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
}

export interface IPostsFeed{
  postId:number
}