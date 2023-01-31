import { useEffect, useState } from "react";
import FeedPost from "../components/feedPost";
import RegisterModal from "../components/modal/registerModal";
import SignInModal from "../components/modal/signInModal";
import { PostType, SearchType, SortBy } from "../data/enum/filterEnum";
import { useLocation, useNavigate } from 'react-router-dom'
import TopNav from "../components/topNav";
import FilterPost from "../components/filterPost";
import { convertPathQueryStringToMainOption, convertStringToSearchType } from "../utils/convert";
import { IMainSearchOption } from "../data/interface/IOption";
import FilterSearch from "../components/filterSearch";

export interface HomePageProps{

}

const SearchingPage: React.FC<HomePageProps> = () =>{

  const location = useLocation();
  const navigate = useNavigate();
  const [isShowRegModal, setIsShowRegModal] = useState<boolean>(false);
  const [isShowSigModal, setIsShowSigModal] = useState<boolean>(false);
  const [isSignInComplete, setIsSignInComplete] = useState<boolean>(false);
  const [filterSortBy, setFilterSortBy] = useState<SortBy>(SortBy.Date);
  const [filterType, setFilterType] = useState<PostType>(PostType.All);
  const [filterOnlyFollow, setFilterOnlyFollow] = useState<boolean>(false);
  const [triggerOnRefresh, setTriggerOnRefresh] = useState<boolean>(false);
  const [defaultSearch, setDefaultSearch] = useState<string>('');
  const [mainSearch, setMainSearch] = useState<IMainSearchOption|undefined>(undefined);
  const [searchType, setSearchType] = useState<SearchType|undefined>(undefined);

  useEffect(()=>{
    let selectedSearch = (convertPathQueryStringToMainOption(decodeURI(location.search)));
    setMainSearch(selectedSearch)
    setDefaultSearch(selectedSearch.label);
  }, [location.search])

  useEffect(()=>{
    
  },[searchType])

  return(
    <>
      <TopNav 
        onClickReg={()=> setIsShowRegModal(true)}
        onClickSign={()=> setIsShowSigModal(true)}
        isSignInSuccess={isSignInComplete}
        onSignOut={()=>{localStorage.removeItem('qa_access_token'); window.location.reload(); }}
        onSignInSuccess={()=>{/*Do nothing*/}}
        onProfile={()=> {navigate('/profile')}}
        defaultSearch={defaultSearch}
      />
      <FilterSearch defaultSearchType={convertStringToSearchType(mainSearch?.type)} onSelectButton={(searchType)=>{setSearchType(searchType)}}/>
      <FilterPost 
        onFilterSortByChange={(sortby)=>{setFilterSortBy(sortby)}} 
        onFilterTypeChange={(type)=>{setFilterType(type)}} 
        onFilterOnlyFollowChange={(isOnlyFollow)=>{setFilterOnlyFollow(isOnlyFollow)}}
        defaultOnlyFollow={filterOnlyFollow}
      />
      <FeedPost 
        mainSearch={mainSearch} 
        searchType={searchType}
        filterSortBy={filterSortBy} 
        filterPostType={filterType} 
        filterIsOnlyFollow={filterOnlyFollow} 
        onRefreshFeed={()=>{setTriggerOnRefresh(!triggerOnRefresh)}}
      />
      <RegisterModal show={isShowRegModal} onClose={()=> setIsShowRegModal(false)} />
      <SignInModal show={isShowSigModal} onClose={()=> setIsShowSigModal(false)} onSignInSuccess={()=>{setIsSignInComplete(true); navigate('/loading')}}/>
    </>
  )
}

export default SearchingPage;