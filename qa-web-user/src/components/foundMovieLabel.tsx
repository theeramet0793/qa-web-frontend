import { Col, Row } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';
import './foundMovieLabel.scss'
import CheckCircleIcon from '../assets/svg/check-circle-fill.svg'

export interface FoundMovieLabelProp{
 movieName: string;
}

const FoundMovieLabel:React.FC<FoundMovieLabelProp> = ({movieName}) =>{

  return(
    <div className='found-movie-label-container text-normal-responsive'>
      <Row className='inside-container'>
        <Col xs='auto' className='d-flex justify-content-center align-items-center'>
          <ReactSVG src={CheckCircleIcon} className='icon-container'/>
        </Col>
        <Col>
          {movieName}
        </Col>
      </Row>
    </div>
  )
}

export default FoundMovieLabel;