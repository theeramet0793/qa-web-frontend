import { SearchType } from "../data/enum/filterEnum";
import { IMovie } from "../data/interface/IMovie";
import { IMainSearchOption, IOption } from "../data/interface/IOption";
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

  export const convertPathQueryStringToMainOption = (pathQuery:string) =>{
    //sample path query = ?keyword=หนังแฟนตาซี?type=TAG?id=1
    let result:string[] =  pathQuery.replaceAll('?',"*").replaceAll("=","*").split("*") ;
    
    if(result.length >= 7){
      let obj:IMainSearchOption = {
        label: result[2],
        type: result[4],
        value: result[6]
      }
      return obj;
    }else{
      let obj:IMainSearchOption = {
        label: 'no value',
        type: 'no value',
        value: 'no value'
      }
      return obj;
    }
  }

  export const convertStringToSearchType = (str:string|undefined) =>{
    if(str?.toLowerCase()===SearchType.Post.toLowerCase()) return SearchType.Post
    else if(str?.toLowerCase()===SearchType.Tag.toLowerCase()) return SearchType.Tag
    else if(str?.toLowerCase()===SearchType.User.toLowerCase()) return SearchType.User
    else return undefined;
  }