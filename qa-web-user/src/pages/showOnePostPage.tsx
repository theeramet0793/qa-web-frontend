import TopNav from "../components/topNav";
import { useNavigate } from 'react-router-dom'
import ShowOnePost from "../components/showOnePost";

const ShowOnePostPage:React.FC = () =>{

  const navigate = useNavigate();

  return(
    <>
      <TopNav 
        onClickReg={()=>{}}
        onClickSign={()=>{}}
        isSignInSuccess={true}
        onSignOut={()=>{localStorage.removeItem('qa_access_token'); navigate('/');}}
        onSignInSuccess={()=>{}}
        onProfile={()=> {navigate('/profile')}}
      />
      <ShowOnePost/>
    </>
  )
}

export default ShowOnePostPage;