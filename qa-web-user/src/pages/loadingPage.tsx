import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Loading from "../components/loading";

const LoadingPage:React.FC = () =>{

  const navigate = useNavigate();

  useEffect(()=>{
    setTimeout(() => {
      navigate('/');
    }, 1500);
  })

  return(
    <>
      <Loading/>
    </>
  )
}

export default LoadingPage;