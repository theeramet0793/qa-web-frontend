import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PostType, SortBy } from '../data/enum/filterEnum';
import { IPostsFeed } from '../data/interface/IPost';
import { IUser } from '../data/interface/IUser';
import Client from '../lib/axios/axios';
import './feedPost.scss'
import Post from './post';
import { GetUserData } from './userData/userData';

export interface FeedPostProps{
  filterSortBy:SortBy;
  filterType:PostType;
  filterIsOnlyFollow:boolean;
  onRefreshFeed: () => void;
}

const FeedPost: React.FC<FeedPostProps> = ({filterSortBy, filterType, filterIsOnlyFollow, onRefreshFeed}) => {

  const [posts, setPosts] = useState<IPostsFeed[]|undefined>(undefined);
  const [ userProfile ] = useState<IUser|undefined>(GetUserData());
  const [currentPostCount, setCurrentPostCount] = useState<number>(0);
  const [fetchPerTime] = useState<number>(5);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(()=>{
    if(posts){
      setCurrentPostCount(posts.length);
    }
  },[posts])

  useEffect(()=>{
      Client.get<IPostsFeed[]>('/posts/',{
        params:{
          sortby:filterSortBy,
          type: filterType,
          followby: filterIsOnlyFollow? userProfile?.userId:'',
          fetchAmount: fetchPerTime,
          currentAmount: 0,
        }
      }).then((res)=>{
        setPosts(res.data);
        onRefreshFeed();
      }).catch((err)=>{
        console.log(err);
      })
      // eslint-disable-next-line 
  },[filterSortBy, filterType, filterIsOnlyFollow, userProfile])

  const fetchData = () =>{
    Client.get<IPostsFeed[]>('/posts/',{
      params:{
        sortby:filterSortBy,
        type: filterType,
        followby: filterIsOnlyFollow? userProfile?.userId:'',
        fetchAmount: fetchPerTime,
        currentAmount: currentPostCount,
      }
    }).then((res)=>{
      if(res.data.length === 0)
        setHasMore(false);
      else
        addMorePost(res.data);
    }).catch((err)=>{
      console.log(err);
    })
    // eslint-disable-next-line
  }

  const addMorePost = (newMorePost:IPostsFeed[]) =>{
    if(posts){
      var temp = posts.slice(0);
      newMorePost.forEach((postId)=>{
        temp.push(postId);
      })
      setPosts(temp);
    }
  }

  return(
    <div className='feed-post-container d-flex justify-content-center'>
      <div className='posts-container'>
        <InfiniteScroll
          dataLength={posts?.length? posts.length:0} //This is important field to render the next data
          next={fetchData}
          hasMore={hasMore}
          loader={<h4 className='text-color'>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b className='text-color'>Yay! You have seen it all</b>
            </p>
          }
        >
          {
            posts?.map((post)=>{
              return(
                <div key={post.postId} className='post-container'>
                  <Post postId={post.postId}/>
                </div>
              )
            })
          }
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default FeedPost;