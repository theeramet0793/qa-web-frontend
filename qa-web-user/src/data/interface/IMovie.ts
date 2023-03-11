export interface IMovie{
  movieId: number;
  movieName: string;
  moviePosterPath: string
}

export interface ISearchMovieTMDB{
  page:number;
  results:IMovieTMDB[];
  total_pages:number;
  total_results:number;
}

export interface IMovieTMDB{
  id:number;
  original_title:string;
  title:string;
  poster_path:string;
}

export interface IReccommendMovie{
  postId:number;
  movielist:IMovie[]
}
