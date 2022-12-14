import { IMovie } from "../data/interface/IMovie";
import { IOption } from "../data/interface/IOption";
import { ITag } from "../data/interface/ITag";

  export const convertTagsToOptions = ( tags:ITag[] ) =>{
    var options: IOption[] = [];
    if(tags.length > 0){
      tags.forEach((tag)=>{
        var option: IOption = {label:tag.tagName, value:tag.tagId.toString()};
        options.push(option);
      })
    }
    return options;
  }

  export const convertMoviesToOptions = ( movies:IMovie[] ) =>{
    var options: IOption[] = [];
    if(movies.length > 0){
      movies.forEach((movie)=>{
        var option: IOption = {label:movie.movieName, value:movie.movieId.toString()};
        options.push(option);
      })
    }
    return options;
  }