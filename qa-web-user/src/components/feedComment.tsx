import { useEffect, useState } from 'react';
import { ICommentsFeed } from '../data/interface/IComment';
import './feedComment.scss'
import Comment from './comment';
import Client from '../lib/axios/axios';

export interface FeedCommentProps{
  postId: number;
  onCommentDeleted: () => void;
}

const FeedComment: React.FC<FeedCommentProps> = ({postId, onCommentDeleted}) =>{

  const [comments, setComments] = useState<ICommentsFeed[]|undefined>(undefined);

  useEffect(()=>{
    Client.get<ICommentsFeed[]>('/commentbypostid/'+postId)
    .then((res)=>{
      if(res.data)
      setComments(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  },[postId])

  return(
    <div className='feed-comment-container-zx'>
      <div className='comments-container'>
        {
          comments?.map((comment)=>{
            return(
              <div key={comment.commentId} className='comment-container'>
                <Comment commentId={comment.commentId} onCommentDeleted={()=>{onCommentDeleted()}}/>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default FeedComment;