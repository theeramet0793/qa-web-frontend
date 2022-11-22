import { ReactNode } from "react";
import './roundButton.scss'
import classNames from 'classnames'

export interface RoundButtonProps{
 children: ReactNode | undefined;
 boxShadowSize: 'small'|'large';
}

const RoundButton:React.FC<RoundButtonProps> = ({children, boxShadowSize}) => {

  return(
    <div className={classNames("round-button", boxShadowSize==='small'? `small-shadow`:`large-shadow`)}>
      {children}
    </div>
  )
}

export default RoundButton;