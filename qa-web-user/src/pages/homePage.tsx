import { useState } from "react";
import CreatePost from "../components/createPost";
import FeedPost from "../components/feedPost";
import FilterPost from "../components/filterPost";
import ChangeProfileModal from "../components/modal/changeProfileModal";
import CreatePostModal from "../components/modal/createPostModal";
import RegisterModal from "../components/modal/registerModal";
import SignInModal from "../components/modal/signInModal";
import OwnerNewPost from "../components/ownerNewPost";
import TopNav from "../components/topNav";
import { PostType, SortBy } from "../data/enum/filterEnum";

const HomePage: React.FC = () =>{

  const [isShowRegModal, setIsShowRegModal] = useState<boolean>(false);
  const [isShowSigModal, setIsShowSigModal] = useState<boolean>(false);
  const [isSignInComplete, setIsSignInComplete] = useState<boolean>(false);
  const [isShowCreatePostCard, setIsShowCreatePostCard] = useState<boolean>(false);
  const [isShowCreatePostModal, setIsShowCreatePostModal] = useState<boolean>(false);
  const [isShowChangeProfileModal, setIsShowChangeProfileModal] = useState<boolean>(false);
  const [newPostId, setNewPostId] = useState<number|undefined>(undefined);
  const [filterSortBy, setFilterSortBy] = useState<SortBy>(SortBy.Date);
  const [filterType, setFilterType] = useState<PostType>(PostType.All);
  const [filterOnlyFollow, setFilterOnlyFollow] = useState<boolean>(false);
  const [triggerOnRefresh, setTriggerOnRefresh] = useState<boolean>(false);

  return(
    <>
      <TopNav 
        onClickReg={()=> setIsShowRegModal(true)}
        onClickSign={()=> setIsShowSigModal(true)}
        onChangeProfile={()=> setIsShowChangeProfileModal(true)}
        isSignInSuccess={isSignInComplete}
        onSignOut={()=>{localStorage.removeItem('qa_access_token'); window.location.reload(); setIsShowCreatePostCard(false);}}
        onSignInSuccess={()=>{setIsShowCreatePostCard(true)}}
      />
      {isShowCreatePostCard && <CreatePost onClickCreate={()=>{setIsShowCreatePostModal(true)}}/>}
      <FilterPost 
        onFilterSortByChange={(sortby)=>{setFilterSortBy(sortby)}} 
        onFilterTypeChange={(type)=>{setFilterType(type)}} 
        onFilterOnlyFollowChange={(isOnlyFollow)=>{setFilterOnlyFollow(isOnlyFollow)}}
        defaultOnlyFollow={filterOnlyFollow}
      />
      <OwnerNewPost newPostId={newPostId} clearData={triggerOnRefresh}/>
      <FeedPost filterSortBy={filterSortBy} filterType={filterType} filterIsOnlyFollow={filterOnlyFollow} onRefreshFeed={()=>{setTriggerOnRefresh(!triggerOnRefresh)}}/>
      <RegisterModal show={isShowRegModal} onClose={()=> setIsShowRegModal(false)} />
      <SignInModal show={isShowSigModal} onClose={()=> setIsShowSigModal(false)} onSignInSuccess={()=>{setIsSignInComplete(true); window.location.href = '/loading'}}/>
      <CreatePostModal show={isShowCreatePostModal} onClose={()=> setIsShowCreatePostModal(false)} onCreateNewPostSuccess={(postId)=>{setNewPostId(postId)}}/>
      <ChangeProfileModal show={isShowChangeProfileModal} onClose={()=>{setIsShowChangeProfileModal(false)}}/>
    </>
  )
}

export default HomePage;