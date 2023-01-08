import { useEffect } from "react";
import Welcome from "../components/welcome";

const WelcomePage:React.FC = () =>{

  useEffect(()=>{
    setTimeout(() => {
      window.location.href = '/'
    }, 2000);
  })

  return(
    <>
      <Welcome/>
    </>
  )
}

export default WelcomePage;