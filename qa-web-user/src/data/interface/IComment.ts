export interface IComment{
  commentId: number;
  postId: number;
  userId: number;
  commentDetail: string;
  createdDate: string;
  createdTime: string;
  lastUpdateDate: string;
  lastUpdateTime: string;
  username: string;
}

export interface ICommentsFeed{
  commentId: number;
}

export interface ICountComment{
  postId: number;
  comments: number;
}