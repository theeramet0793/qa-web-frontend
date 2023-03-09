
import './commentButton.scss'
import { ReactSVG } from "react-svg";
import ChatIcon from '../assets/svg/chat-left-fill.svg'

export interface CommentButtonProps{
 onClick?: () => void | undefined;
 commentAmount: number;
}

const CommentButton:React.FC<CommentButtonProps> = ({ onClick, commentAmount}) => {

  return(
    <div 
      className={'comment-button'}
      onClick={()=>{onClick && onClick()}}
    >
      <ReactSVG src={ChatIcon}/>
      <div className='ps-2 text-normal-responsive text-center'>{commentAmount+' ความคิดเห็น'}</div>
    </div>
  )
}

export default CommentButton;