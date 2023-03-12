
import './upvoteButton.scss'
import classNames from 'classnames'
import { ReactSVG } from "react-svg";
import StarIcon from '../assets/svg/star-fill.svg'
import { Col, Row } from 'react-bootstrap';

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
      <Row className='px-1'>
        <Col xs='auto' sm='auto' className='pe-0 d-flex justify-content-center align-items-center'>
          <ReactSVG src={StarIcon} className='icon'/>
        </Col>
        <Col>
          <div className='text-center text-normal-responsive'>
            {upvoteCount+' คะแนนโหวต'}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default UpvoteButton;