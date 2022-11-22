import FeedPost from "../components/feedPost";
import FilterPost from "../components/filterPost";
import TopNav from "../components/topNav";

const HomePage: React.FC = () =>{

  return(
    <>
      <TopNav/>
      <FilterPost/>
      <FeedPost/>
    </>
  )
}

export default HomePage;