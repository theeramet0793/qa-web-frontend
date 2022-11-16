import { ReactNode } from "react";
import './oblongButton.scss'

export interface OblongButtonProps {
  children: ReactNode | undefined;
}

const OblongButton: React.FC<OblongButtonProps> = ({children}) =>{

  return(
    <div className="oblong-button d-flex justify-content-center align-items-center">
      {children}
    </div>
  )
}

export default OblongButton;