import { useEffect, useState } from 'react';
import './ownerNewComment.scss'
import Comment from './comment';

export interface OwnerNewCommentProps{
  newCommentId: number|undefined;
}

const OwnerNewComment:React.FC<OwnerNewCommentProps> = ({newCommentId}) =>{

  const [newCommentIdArray, setNewCommentIdArray] = useState<(number)[]>([]);

  useEffect(()=>{
    if(newCommentId){
      var temp = newCommentIdArray.slice(0);
      temp.splice(0,0,newCommentId);
      setNewCommentIdArray(temp);
    }
    // eslint-disable-next-line 
  },[newCommentId])

  return(
    <div className='owner-new-comment-container'>
      <div className='ccvd-comments-container'>
        {
          newCommentIdArray?.map((commentId)=>{
            return(
              <div key={commentId} className='comment-container'>
                <Comment commentId={commentId}/>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default OwnerNewComment;