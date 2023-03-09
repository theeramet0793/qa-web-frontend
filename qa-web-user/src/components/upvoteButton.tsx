
import './upvoteButton.scss'
import classNames from 'classnames'
import { ReactSVG } from "react-svg";
import ShiftIcon from '../assets/svg/shift-fill.svg'

export interface UpvoteButtonProps{
 onClick?: () => void | undefined;
 isActive?: boolean;
 disable?: boolean;
 upvoteCount: number;
}

const UpvoteButton:React.FC<UpvoteButtonProps> = ({ onClick, isActive, disable, upvoteCount}) => {

  return(
    <div 
      className={classNames(isActive===true? `upvote-button-active`:'upvote-button', disable? 'upvote-button-disable':'')}
      onClick={()=>{!disable && onClick && onClick()}}
    >
      <ReactSVG src={ShiftIcon}/>
      <div className='ps-2 text-normal-responsive text-center'>{upvoteCount+' คะแนนโหวต'}</div>
    </div>
  )
}

export default UpvoteButton;