
import './commentButton.scss'
import { ReactSVG } from "react-svg";
import ChatIcon from '../assets/svg/chat-left-fill.svg'
import { Col, Row } from 'react-bootstrap';

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
      <Row className='px-1'>
        <Col xs='auto' className='pe-0 d-flex justify-content-center align-items-center'><ReactSVG src={ChatIcon}/></Col>
        <Col>
          <div className=' text-normal-responsive text-center'>
            {commentAmount+' ความคิดเห็น'}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default CommentButton;