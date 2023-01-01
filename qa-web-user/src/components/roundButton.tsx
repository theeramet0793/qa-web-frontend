import { ReactNode } from "react";
import './roundButton.scss'
import classNames from 'classnames'

export interface RoundButtonProps{
 children: ReactNode | undefined;
 onClick?: () => void | undefined;
 isActive?: boolean;
 disable?: boolean;
}

const RoundButton:React.FC<RoundButtonProps> = ({children, onClick, isActive, disable}) => {

  return(
    <div 
      className={classNames("round-button", isActive===true? `round-button-active`:'', disable? 'round-button-disable':'')}
      onClick={()=>{!disable && onClick && onClick()}}
    >
      {children}
    </div>
  )
}

export default RoundButton;