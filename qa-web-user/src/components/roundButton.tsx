import { ReactNode } from "react";
import './roundButton.scss'
import classNames from 'classnames'

export interface RoundButtonProps{
 children: ReactNode | undefined;
 boxShadowSize: 'small'|'large';
 onClick?: () => void | undefined;
}

const RoundButton:React.FC<RoundButtonProps> = ({children, boxShadowSize, onClick}) => {

  return(
    <div 
      className={classNames("round-button", boxShadowSize==='small'? `small-shadow`:`large-shadow`)}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default RoundButton;