export interface IUpvote{
  postId: number;
  userId: number;
  isUpvote: boolean;
}

export interface ICountUpvote{
  postId: number;
  upvotes: number;
}