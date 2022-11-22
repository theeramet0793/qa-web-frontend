import './feedPost.scss'
import Post from './post';

export interface FeedPostProps{

}

const FeedPost: React.FC<FeedPostProps> = () => {

  return(
    <div className='feed-post-container d-flex justify-content-center'>
      <Post/>
    </div>
  )
}

export default FeedPost;