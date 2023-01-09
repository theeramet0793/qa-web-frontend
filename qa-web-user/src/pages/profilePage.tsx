import TopNav from "../components/topNav";
import { useNavigate } from 'react-router-dom'
import UserProfile from "../components/userProfile";
import { useState } from "react";

const ProfilePage:React.FC = () =>{

  const navigate = useNavigate();
  const [newProfileUrl, setNewProfileUrl] = useState<string>('')

  return(
    <>
      <TopNav 
        onClickReg={()=>{}}
        onClickSign={()=>{}}
        isSignInSuccess={true}
        onSignOut={()=>{localStorage.removeItem('qa_access_token'); navigate('/');}}
        onSignInSuccess={()=>{}}
        onProfile={()=> {navigate('/profile')}}
        newProfileUrl={newProfileUrl}
      />
      <UserProfile
        onClose={()=>{navigate('/')}}
        onChangeProfile={(newUrl)=>{setNewProfileUrl(newUrl)}}
      />
    </>
  )
}

export default ProfilePage;