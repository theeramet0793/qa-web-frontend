export interface IMovie{
  movieId: number;
  movieName: string;
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
}