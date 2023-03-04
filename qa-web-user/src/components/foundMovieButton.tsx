import './foundMovieButton.scss'
import classNames from 'classnames';
import { Col, Row } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';
import SearchHeartIcon from '../assets/svg/search-heart.svg'

export interface FoundMovieButtonProps{
  onClick: () => void;
  text: string;
}


const FoundMovieButton:React.FC<FoundMovieButtonProps> = ({onClick, text}) =>{

  return(
    <div className={classNames('found-movie-button')} onClick={()=>{onClick()}}>
      <Row>
        <Col xs='auto' className='d-flex justify-content-center align-items-center pe-0'>
          <ReactSVG src={SearchHeartIcon} className='found-svg'/>
        </Col>
        <Col className='d-flex justify-content-start align-items-center'>
          <div className='text-normal '>{text? text:'ตัวหนังสือ'}</div>
        </Col>
      </Row>
    </div>
  )
}

export default FoundMovieButton;