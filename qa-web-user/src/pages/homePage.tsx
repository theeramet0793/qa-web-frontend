import { useState } from "react";
import FeedPost from "../components/feedPost";
import FilterPost from "../components/filterPost";
import RegisterModal from "../components/modal/registerModal";
import SignInModal from "../components/modal/signInModal";
import TopNav from "../components/topNav";

const HomePage: React.FC = () =>{

  const [showRegModal, setShowRegModal] = useState<boolean>(false);
  const [showSigModal, setShowSigModal] = useState<boolean>(false);

  return(
    <>
      <TopNav 
        onClickReg={()=> setShowRegModal(true)}
        onClickSign={()=> setShowSigModal(true)}
      />
      <FilterPost/>
      <FeedPost/>
      <RegisterModal show={showRegModal} onClose={()=> setShowRegModal(false)} />
      <SignInModal show={showSigModal} onClose={()=> setShowSigModal(false)} />
    </>
  )
}

export default HomePage;