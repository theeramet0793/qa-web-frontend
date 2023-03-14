import { SearchType } from "../data/enum/filterEnum";
import { IMovieTMDB } from "../data/interface/IMovie";
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

  export const convertMoviesToOptions = ( movies:IMovieTMDB[] ) =>{
    var options: IOption[] = [];
    if(movies.length > 0){
      movies.forEach((movie)=>{
        var option: IOption = {label:movie.original_title+" ( "+movie.title+" )", value:movie.id.toString()};
        options.push(option);
      })
    }
    
    return options;
  }

  export const convertPathQueryStringToMainOption = (pathQuery:string) =>{
    //sample path query = ?keyword=หนังแฟนตาซี?type=TAG
    let result:string[] =  pathQuery.replaceAll('?',"*").replaceAll("=","*").split("*") ;
    
    if(result.length >= 5){
      let obj:IMainSearchOption = {
        label: result[2],
        type: result[4],
        value: "unneccessary"
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

  export const convertPathQueryStringToPostId = (pathQuery:string) =>{
    //sample path query = ?postId=124
    let postId:string =  pathQuery.substring(8) ;
    try{
      let postIdInt:number = parseInt(postId);
      return postIdInt;
    }catch(e){
      return undefined;
    }
  }