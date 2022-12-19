
import { useEffect, useState } from 'react';
import './ownerNewPost.scss'
import Post from './post';

export interface OwnerNewPostProps{
 newPostId?: number;
}

const OwnerNewPost:React.FC<OwnerNewPostProps> = ({newPostId}) => {

  const [newPostIdArray, setNewPostIdArray] = useState<(number)[]>([]);

  useEffect(()=>{
    if(newPostId){
      var temp = newPostIdArray.slice(0);
      temp.splice(0,0,newPostId);
      setNewPostIdArray(temp);
    }
    // eslint-disable-next-line 
  },[newPostId])

  return(
    <div className='owner-new-post-container d-flex justify-content-center'>
      <div className='posts-container'>
        {
          newPostIdArray?.map((postId)=>{
            return(
              <div key={postId} className='post-container'>
                <Post postId={postId}/>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default OwnerNewPost;