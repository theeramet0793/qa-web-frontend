import { useLocation } from "react-router-dom";
import { convertPathQueryStringToPostId } from "../utils/convert";
import Post from "./post"
import './showOnePost.scss'

export interface ShowOnePostProps{

}

const ShowOnePost:React.FC<ShowOnePostProps> = () =>{
  const location = useLocation();
  let selectedPost = (convertPathQueryStringToPostId(decodeURI(location.search)));
  return(
      <div className="show-one-post-container">
        <div className="post-container">
          {
            selectedPost!== undefined ? 
            <Post postId={selectedPost}/>:
            <div>Post not found</div>
          }
        </div>
      </div>
  )
}

export default ShowOnePost;