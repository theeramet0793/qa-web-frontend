import { ReactSVG } from 'react-svg';
import './followButton.scss'
import FollowIcon from '../assets/svg/bookmark-heart-fill.svg'
import classNames from 'classnames';

export interface FollowButtonprops{
  isActive: boolean;
  onClick: () => void;
  disable: boolean;
  followAmount: number;
}

const FollowButton:React.FC<FollowButtonprops> = ({isActive, onClick, disable, followAmount}) =>{
  
  return(
    <div className={classNames( isActive? 'follow-button-active':'follow-button', disable? 'follow-button-disable':'' )} onClick={()=>{!disable && onClick()}}>
      <ReactSVG src={FollowIcon} className=''/>
      <div className='ps-2 text-normal-responsive'>{followAmount+' ผู้ติดตาม'}</div>
    </div>
  )
}

export default FollowButton;