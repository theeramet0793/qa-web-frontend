export interface IFollow{
  postId: number;
  userId: number;
  isFollow: boolean;
}

export interface ICountFollow{
  postId: number;
  follows: number;
}