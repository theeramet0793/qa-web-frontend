
import { Row } from 'react-bootstrap';
import './loading.scss'

export interface LoadingProps{

}

const Loading:React.FC<LoadingProps> = () =>{

  return(
    <div className='welcome-container '>
      <div className='welcome-child-container'>
        <Row>
          <Row className='d-flex justify-content-center align-items-center'><div className="lds-ripple"><div></div><div></div><div></div></div></Row>
          <Row><div className='loading-text-container'>loading...</div></Row>
        </Row>
      </div>
    </div>
  )
}

export default Loading;