import { useEffect, useState } from 'react';
import { IPost } from '../data/interface/IPost';
import Client from '../lib/axios/axios';
import './feedPost.scss'
import Post from './post';

export interface FeedPostProps{
  
}

const FeedPost: React.FC<FeedPostProps> = () => {

  const [posts, setPosts] = useState<IPost[]|undefined>(undefined);

  useEffect(()=>{
      Client.get<IPost[]>('/posts')
      .then((res)=>{
        console.log(res);
        setPosts(res.data);
      }).catch((err)=>{
        console.log(err);
      })
  },[])

  return(
    <div className='feed-post-container d-flex justify-content-center'>
      <div className='posts-container'>
        {
          posts?.map((post)=>{
            return(
              <div key={post.postId} className='post-container'>
                <Post post={post}/>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default FeedPost;