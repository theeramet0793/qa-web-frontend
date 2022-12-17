export interface IPost{
  postId: number,
  userId: number,
  postDetail: string;
  createdDate: string;
  createdTime: string;
  lastUpdateDate: string;
  lastUpdateTime: string;
  username: string;
}

export interface IPostsFeed{
  postId:number
}