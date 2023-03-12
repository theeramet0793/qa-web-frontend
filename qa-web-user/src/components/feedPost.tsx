import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PostType, SearchType, SortBy } from '../data/enum/filterEnum';
import { IMainSearchOption } from '../data/interface/IOption';
import { IPostsFeed } from '../data/interface/IPost';
import { IUser } from '../data/interface/IUser';
import Client from '../lib/axios/axios';
import './feedPost.scss'
import Post from './post';
import { GetUserData } from './userData/userData';

export interface FeedPostProps{
  filterSortBy:SortBy;
  filterPostType:PostType;
  filterIsOnlyFollow:boolean;
  onRefreshFeed: () => void;
  mainSearch?: IMainSearchOption|undefined;
  searchType?: SearchType;
}

const FeedPost: React.FC<FeedPostProps> = ({filterSortBy, filterPostType, filterIsOnlyFollow, onRefreshFeed, mainSearch, searchType}) => {

  const [posts, setPosts] = useState<IPostsFeed[]|undefined>(undefined);
  const [userProfile] = useState<IUser|undefined>(GetUserData());
  const [currentPostCount, setCurrentPostCount] = useState<number>(0);
  const [fetchPerTime] = useState<number>(5);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchWord, setSearchWord] = useState<string>('');
  const [searchingType, setSearchingType] = useState<string>('');
  const [searchingId, setSearchingId] = useState<string>('');

  useEffect(()=>{
    if(posts){
      setCurrentPostCount(posts.length);
    }
  },[posts])

  useEffect(()=>{
    if(mainSearch){
      setSearchWord(mainSearch.label);
      setSearchingType(mainSearch.type);
      setSearchingId(mainSearch.value)
    }
  },[mainSearch])

  useEffect(()=>{
    if(searchType){
      setSearchingType(searchType.toString());
    }
  },[searchType])

  useEffect(()=>{
      let api = (searchWord && searchType)? '/searchposts':'/posts/';
      Client.get<IPostsFeed[]>(api,{
        params:{
          sortby:filterSortBy,
          type: filterPostType,
          followby: filterIsOnlyFollow? userProfile?.userId:'',
          fetchAmount: fetchPerTime,
          currentAmount: 0,

          searchWord: searchWord,
          searchType: searchingType,
          searchId: searchingId,
        }
      }).then((res)=>{
        if(res.data.length === 0)
        setHasMore(false);
        setPosts(res.data);
        onRefreshFeed();
      }).catch((err)=>{
        console.log(err);
      })
      // eslint-disable-next-line 
  },[filterSortBy, filterPostType, filterIsOnlyFollow, userProfile, searchWord, searchingType])

  useEffect(()=>{
    setHasMore(true);
  },[filterSortBy, filterPostType, filterIsOnlyFollow])

  const fetchData = () =>{
    let api = (searchWord && searchType)? '/searchposts':'/posts/';
    Client.get<IPostsFeed[]>(api,{
      params:{
        sortby:filterSortBy,
        type: filterPostType,
        followby: filterIsOnlyFollow? userProfile?.userId:'',
        fetchAmount: fetchPerTime,
        currentAmount: currentPostCount,

        searchWord: searchWord,
        searchType: searchingType,
        searchId: searchingId,
      }
    }).then((res)=>{
      if(res.data.length === 0)
        setHasMore(false);
      else
        addMorePost(res.data);
    }).catch((err)=>{
      console.log(err);
    })
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
          loader={<h4 className='text-loading' style={{ textAlign: 'center' }}>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b className='text-end-of-feed'>Yay! You have seen it all</b>
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