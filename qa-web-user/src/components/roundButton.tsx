import { ReactNode } from "react";
import './roundButton.scss'
import classNames from 'classnames'

export interface RoundButtonProps{
 children: ReactNode | undefined;
 onClick?: () => void | undefined;
 isActive?: boolean;
}

const RoundButton:React.FC<RoundButtonProps> = ({children, onClick, isActive}) => {

  return(
    <div 
      className={classNames("round-button", isActive===true? `round-button-active`:'')}
      onClick={()=>{onClick && onClick()}}
    >
      {children}
    </div>
  )
}

export default RoundButton;