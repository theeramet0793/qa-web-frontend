import { useState } from "react";
import CreatePost from "../components/createPost";
import FeedPost from "../components/feedPost";
import FilterPost from "../components/filterPost";
import CreatePostModal from "../components/modal/createPostModal";
import RegisterModal from "../components/modal/registerModal";
import SignInModal from "../components/modal/signInModal";
import OwnerNewPost from "../components/ownerNewPost";
import { PostType, SortBy } from "../data/enum/filterEnum";
import { useNavigate } from 'react-router-dom'
import TopNav from "../components/topNav";

export interface HomePageProps{

}

const SearchingPage: React.FC<HomePageProps> = () =>{

  const navigate = useNavigate();
  const [isShowRegModal, setIsShowRegModal] = useState<boolean>(false);
  const [isShowSigModal, setIsShowSigModal] = useState<boolean>(false);
  const [isSignInComplete, setIsSignInComplete] = useState<boolean>(false);
  const [filterSortBy, setFilterSortBy] = useState<SortBy>(SortBy.Date);
  const [filterType, setFilterType] = useState<PostType>(PostType.All);
  const [filterOnlyFollow, setFilterOnlyFollow] = useState<boolean>(false);
  const [triggerOnRefresh, setTriggerOnRefresh] = useState<boolean>(false);

  return(
    <>
      <TopNav 
        onClickReg={()=> setIsShowRegModal(true)}
        onClickSign={()=> setIsShowSigModal(true)}
        isSignInSuccess={isSignInComplete}
        onSignOut={()=>{localStorage.removeItem('qa_access_token'); window.location.reload(); }}
        onSignInSuccess={()=>{/*Do nothing*/}}
        onProfile={()=> {navigate('/profile')}}
      />
      <FeedPost filterSortBy={filterSortBy} filterPostType={filterType} filterIsOnlyFollow={filterOnlyFollow} onRefreshFeed={()=>{setTriggerOnRefresh(!triggerOnRefresh)}}/>
      <RegisterModal show={isShowRegModal} onClose={()=> setIsShowRegModal(false)} />
      <SignInModal show={isShowSigModal} onClose={()=> setIsShowSigModal(false)} onSignInSuccess={()=>{setIsSignInComplete(true); navigate('/loading')}}/>
    </>
  )
}

export default SearchingPage;